import json

with open("public/all_milestones.json", "r") as f:
    all_data = json.load(f)

def get_by_id(target_id):
    for item in all_data:
        if item["id"] == target_id:
            return item
    return None

def get_list_by_ids(ids):
    res = []
    for i in ids:
        item = get_by_id(i)
        if item: res.append(item)
    return res

# Grouping
groups = [
    {
        "id": 1,
        "anio": 1966,
        "titulo": "Orígenes y Primeros Oficios (1966 - 1970)",
        "descripcion": "Fundación de INACAP como Universidad Laboral y establecimiento de la primera sede en Valdivia. " + get_by_id(1)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_1.mp3",
        "imagenes": [get_by_id(1)["image"]],
        "carreras": {
            "titulo": get_by_id(100)["title"],
            "descripcion": get_by_id(100)["description"],
            "imagenes": [get_by_id(100)["image"]]
        },
        "local": {
            "titulo": get_by_id(211)["title"],
            "descripcion": get_by_id(211)["description"],
            "imagenes": [get_by_id(211)["image"]]
        }
    },
    {
        "id": 2,
        "anio": 1977,
        "titulo": "Consolidación como OTEC (1977)",
        "descripcion": get_by_id(4)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_2.mp3",
        "imagenes": [get_by_id(4)["image"]],
        "local": {
            "titulo": "Primeros Talleres Valdivianos",
            "descripcion": "Se habilitan dependencias locales adaptadas a la geografía y al quehacer industrial del sur, orientadas a mecánica naval y carpintería de ribera.",
            "audioUrl": "/assets/audio/inacap/inacap_local_2.mp3"
        }
    },
    {
        "id": 3,
        "anio": 1981,
        "titulo": "Reforma Universitaria y Títulos Técnicos (1981 - 1982)",
        "descripcion": get_by_id(5)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_3.mp3",
        "imagenes": [get_by_id(5)["image"]],
        "carreras": {
            "titulo": get_by_id(101)["title"],
            "descripcion": get_by_id(101)["description"],
            "imagenes": [get_by_id(101)["image"]]
        },
        "local": {
            "titulo": "Llegada de la Computación",
            "descripcion": "Llegan los primeros computadores personales a la sede. Se abre un moderno laboratorio informático facilitando el acceso a herramientas tecnológicas.",
            "audioUrl": "/assets/audio/inacap/inacap_local_5.mp3"
        }
    },
    {
        "id": 4,
        "anio": 1995,
        "titulo": "Autonomía y Era Digital Temprana (1995 - 1997)",
        "descripcion": get_by_id(7)["description"] + " " + get_by_id(8)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_4.mp3",
        "imagenes": [get_by_id(7)["image"], get_by_id(8)["image"]],
        "carreras": {
            "titulo": get_by_id(102)["title"],
            "descripcion": get_by_id(102)["description"],
            "imagenes": [get_by_id(102)["image"]]
        },
        "local": {
            "titulo": "Acreditación y Vinculación",
            "descripcion": "La sede local celebra la acreditación con alta vinculación al medio, colaborando de cerca con el ecosistema de astilleros y el comercio regional para mejorar la empleabilidad de sus egresados.",
            "audioUrl": "/assets/audio/inacap/inacap_local_7.mp3"
        }
    },
    {
        "id": 5,
        "anio": 2001,
        "titulo": "Pioneros en Calidad (2001 - 2005)",
        "descripcion": get_by_id(9)["description"] + " " + get_by_id(11)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_5.mp3",
        "imagenes": [get_by_id(9)["image"], get_by_id(11)["image"]],
        "local": {
             "titulo": "Laboratorios de Especialidad",
             "descripcion": "El Aprendizaje Basado en Competencias se afianza en Valdivia con laboratorios rediseñados y metodologías activas orientadas a proyectos prácticos en áreas forestales, acuícolas y de servicios."
        }
    },
    {
        "id": 6,
        "anio": 2006,
        "titulo": "Sistema Integrado e Ingenierías (2002 - 2006)",
        "descripcion": get_by_id(10)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_6.mp3",
        "imagenes": [get_by_id(10)["image"]],
        "carreras": {
            "titulo": get_by_id(103)["title"],
            "descripcion": get_by_id(103)["description"],
            "imagenes": [get_by_id(103)["image"]]
        },
        "local": {
            "titulo": "Sello Profesional e Ingeniería",
            "descripcion": "La sede Valdivia amplía su oferta integrando ingenierías aplicadas que apoyen la naciente industria pesquera y logística de la Región."
        }
    },
    {
        "id": 7,
        "anio": 2016,
        "titulo": "Gratuidad e Inclusión (2016)",
        "descripcion": get_by_id(12)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_7.mp3",
        "imagenes": [get_by_id(12)["image"]],
        "local": {
            "titulo": get_by_id(206)["title"],
            "descripcion": get_by_id(206)["description"],
            "imagenes": [get_by_id(206)["image"]]
        }
    },
    {
        "id": 8,
        "anio": 2017,
        "titulo": "Crecimiento Regional y Vanguardia Tecnológica (2017 - 2019)",
        "descripcion": get_by_id(13)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_8.mp3",
        "imagenes": [get_by_id(13)["image"]],
        "carreras": {
            "titulo": get_by_id(104)["title"],
            "descripcion": get_by_id(104)["description"],
            "imagenes": [get_by_id(104)["image"]]
        },
        "local": {
            "titulo": get_by_id(207)["title"] + " y " + get_by_id(208)["title"],
            "descripcion": get_by_id(207)["description"] + " " + get_by_id(208)["description"],
            "imagenes": [get_by_id(207)["image"], get_by_id(208)["image"]]
        }
    },
    {
        "id": 9,
        "anio": 2020,
        "titulo": "Modernidad Digital (2020 - 2023)",
        "descripcion": get_by_id(14)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_9.mp3",
        "imagenes": [get_by_id(14)["image"]],
        "local": {
            "titulo": get_by_id(201)["title"] + " / " + get_by_id(202)["title"],
            "descripcion": get_by_id(201)["description"] + " Además, " + get_by_id(202)["description"],
            "imagenes": [get_by_id(201)["image"], get_by_id(202)["image"]]
        }
    },
    {
        "id": 10,
        "anio": 2026,
        "titulo": "Máxima Acreditación y 60 Años (2024 - 2026)",
        "descripcion": get_by_id(15)["description"] + " " + get_by_id(16)["description"] + " " + get_by_id(17)["description"],
        "audioUrl": "/assets/audio/inacap/inacap_10.mp3",
        "imagenes": [get_by_id(15)["image"], get_by_id(16)["image"], get_by_id(17)["image"]],
        "local": {
            "titulo": get_by_id(203)["title"] + " y Alianzas Estratégicas",
            "descripcion": get_by_id(203)["description"] + " " + get_by_id(204)["description"] + " " + get_by_id(205)["description"],
            "imagenes": [get_by_id(203)["image"], get_by_id(204)["image"], get_by_id(205)["image"]]
        }
    }
]

output_ts = "  inacap: [\n"
for g in groups:
    output_ts += "    {\n"
    for k, v in g.items():
        if isinstance(v, dict) or isinstance(v, list):
            output_ts += f"      {k}: {json.dumps(v, ensure_ascii=False)},\n"
        elif isinstance(v, str):
            output_ts += f"      {k}: {json.dumps(v, ensure_ascii=False)},\n"
        else:
            output_ts += f"      {k}: {v},\n"
    output_ts += "    },\n"
output_ts += "  ],"

with open("src/data/exposicion.ts", "r") as f:
    content = f.read()

# Update Hito type
old_type = """export type Hito = {
  id: number;
  anio: number;
  titulo: string;
  descripcion: string;
  audioUrl: string;
  modelo3dUrl?: string;
  imagenes?: string[];
  obraRelacionada?: ObraRelacionada;
  local?: LocalHito;
  era?: string;
  tags?: string[];
};"""

new_type = """export type CarreraHito = {
  titulo: string;
  descripcion: string;
  imagenes?: string[];
};

export type Hito = {
  id: number;
  anio: number;
  titulo: string;
  descripcion: string;
  audioUrl: string;
  modelo3dUrl?: string;
  imagenes?: string[];
  obraRelacionada?: ObraRelacionada;
  local?: LocalHito;
  carreras?: CarreraHito;
  era?: string;
  tags?: string[];
};"""
content = content.replace(old_type, new_type)

start_idx = content.find("  inacap: [")
end_idx = content.find("  construccion: [")
content = content[:start_idx] + output_ts + "\n\n" + content[end_idx:]

with open("src/data/exposicion.ts", "w") as f:
    f.write(content)

