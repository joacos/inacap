import re
import json

with open("src/data/exposicion.ts", "r") as f:
    content = f.read()

with open("public/hitos_construccion_procesados.json", "r") as f:
    nuevos_hitos = json.load(f)

# Update Type
content = content.replace("obraRelacionada?: ObraRelacionada;", "obraRelacionada?: ObraRelacionada;\n  obrasRelacionadas?: ObraRelacionada[];")

# Find 'construccion: [' and the matching closing bracket
start_idx = content.find("construccion: [")
if start_idx != -1:
    bracket_count = 0
    in_string = False
    escape_char = False
    end_idx = -1
    
    # We find the start of the array bracket
    array_start = content.find("[", start_idx)
    
    for i in range(array_start, len(content)):
        char = content[i]
        
        if escape_char:
            escape_char = False
            continue
            
        if char == '\\':
            escape_char = True
            continue
            
        if char == '"' or char == "'":
            # very simplistic string handling, but good enough for this file
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
        # We need to format the new hitos array as TS
        ts_array = "[\n"
        for hito in nuevos_hitos:
            ts_array += "    {\n"
            ts_array += f"      id: {hito['id']},\n"
            ts_array += f"      anio: {hito['anio']},\n"
            ts_array += f"      titulo: \"{hito['titulo']}\",\n"
            ts_array += f"      descripcion: \"{hito['descripcion']}\",\n"
            ts_array += f"      audioUrl: \"{hito['audioUrl']}\",\n"
            ts_array += "      obrasRelacionadas: [\n"
            for obra in hito.get('obrasRelacionadas', []):
                ts_array += "        {\n"
                ts_array += f"          nombre: \"{obra['nombre']}\",\n"
                desc = obra['descripcion'].replace('"', '\\"')
                ts_array += f"          descripcion: \"{desc}\",\n"
                ts_array += f"          anio: {obra['anio']},\n"
                ts_array += f"          imagenUrl: \"{obra['imagenUrl']}\"\n"
                ts_array += "        },\n"
            ts_array += "      ]\n"
            ts_array += "    },\n"
        ts_array += "  ]"
        
        new_content = content[:array_start] + ts_array + content[end_idx+1:]
        
        with open("src/data/exposicion.ts", "w") as f:
            f.write(new_content)
        print("Successfully updated src/data/exposicion.ts")
    else:
        print("Error: Could not find closing bracket for construccion array.")
else:
    print("Error: Could not find 'construccion: [' in src/data/exposicion.ts")
