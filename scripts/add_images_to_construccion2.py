import re

with open("src/data/exposicion.ts", "r") as f:
    content = f.read()

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
        
        chunks = construccion_str.split("      obrasRelacionadas: [\n")
        
        new_chunks = [chunks[0]]
        
        for chunk in chunks[1:]:
            image_urls = re.findall(r'imagenUrl:\s*"([^"]+)"', chunk)
            
            img_array_str = "      imagenes: [\n"
            for url in image_urls:
                img_array_str += f'        "{url}",\n'
            img_array_str += "      ],\n"
            
            new_chunks.append(img_array_str + "      obrasRelacionadas: [\n" + chunk)
                
        # This split doesn't work if there's no `obrasRelacionadas`. Let's just do a regex replace on the whole `construccion_str`.
        
        def replacer(match):
            block = match.group(0)
            urls = re.findall(r'imagenUrl:\s*"([^"]+)"', block)
            if urls:
                imgs = "      imagenes: [\n" + "".join([f'        "{u}",\n' for u in urls]) + "      ],\n"
                return imgs + "      obrasRelacionadas: ["
            return block

        new_construccion_str = re.sub(r'      obrasRelacionadas: \[.*?(?=      \])', replacer, construccion_str, flags=re.DOTALL)
        
        new_content = content[:array_start] + new_construccion_str + content[end_idx+1:]
        
        with open("src/data/exposicion.ts", "w") as f:
            f.write(new_content)
        print("Successfully added imagenes array")
    else:
        print("Error: Could not find closing bracket")
else:
    print("Error: Could not find construccion array")
