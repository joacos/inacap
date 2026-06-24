import re

with open("src/data/exposicion.ts", "r") as f:
    content = f.read()

# We need to find the `construccion: [` array and add `imagenes: [ ... ]` to each object based on its obrasRelacionadas
start_idx = content.find("construccion: [")
if start_idx != -1:
    bracket_count = 0
    end_idx = -1
    array_start = content.find("[", start_idx)
    in_string = False
    escape_char = False
    
    for i in range(array_start, len(content)):
        char = content[i]
        if escape_char:
            escape_char = False
            continue
        if char == '\\':
            escape_char = True
            continue
        if char == '"' or char == "'":
            if not in_string:
                in_string = char
            elif in_string == char:
                in_string = False
            continue
        
        if not in_string:
            if char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    end_idx = i
                    break

    if end_idx != -1:
        construccion_str = content[array_start:end_idx+1]
        
        # We can extract the chunks between `    {` and `    },`
        # and then extract `imagenUrl` values from it to form the `imagenes: [...]` array.
        
        # Split by `    {` (with newlines)
        chunks = construccion_str.split("    {\n")
        new_chunks = [chunks[0]] # the opening brace or bracket
        
        for chunk in chunks[1:]:
            # extract all imagenUrl: "..." from this chunk
            image_urls = re.findall(r'imagenUrl:\s*"([^"]+)"', chunk)
            
            if image_urls:
                # build the imagenes array string
                img_array_str = "      imagenes: [\n"
                for url in image_urls:
                    img_array_str += f'        "{url}",\n'
                img_array_str += "      ],\n"
                
                # insert it right after audioUrl
                # find audioUrl
                audio_match = re.search(r'audioUrl:\s*"[^"]+",\n', chunk)
                if audio_match:
                    insert_pos = audio_match.end()
                    new_chunk = chunk[:insert_pos] + img_array_str + chunk[insert_pos:]
                    new_chunks.append(new_chunk)
                else:
                    new_chunks.append(chunk)
            else:
                new_chunks.append(chunk)
                
        new_construccion_str = "    {\n".join(new_chunks)
        new_content = content[:array_start] + new_construccion_str + content[end_idx+1:]
        
        with open("src/data/exposicion.ts", "w") as f:
            f.write(new_content)
        print("Successfully added imagenes array to construccion hitos")
    else:
        print("Error: Could not find closing bracket")
else:
    print("Error: Could not find construccion array")
