import json

with open("public/construccion_milestones.json", "r") as f:
    items = json.load(f)

def find_item(query):
    for item in items:
        if query.lower() in item["title"].lower() or query.lower() in item["description"].lower() or query.lower() in item["year"].lower():
            return {
                "nombre": item["title"],
                "descripcion": item["description"],
                "anio": item["year"],
                "imagenUrl": item["image"]
            }
    return None

hitos = [
    {
        "id": 1,
        "anio": 1960,
        "titulo": 'Ingeniería de emergencias en el "Riñihuazo"',
        "descripcion": 'En 1960, el mayor terremoto de la historia sacudió el sur de Chile, detonando una crisis sin precedentes. Este hito marcó el desarrollo de la ingeniería de emergencia y consolidó grandes obras de hormigón en la zona central y el sur del país.',
        "audioUrl": "/assets/audio/construccion/construccion_1.mp3",
        "obrasRelacionadas": [
            find_item("Isla Teja"),  # Casa Prochelle I
            find_item("Vanguardia en Hormigón Visto"), # CEPAL
            find_item("Básquetbol"), # Coliseo
            find_item("Hazaña de la Ingeniería") # Riñihuazo itself, maybe?
        ]
    },
    {
        "id": 2,
        "anio": 1969,
        "titulo": "Finalización de la Ruta 5 Sur",
        "descripcion": "La integración territorial avanzó exponencialmente con la pavimentación y finalización de grandes tramos de la Ruta 5. Estas obras viales permitieron acortar distancias logísticas vitales y fueron acompañadas por grandes proezas de cálculo estructural en la cordillera.",
        "audioUrl": "/assets/audio/construccion/construccion_2.mp3",
        "obrasRelacionadas": [
            find_item("Red Vial"), # Ruta 5
            find_item("Hidroeléctrica y Cálculo") # Antuco
        ]
    },
    {
        "id": 3,
        "anio": 1974,
        "titulo": "Desarrollo de la industria naval (ASENAV)",
        "descripcion": "El sur de Chile consolida su tradición marítima con la fundación de ASENAV en Valdivia, convirtiendo a la ciudad en la capital de la industria naval privada. En paralelo, en la capital, se inauguraban megainfraestructuras que revolucionarían las telecomunicaciones nacionales.",
        "audioUrl": "/assets/audio/construccion/construccion_3.mp3",
        "obrasRelacionadas": [
            find_item("Astillero Privado"), # ASENAV
            find_item("Telecomunicaciones") # Torre Entel
        ]
    },
    {
        "id": 4,
        "anio": 1976, # user said 1975-1976
        "titulo": "Ley General de Urbanismo y Construcciones",
        "descripcion": "La promulgación de la LGUC estableció un marco normativo moderno para el desarrollo territorial chileno. Al mismo tiempo, se iniciaron colosales obras de infraestructura destinadas a conectar los rincones más aislados de la Patagonia mediante explosiones y tajos en la roca viva.",
        "audioUrl": "/assets/audio/construccion/construccion_4.mp3",
        "obrasRelacionadas": [
            find_item("Ley de Urbanismo") # LGUC / Carretera austral
        ]
    },
    {
        "id": 5,
        "anio": 1985, # user said 1981-1990
        "titulo": "Modernización portuaria y conectividad costera",
        "descripcion": "Los puertos chilenos comenzaron una transformación logística radical mediante la contenerización. En Valdivia, este impulso se reflejó en infraestructuras viales y puentes que lograron romper el aislamiento histórico de las zonas costeras como Corral y Niebla.",
        "audioUrl": "/assets/audio/construccion/construccion_5.mp3",
        "obrasRelacionadas": [
            find_item("Viaducto Clave de la Costa"), # Puente Cruces/Naguilán? Description mentions Valdivia and Corral.
            find_item("Logística del Comercio") # Contenerizacion
        ]
    },
    {
        "id": 6,
        "anio": 1982,
        "titulo": "Transformación digital con AutoCAD",
        "descripcion": "La llegada del diseño digital reemplazó al tablero de dibujo manual, permitiendo niveles de precisión inéditos en los planos estructurales. Esto facilitó el rediseño sísmico de centros cívicos, normalizaciones hospitalarias y el alzamiento de grandes viaductos interurbanos.",
        "audioUrl": "/assets/audio/construccion/construccion_6.mp3",
        "obrasRelacionadas": [
            find_item("Dibujo Técnico Digital"), # Autocad
            find_item("Ingeniería Sísmica"), # Catedral
            find_item("Mayor Intervención Hospitalaria"), # Hospital Base
            find_item("Ampliación Vial"), # Puente Calle-Calle
            find_item("Gran Viaducto sobre el Biobío") # Llacolen
        ]
    },
    {
        "id": 7,
        "anio": 2011, # user said 2006-2012
        "titulo": "Hormigones de Alta Resistencia y Cirugía Urbana",
        "descripcion": "El nuevo milenio trajo desafíos en altura y en tierra. Mientras se desarrollaban las tecnologías para bombear hormigón a más de 300 metros, en Valdivia se ejecutaban complejas cirugías urbanas para ensanchar avenidas y soterrar de manera masiva el cableado eléctrico.",
        "audioUrl": "/assets/audio/construccion/construccion_7.mp3",
        "obrasRelacionadas": [
            find_item("Hormigones H60"), # Costanera
            find_item("Cirugía Urbana") # Pedro aguirre cerda
        ]
    },
    {
        "id": 8,
        "anio": 2014, # user said 2011-2014
        "titulo": "Contratos Globales y Expansión Comercial",
        "descripcion": "El Ministerio de Obras Públicas impulsó pavimentaciones integrales y la renovación de puentes bajo los modernos Contratos Globales de Conservación. Estas mejoras en la accesibilidad catalizaron el desarrollo de los primeros centros comerciales de gran escala en la región.",
        "audioUrl": "/assets/audio/construccion/construccion_8.mp3",
        "obrasRelacionadas": [
            find_item("Pavimentación Integral"), # Ruta Valdivia
            find_item("Puente más Largo"), # Santa Elvira
            find_item("Primer Gran Centro Comercial") # Mall
        ]
    },
    {
        "id": 9,
        "anio": 2018, # user said 2018-2022
        "titulo": "Implementación de la Metodología BIM",
        "descripcion": "La adopción de modelos tridimensionales interactivos (BIM) revolucionó la edificación pública y aeroportuaria, permitiendo detectar choques estructurales en tiempo real. Esta eficiencia precedió a colosales desafíos constructivos como el trazado de puentes colgantes sobre canales marinos.",
        "audioUrl": "/assets/audio/construccion/construccion_9.mp3",
        "obrasRelacionadas": [
            find_item("Metodología BIM"), # Hospital Alto hospicio
            find_item("Expansión Aeroportuaria"), # Aeropuerto AMB
            find_item("Puente Colgante") # Puente Chacao
        ]
    },
    {
        "id": 10,
        "anio": 2024,
        "titulo": "Traslado Patrimonial e Infraestructura Futura",
        "descripcion": "En una hazaña logística inédita, monumentales casonas patrimoniales en Valdivia fueron desplazadas íntegramente sobre rieles hidráulicos. Esta obra de precisión quirúrgica permitió entrelazar el respeto por la arquitectura histórica con la apertura de modernas fajas constructivas para futuros puentes.",
        "audioUrl": "/assets/audio/construccion/construccion_10.mp3",
        "obrasRelacionadas": [
            find_item("Traslado Patrimonial") # Casona
        ]
    }
]

# filter Nones
for h in hitos:
    h["obrasRelacionadas"] = [o for o in h["obrasRelacionadas"] if o is not None]

with open("public/hitos_construccion_procesados.json", "w") as f:
    json.dump(hitos, f, indent=2)

print("Done generating JSON")
