import json

with open("src/data/exposicion.ts", "r") as f:
    content = f.read()

with open("public/hitos_construccion_procesados.json", "r") as f:
    nuevos_hitos = json.load(f)

start_idx = content.find("construccion: [")
if start_idx != -1:
    bracket_count = 0
    in_string = False
    escape_char = False
    end_idx = -1
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
        ts_array = "[\n"
        for hito in nuevos_hitos:
            ts_array += "    {\n"
            ts_array += f"      id: {hito['id']},\n"
            ts_array += f"      anio: \"{hito['anio']}\",\n"
            titulo_esc = hito['titulo'].replace('"', '\\"')
            ts_array += f"      titulo: \"{titulo_esc}\",\n"
            desc_esc = hito['descripcion'].replace('"', '\\"')
            ts_array += f"      descripcion: \"{desc_esc}\",\n"
            ts_array += f"      audioUrl: \"{hito['audioUrl']}\",\n"
            
            # Extract images from obrasRelacionadas
            obras = hito.get('obrasRelacionadas', [])
            if obras:
                ts_array += "      imagenes: [\n"
                for obra in obras:
                    ts_array += f"        \"{obra['imagenUrl']}\",\n"
                ts_array += "      ],\n"
                
            ts_array += "      obrasRelacionadas: [\n"
            for obra in obras:
                ts_array += "        {\n"
                ts_array += f"          nombre: \"{obra['nombre']}\",\n"
                odesc_esc = obra['descripcion'].replace('"', '\\"')
                ts_array += f"          descripcion: \"{odesc_esc}\",\n"
                ts_array += f"          anio: \"{obra['anio']}\",\n"
                ts_array += f"          imagenUrl: \"{obra['imagenUrl']}\"\n"
                ts_array += "        },\n"
            ts_array += "      ]\n"
            ts_array += "    },\n"
        ts_array += "  ]"
        
        new_content = content[:array_start] + ts_array + content[end_idx+1:]
        
        with open("src/data/exposicion.ts", "w") as f:
            f.write(new_content)
        print("Successfully updated src/data/exposicion.ts with correct images")
