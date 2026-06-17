export type ObraRelacionada = {
  nombre: string;
  descripcion: string;
  anio: number;
  imagenUrl: string;
};

export type LocalHito = {
  titulo: string;
  descripcion: string;
  audioUrl: string;
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
};

export type ZonaKey = "inacap" | "construccion" | "herramientas";

export const zonaNombres: Record<ZonaKey, string> = {
  inacap: "INACAP",
  construccion: "Construcción",
  herramientas: "Herramientas",
};

export const zonaDescripciones: Record<ZonaKey, string> = {
  inacap: "60 años formando profesionales para Chile",
  construccion: "La evolución de la construcción en 6 décadas",
  herramientas: "De lo análogo a lo digital: herramientas que transformaron la industria",
};

export const exposicionData: Record<ZonaKey, Hito[]> = {
  inacap: [
    {
      id: 1,
      anio: 1966,
      titulo: "Fundación de INACAP",
      descripcion:
        "El Instituto Nacional de Capacitación Profesional nace como una respuesta a la necesidad de formar técnicos calificados para el desarrollo industrial de Chile. Con sedes iniciales en Santiago, comienza una misión que transformará la educación técnica del país.",
      audioUrl: "/assets/audio/inacap/inacap_1.mp3",
      imagenes: [
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80"
      ],
      local: {
        titulo: "Inicios en Valdivia",
        descripcion: "INACAP inicia sus primeras actividades formativas y de capacitación en la Región de Los Ríos, respondiendo a la necesidad de operarios técnicos calificados para el sector fluvial y de manufactura local.",
        audioUrl: "/assets/audio/inacap/inacap_local_1.mp3",
        imagenes: [
          "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80"
        ]
      }
    },
    {
      id: 2,
      anio: 1972,
      titulo: "Expansión Nacional",
      descripcion:
        "INACAP amplía su cobertura a regiones, abriendo sedes en Valparaíso, Concepción y Antofagasta. La formación técnica llega a miles de jóvenes que antes no tenían acceso a educación especializada.",
      audioUrl: "/assets/audio/inacap/inacap_2.mp3",
      local: {
        titulo: "Talleres Pioneros",
        descripcion: "Se habilitan dependencias locales adaptadas a la geografía y al quehacer industrial del sur. Se imparten los primeros talleres prácticos orientados a mecánica naval y carpintería de ribera.",
        audioUrl: "/assets/audio/inacap/inacap_local_2.mp3"
      }
    },
    {
      id: 3,
      anio: 1978,
      titulo: "Reconocimiento Institucional",
      descripcion:
        "Se consolida como la principal institución de formación técnica del país, con programas reconocidos por la industria y un cuerpo docente de excelencia proveniente del mundo profesional.",
      audioUrl: "/assets/audio/inacap/inacap_3.mp3",
      local: {
        titulo: "Aporte al Sector Maderero",
        descripcion: "INACAP consolida su presencia regional capacitando a técnicos en operaciones forestales y aserraderos, aportando al motor de crecimiento más relevante del Valdivia de la época.",
        audioUrl: "/assets/audio/inacap/inacap_local_3.mp3"
      }
    },
    {
      id: 4,
      anio: 1985,
      titulo: "Modernización Curricular",
      descripcion:
        "Se actualizan los planes de estudio para incorporar nuevas tecnologías y metodologías de enseñanza. Los talleres se equipan con maquinaria de última generación importada especialmente para la formación práctica.",
      audioUrl: "/assets/audio/inacap/inacap_4.mp3",
      local: {
        titulo: "Nuevos Talleres Mecánicos",
        descripcion: "Pese a las dificultades económicas nacionales, la sede Valdivia inaugura talleres equipados con tornos y soldadura eléctrica para simular de forma realista el trabajo en los astilleros locales.",
        audioUrl: "/assets/audio/inacap/inacap_local_4.mp3"
      }
    },
    {
      id: 5,
      anio: 1992,
      titulo: "Era Digital Comienza",
      descripcion:
        "Los primeros laboratorios de computación se instalan en las sedes principales. INACAP lidera la integración tecnológica en la educación técnica, preparing a sus estudiantes para la revolución digital.",
      audioUrl: "/assets/audio/inacap/inacap_5.mp3",
      local: {
        titulo: "Conectividad Austral",
        descripcion: "Llegan los primeros computadores personales a la sede. Se abre un moderno laboratorio informático facilitando el acceso a herramientas de contabilidad e informática para jóvenes valdivianos.",
        audioUrl: "/assets/audio/inacap/inacap_local_5.mp3"
      }
    },
    {
      id: 6,
      anio: 1999,
      titulo: "Universidad Tecnológica",
      descripcion:
        "INACAP da un salto cualitativo al obtener el reconocimiento como Universidad Tecnológica, ampliando su oferta académica con carreras profesionales e ingenierías aplicadas.",
      audioUrl: "/assets/audio/inacap/inacap_6.mp3",
      local: {
        titulo: "Sello Profesional e Ingeniería",
        descripcion: "Con la transformación de INACAP en Universidad Tecnológica, la sede Valdivia amplía su oferta integrando ingenierías aplicadas que apoyen la naciente industria pesquera y logística de la Región.",
        audioUrl: "/assets/audio/inacap/inacap_local_6.mp3"
      }
    },
    {
      id: 7,
      anio: 2005,
      titulo: "Acreditación y Calidad",
      descripcion:
        "Se obtienen las primeras acreditaciones institucionales, validando la calidad educativa ante organismos nacionales e internacionales. Los egresados son reconocidos por su preparación práctica.",
      audioUrl: "/assets/audio/inacap/inacap_7.mp3",
      local: {
        titulo: "Acreditación y Vinculación",
        descripcion: "La sede local celebra la acreditación con alta vinculación al medio, colaborando de cerca con el ecosistema de astilleros y el comercio regional para mejorar la empleabilidad de sus egresados.",
        audioUrl: "/assets/audio/inacap/inacap_local_7.mp3"
      }
    },
    {
      id: 8,
      anio: 2012,
      titulo: "Innovación Pedagógica",
      descripcion:
        "Se implementa el modelo de Aprendizaje Basado en Competencias (ABC), revolucionando la forma de enseñar y evaluar. Los estudiantes aprenden haciendo, en entornos que simulan el mundo laboral real.",
      audioUrl: "/assets/audio/inacap/inacap_8.mp3",
      local: {
        titulo: "Laboratorio de Especialidad",
        descripcion: "El Aprendizaje Basado en Competencias se afianza en Valdivia con laboratorios rediseñados y metodologías activas orientadas a proyectos prácticos en áreas forestales, acuícolas y de servicios.",
        audioUrl: "/assets/audio/inacap/inacap_local_8.mp3"
      }
    },
    {
      id: 9,
      anio: 2020,
      titulo: "Transformación Digital Total",
      descripcion:
        "La pandemia acelera la transformación digital de INACAP. Se desarrollan plataformas de aprendizaje virtual, laboratorios remotos y nuevas metodologías híbridas que permanecen hasta hoy.",
      audioUrl: "/assets/audio/inacap/inacap_9.mp3",
      local: {
        titulo: "Innovación en Pandemia",
        descripcion: "La sede Valdivia adapta sus aulas al formato online y mixto. Los laboratorios de mecánica y electricidad continúan operando de forma semipresencial bajo estrictos resguardos sanitarios.",
        audioUrl: "/assets/audio/inacap/inacap_local_9.mp3"
      }
    },
    {
      id: 10,
      anio: 2026,
      titulo: "60 Años de Excelencia",
      descripcion:
        "INACAP celebra 6 décadas de compromiso con la educación técnica y profesional de Chile. Con más de 26 sedes a nivel nacional y miles de egresados, mira al futuro con la misma pasión del primer día.",
      audioUrl: "/assets/audio/inacap/inacap_10.mp3",
      local: {
        titulo: "Sede del Futuro",
        descripcion: "INACAP Valdivia conmemora 60 años formando profesionales con foco en sustentabilidad, digitalización industrial e innovación aplicada en alianza con el desarrollo fluvial de la Región de Los Ríos.",
        audioUrl: "/assets/audio/inacap/inacap_local_10.mp3"
      }
    },
  ],

  construccion: [
    {
      id: 1,
      anio: 1966,
      titulo: "Albañilería Artesanal",
      descripcion:
        "En los años 60, la construcción en Chile se basaba en técnicas artesanales heredadas. El ladrillo y el adobe eran los materiales predominantes, y el conocimiento se transmitía de maestro a aprendiz en la obra misma.",
      audioUrl: "/assets/audio/construccion/construccion_1.mp3",
      imagenes: [
        "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop&q=80"
      ],
      obraRelacionada: {
        nombre: "Barrio Concha y Toro",
        descripcion: "Ejemplo clásico de albañilería tradicional en Santiago, con fachadas ornamentadas y técnicas artesanales de albañilería en ladrillo.",
        anio: 1920,
        imagenUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 2,
      anio: 1972,
      titulo: "Hormigón Armado",
      descripcion:
        "La masificación del hormigón armado transforma el paisaje urbano chileno. Se construyen los primeros edificios en altura y se desarrollan nuevas técnicas de encofrado y vibrado del concreto.",
      audioUrl: "/assets/audio/construccion/construccion_2.mp3",
      obraRelacionada: {
        nombre: "Edificio CEPAL (Santiago)",
        descripcion: "Diseñado por Emilio Duhart, es una obra maestra del hormigón a la vista en Chile y referente mundial de la arquitectura moderna.",
        anio: 1966,
        imagenUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 3,
      anio: 1978,
      titulo: "Normativa Antisísmica",
      descripcion:
        "Tras los devastadores terremotos, Chile desarrolla una de las normativas antisísmicas más exigentes del mundo. Los técnicos de INACAP son formados en estas nuevas regulaciones desde el primer día.",
      audioUrl: "/assets/audio/construccion/construccion_3.mp3",
      obraRelacionada: {
        nombre: "Torre Santa María",
        descripcion: "Primer rascacielos de Santiago construido bajo estrictas normas de ingeniería sísmica, resistiendo exitosamente el terremoto de 1985.",
        anio: 1980,
        imagenUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 4,
      anio: 1985,
      titulo: "Prefabricación Industrial",
      descripcion:
        "La construcción modular y prefabricada llega a Chile. Las plantas de producción de elementos prefabricados de hormigón permiten construir más rápido y con mayor control de calidad.",
      audioUrl: "/assets/audio/construccion/construccion_4.mp3",
      obraRelacionada: {
        nombre: "Planta Industrial KPD",
        descripcion: "Famoso sistema de edificación prefabricada en paneles de hormigón armado, clave para dar respuesta rápida al déficit habitacional.",
        anio: 1972,
        imagenUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 5,
      anio: 1992,
      titulo: "Materiales Compuestos",
      descripcion:
        "Nuevos materiales como el acero galvanizado, las planchas de fibrocemento y los aislantes térmicos revolucionan la construcción. La eficiencia energética comienza a ser un factor de diseño.",
      audioUrl: "/assets/audio/construccion/construccion_5.mp3",
      obraRelacionada: {
        nombre: "Instalaciones Industriales Carozzi",
        descripcion: "Innovó en el uso de estructuras de acero galvanizado y planchas compuestas termoaislantes para grandes luces en centros logísticos.",
        anio: 1993,
        imagenUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 6,
      anio: 1999,
      titulo: "AutoCAD y Diseño Digital",
      descripcion:
        "El diseño asistido por computador reemplaza el tablero de dibujo. Los técnicos aprenden a manejar software especializado que permite mayor precisión y velocidad en los proyectos.",
      audioUrl: "/assets/audio/construccion/construccion_6.mp3",
      obraRelacionada: {
        nombre: "Gran Torre Santiago",
        descripcion: "El uso de diseño asistido por computadora facilitó la coordinación tridimensional de instalaciones y planos estructurales complejos.",
        anio: 2013,
        imagenUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 7,
      anio: 2005,
      titulo: "Construcción Sustentable",
      descripcion:
        "La certificación LEED y los principios de construcción verde llegan a Chile. Se incorporan paneles solares, sistemas de reciclaje de aguas y materiales eco-amigables en los proyectos.",
      audioUrl: "/assets/audio/construccion/construccion_7.mp3",
      obraRelacionada: {
        nombre: "Edificio Transoceánica (Vitacura)",
        descripcion: "Hito de arquitectura bioclimática en Chile, diseñado para maximizar la luz natural, geotermia y eficiencia hídrica. Certificación LEED Gold.",
        anio: 2010,
        imagenUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 8,
      anio: 2012,
      titulo: "BIM: Modelado 3D",
      descripcion:
        "Building Information Modeling transforma la planificación de obras. Los modelos 3D permiten detectar interferencias antes de construir, ahorrando tiempo y recursos en cada proyecto.",
      audioUrl: "/assets/audio/construccion/construccion_8.mp3",
      obraRelacionada: {
        nombre: "Nuevo Aeropuerto de Santiago AMB",
        descripcion: "Uno de los proyectos de infraestructura más grandes de Chile modelados íntegramente en BIM para evitar interferencias de obra.",
        anio: 2021,
        imagenUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 9,
      anio: 2020,
      titulo: "Drones e IoT en Obra",
      descripcion:
        "Los drones monitorean avances de obra en tiempo real. Sensores IoT controlan la temperatura del hormigón, la humedad de los materiales y la seguridad de los trabajadores.",
      audioUrl: "/assets/audio/construccion/construccion_9.mp3",
      obraRelacionada: {
        nombre: "Puente Industrial y Viaducto Chacao",
        descripcion: "Monitoreo topográfico y control de vaciado masivo de hormigón en pilas submarinas mediante sensores de temperatura IoT.",
        anio: 2024,
        imagenUrl: "https://images.unsplash.com/photo-1545558014-86805776ac98?w=600&auto=format&fit=crop&q=80"
      }
    },
    {
      id: 10,
      anio: 2026,
      titulo: "Impresión 3D y Robótica",
      descripcion:
        "La impresión 3D de estructuras y la robótica en obra representan el futuro de la construcción. INACAP forma a los técnicos que operarán estas tecnologías disruptivas.",
      audioUrl: "/assets/audio/construccion/construccion_10.mp3",
      obraRelacionada: {
        nombre: "Casa Impresa en 3D (UBB)",
        descripcion: "La primera vivienda habitable de hormigón construida completamente con tecnología de impresión robótica 3D en Latinoamérica.",
        anio: 2024,
        imagenUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80"
      }
    },
  ],

  herramientas: [
    {
      id: 1,
      anio: 1966,
      titulo: "Herramientas Manuales Clásicas",
      descripcion:
        "El martillo, el serrucho, la plomada y el nivel de burbuja eran las herramientas fundamentales de todo constructor. El dominio de estas herramientas definía la calidad del oficio.",
      audioUrl: "/assets/audio/herramientas/herramientas_1.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_1.glb",
      imagenes: [
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=600&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 2,
      anio: 1972,
      titulo: "Primeras Herramientas Eléctricas",
      descripcion:
        "El taladro eléctrico y la sierra circular portátil llegan a las obras chilenas. Estas herramientas multiplican la productividad y permiten cortes más precisos en menos tiempo.",
      audioUrl: "/assets/audio/herramientas/herramientas_2.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_2.glb",
    },
    {
      id: 3,
      anio: 1978,
      titulo: "Instrumentos de Medición",
      descripcion:
        "El teodolito y la cinta métrica de acero se convierten en estándar. La precisión en las mediciones es crítica para cumplir con las nuevas normativas de construcción antisísmica.",
      audioUrl: "/assets/audio/herramientas/herramientas_3.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_3.glb",
    },
    {
      id: 4,
      anio: 1985,
      titulo: "Herramientas Neumáticas",
      descripcion:
        "Los compresores y herramientas neumáticas como la clavadora y el martillo rompedor transforman el trabajo pesado. La velocidad de ejecución se multiplica exponencialmente.",
      audioUrl: "/assets/audio/herramientas/herramientas_4.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_4.glb",
    },
    {
      id: 5,
      anio: 1992,
      titulo: "Nivel Láser",
      descripcion:
        "El nivel láser reemplaza al nivel de manguera y la plomada tradicional. La alineación perfecta se logra en segundos, revolucionando los procesos de instalación and acabado.",
      audioUrl: "/assets/audio/herramientas/herramientas_5.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_5.glb",
    },
    {
      id: 6,
      anio: 1999,
      titulo: "Estación Total Electrónica",
      descripcion:
        "La estación total combina teodolito electrónico y distanciómetro en un solo instrumento. La topografía digital permite levantamientos de terreno con precisión milimétrica.",
      audioUrl: "/assets/audio/herramientas/herramientas_6.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_6.glb",
    },
    {
      id: 7,
      anio: 2005,
      titulo: "Herramientas Inalámbricas",
      descripcion:
        "Las baterías de litio permiten herramientas sin cable con potencia equivalente a las eléctricas. El atornillador inalámbrico y la rotomartillo a batería se vuelven indispensables.",
      audioUrl: "/assets/audio/herramientas/herramientas_7.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_7.glb",
    },
    {
      id: 8,
      anio: 2012,
      titulo: "Escáner 3D",
      descripcion:
        "El escáner láser 3D captura millones de puntos para crear nubes de puntos detalladas. Permite documentar obras existentes y verificar la calidad de la construcción con precisión submilimétrica.",
      audioUrl: "/assets/audio/herramientas/herramientas_8.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_8.glb",
    },
    {
      id: 9,
      anio: 2020,
      titulo: "Drones de Inspección",
      descripcion:
        "Los drones equipados con cámaras térmicas y LiDAR inspeccionan estructuras en altura, techos y fachadas sin riesgo para los trabajadores. El levantamiento fotogramétrico se hace en horas.",
      audioUrl: "/assets/audio/herramientas/herramientas_9.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_9.glb",
    },
    {
      id: 10,
      anio: 2026,
      titulo: "Exoesqueletos y Wearables",
      descripcion:
        "Los exoesqueletos asisten a los trabajadores en tareas pesadas, reduciendo lesiones. Los cascos inteligentes con realidad aumentada superponen planos BIM sobre la obra real.",
      audioUrl: "/assets/audio/herramientas/herramientas_10.mp3",
      modelo3dUrl: "/assets/models/herramientas/herramienta_10.glb",
    },
  ],
};
