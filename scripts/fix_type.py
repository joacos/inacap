with open("src/data/exposicion.ts", "r") as f:
    content = f.read()

content = content.replace("obraRelacionada?: ObraRelacionada;", "obraRelacionada?: ObraRelacionada;\n  obrasRelacionadas?: ObraRelacionada[];")

with open("src/data/exposicion.ts", "w") as f:
    f.write(content)
