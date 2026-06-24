export type ObraRelacionada = {
  nombre: string;
  descripcion: string;
  anio: number;
  imagenUrl: string;
};

export type LocalHito = {
  titulo: string;
  descripcion: string;
  audioUrl?: string;
  imagenes?: string[];
};

export type CarreraHito = {
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
      titulo: "Orígenes y Primeros Oficios (1966 - 1970)",
      descripcion: "Fundación de INACAP como Universidad Laboral y establecimiento de la primera sede en Valdivia. El 21 de octubre de 1966 se crea el Instituto Nacional de Capacitación Profesional por Decreto Supremo N°2541 bajo el gobierno de Eduardo Frei Montalva, inaugurando su primera sede nacional como una \"Universidad Laboral\".",
      audioUrl: "/assets/audio/inacap/inacap_1.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bd8c2d4630f55705365a9/96a8f64b9_Screenshot_20260611_232656_PDFMaker.jpg"],
      carreras: {"titulo": "Primeros Cursos de Capacitación en Oficios", "descripcion": "En sus primeros años, INACAP no impartía carreras sino cursos de capacitación en oficios industriales como Tornería, Soldadura, Mecánica y Confección. Estos programas estaban orientados a la formación rápida de mano de obra calificada para el sector productivo, sentando las bases de la educación técnica en Chile.", "imagenes": ["https://media.base44.com/images/public/6a32f160faa893c373a980f6/5cb9c1889_Capturadepantalla164.png"]},
      local: {"titulo": "Inauguración de la Primera Sede INACAP Valdivia", "descripcion": "La Sede Valdivia de INACAP fue inaugurada en 1970, como parte de la expansión nacional del Instituto Nacional de Capacitación Profesional (INACAP), fundado en 1966 por el Estado de Chile. Su creación respondía al necesario impulso en educación técnico-profesional, en un momento en que Chile experimentaba un proceso de industrialización acelerado, requiriendo mano de obra calificada y habilidades aplicadas a la industria y servicios locales.", "imagenes": ["https://media.base44.com/images/public/6a3303b6d623a23befeecf48/6fe1b5712_image.png"]},
    },
    {
      id: 2,
      anio: 1977,
      titulo: "Consolidación como OTEC (1977)",
      descripcion: "La Corporación INACAP se convierte oficialmente en la OTEC más grande y antigua registrada en Chile, permitiendo comercializar programas bajo el beneficio de la Franquicia Tributaria de la época.",
      audioUrl: "/assets/audio/inacap/inacap_2.mp3",
      imagenes: ["https://media.base44.com/images/public/6a3303b6d623a23befeecf48/15298b2cc_image.png"],
      local: {"titulo": "Primeros Talleres Valdivianos", "descripcion": "Se habilitan dependencias locales adaptadas a la geografía y al quehacer industrial del sur, orientadas a mecánica naval y carpintería de ribera.", "audioUrl": "/assets/audio/inacap/inacap_local_2.mp3"},
    },
    {
      id: 3,
      anio: 1981,
      titulo: "Reforma Universitaria y Títulos Técnicos (1981 - 1982)",
      descripcion: "En el contexto de la reforma introducida durante la Dictadura Militar, se privatiza la institución y adopta formalmente la calidad legal de Instituto Profesional (IP) y Centro de Formación Técnica (CFT).",
      audioUrl: "/assets/audio/inacap/inacap_3.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/16c88f0dd_WA_1781265174273.jpg"],
      carreras: {"titulo": "Primeros Títulos Técnicos de Nivel Superior", "descripcion": "Con la transformación de INACAP en CFT e IP, nacen los primeros programas con título técnico de nivel superior de 2 años de duración. Se pasa de la simple capacitación en oficios a la formación técnica profesional acreditada, un salto cualitativo que marca el inicio de la educación superior técnica en la institución.", "imagenes": ["https://media.base44.com/images/public/6a32f160faa893c373a980f6/df9c57a08_Capturadepantalla163.png"]},
      local: {"titulo": "Llegada de la Computación", "descripcion": "Llegan los primeros computadores personales a la sede. Se abre un moderno laboratorio informático facilitando el acceso a herramientas tecnológicas.", "audioUrl": "/assets/audio/inacap/inacap_local_5.mp3"},
    },
    {
      id: 4,
      anio: 1995,
      titulo: "Autonomía y Era Digital Temprana (1995 - 1997)",
      descripcion: "El Instituto Profesional alcanza la plena autonomía académica y administrativa respecto al Estado. Además, se impulsa la Beca Empresario orientada a estudiantes con destacado rendimiento y perfil emprendedor. Mediante el Decreto 534 del Ministerio de Educación, se declara la plena autonomía del Centro de Formación Técnica tras exhaustivas auditorías de solvencia financiera, idoneidad docente y transparencia evaluativa.",
      audioUrl: "/assets/audio/inacap/inacap_4.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/d87fcdd9b_WA_1781264816464.jpeg", "https://media.base44.com/images/public/6a3303b6d623a23befeecf48/c3c5e4aac_image.png"],
      carreras: {"titulo": "Llegada de la Informática: Analista Programador", "descripcion": "INACAP se posiciona como pionera en automatización y tecnología digital a mediados de los 90, incorporando la carrera de Analista Programador. Este hito demuestra que la sede fue vanguardista en informática, con ya 30 años de trayectoria formando profesionales del área tecnológica.", "imagenes": ["https://media.base44.com/images/public/6a32f160faa893c373a980f6/a0ba9c038_Capturadepantalla1631.png"]},
      local: {"titulo": "Acreditación y Vinculación", "descripcion": "La sede local celebra la acreditación con alta vinculación al medio, colaborando de cerca con el ecosistema de astilleros y el comercio regional para mejorar la empleabilidad de sus egresados.", "audioUrl": "/assets/audio/inacap/inacap_local_7.mp3"},
    },
    {
      id: 5,
      anio: 2001,
      titulo: "Pioneros en Calidad (2001 - 2005)",
      descripcion: "INACAP se convierte en la primera institución de educación superior en Chile en certificar todo su sistema académico bajo la norma internacional ISO 9001:2000, auditada por la firma suiza SGS. El Centro de Formación Técnica se somete voluntariamente al proceso de evaluación externa ante la CNA-Chile, obteniendo su primera acreditación institucional en las áreas de Gestión, Docencia y Vinculación con el Medio.",
      audioUrl: "/assets/audio/inacap/inacap_5.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/ada12d0f7_WA_1781265215003.jpeg", "https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/8fbfe9990_WA_1781266487785.jpeg"],
      local: {"titulo": "Laboratorios de Especialidad", "descripcion": "El Aprendizaje Basado en Competencias se afianza en Valdivia con laboratorios rediseñados y metodologías activas orientadas a proyectos prácticos en áreas forestales, acuícolas y de servicios."},
    },
    {
      id: 6,
      anio: 2006,
      titulo: "Sistema Integrado e Ingenierías (2002 - 2006)",
      descripcion: "Se funda la Universidad Tecnológica de Chile INACAP, incorporando el grado universitario a su oferta y completando un modelo integrado único (CFT, IP y Universidad). Nota: En 2020 inició un plan de cierre programado de la rama universitaria para focalizarse enteramente en el CFT e IP hacia el 2030.",
      audioUrl: "/assets/audio/inacap/inacap_6.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/896bf9ed8_WA_1781265238856.jpeg"],
      carreras: {"titulo": "Llegada de las Ingenierías", "descripcion": "Con la creación de la Universidad Tecnológica de Chile INACAP en 2005, se incorporan las primeras carreras de ingeniería al catálogo de oferta académica. Este período marca la consolidación de INACAP como una institución de educación superior integral, capaz de ofrecer desde títulos técnicos hasta grados universitarios de ingeniería.", "imagenes": ["https://media.base44.com/images/public/6a32f160faa893c373a980f6/fa3615e68_007907318_1-b4fdfe638430eac401b807e35ce5b768-768x994.png"]},
      local: {"titulo": "Sello Profesional e Ingeniería", "descripcion": "La sede Valdivia amplía su oferta integrando ingenierías aplicadas que apoyen la naciente industria pesquera y logística de la Región."},
    },
    {
      id: 7,
      anio: 2016,
      titulo: "Gratuidad e Inclusión (2016)",
      descripcion: "Se expone el contexto de la implementación de la política pública de Gratuidad universal en la educación superior chilena bajo el gobierno de Michelle Bachelet, detallando los requisitos socioeconómicos y académicos exigidos.",
      audioUrl: "/assets/audio/inacap/inacap_7.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/89700e8b9_WA_1781266348266.jpeg"],
      local: {"titulo": "Innovación Educativa contra la Pobreza", "descripcion": "Estudiantes de Psicopedagogía de la sede desarrollaron y donaron materiales multimedia educativos a la Fundación para la Superación de la Pobreza de Los Ríos. Bajo la guía de los docentes Patricia Oportus y Rodrigo Cabrera, los alumnos crearon cuentos interactivos, trabalenguas, adivinanzas y un set de estimulación para fortalecer habilidades cognitivas en niños de sectores vulnerables. Además de apoyar la inclusión social, la iniciativa sirvió como retribución a la Fundación por recibir a estudiantes de la sede en sus prácticas profesionales.", "imagenes": ["https://media.base44.com/images/public/6a3303b6d623a23befeecf48/3d9950a06_image.png"]},
    },
    {
      id: 8,
      anio: 2017,
      titulo: "Crecimiento Regional y Vanguardia Tecnológica (2017 - 2019)",
      descripcion: "Se marca un antes y un después para la educación técnica en la Región de Los Ríos con el histórico traslado hacia el nuevo complejo tecnológico en Avenida Pedro Aguirre Cerda (sector Las Ánimas). La infraestructura de 15.800 m² integró sistemas de vanguardia para albergar a más de 5.000 estudiantes.",
      audioUrl: "/assets/audio/inacap/inacap_8.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bd8c2d4630f55705365a9/63651fedf_ap_sede_inacap_valdivia.jpg"],
      carreras: {"titulo": "Carreras de Vanguardia Tecnológica", "descripcion": "Se incorporan carreras de última generación como Ciberseguridad, Automatización y Robótica Industrial, respondiendo a las demandas de la Industria 4.0. Estas nuevas ofertas académicas justifican la implementación de laboratorios de Realidad Virtual y equipamiento tecnológico de punta en las sedes a nivel nacional.", "imagenes": ["https://media.base44.com/images/public/6a32f160faa893c373a980f6/c5d0b2627_Capturadepantalla165.png"]},
      local: {"titulo": "Epicentro de Innovación Docente y Inclusión Femenina Temprana en STEM", "descripcion": "La sede se convirtió en el punto de encuentro nacional al albergar la segunda versión del Congreso Tecnológico Docente de Informática y Telecomunicaciones. El encuentro reunió a académicos de distintas sedes de Chile y a expositores internacionales de Ecuador y Francia. Se presentaron ocho proyectos de vanguardia enfocados en internet de las cosas (IoT), robótica, programación, análisis de datos y aprendizaje inmersivo, incluyendo talleres prácticos con tecnología Arduino aplicados a la educación. En conjunto con la Seremi de la Mujer y la Equidad de Género de Los Ríos, la sede organizó el primer concurso regional de robótica y programación exclusivo para alumnas de enseñanza media, marcando un claro hito precursor de la actual Beca Mujeres STEM. Convocó a jóvenes de cinco establecimientos: Liceo Comercial de Valdivia, Colegio Laico, Colegio Santa Marta, Liceo Rodulfo Armando Philippi de Paillaco y el Colegio Teniente Merino, que se coronó campeón. Las estudiantes pasaron por talleres intensivos con robots MBOT dictados por docentes de la institución antes de medirse en desafíos prácticos de velocidad y precisión.", "imagenes": ["https://media.base44.com/images/public/6a3303b6d623a23befeecf48/ea65b73e6_image.png", "https://media.base44.com/images/public/6a3303b6d623a23befeecf48/5f7d0d0c6_image.png"]},
    },
    {
      id: 9,
      anio: 2020,
      titulo: "Modernidad Digital (2020 - 2023)",
      descripcion: "Se acelera la transformación digital debido a la contingencia, destacando un convenio estratégico con Huawei para capacitar en tecnologías de la Industria 4.0 (IA, Big Data, 5G) e intensificando la educación virtual.",
      audioUrl: "/assets/audio/inacap/inacap_9.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/4c6d5b5b2_IMG-20260612-WA0007.jpg"],
      local: {"titulo": "Conmemoración Académica 80 Años TP / Red de Exalumnos Destacados", "descripcion": "La sede se convirtió en el epicentro regional de la conmemoración de los 80 años de la Educación Técnico Profesional (TP) en Chile. Durante este hito se lideraron seminarios clave que reunieron a autoridades públicas y a destacados empresarios de la zona para discutir el futuro técnico de la región. Además, Se realizó el lanzamiento oficial de la Red de Exalumnos Destacados de Valdivia. Esta iniciativa fue diseñada con el objetivo de posicionar estratégicamente a los graduados del campus como mentores y líderes de opinión en sectores críticos para la zona, tales como la informática y la gestión de riesgos frente a desastres.", "imagenes": ["https://media.base44.com/images/public/6a3303b6d623a23befeecf48/3878c4dc5_image.png", "https://media.base44.com/images/public/6a3303b6d623a23befeecf48/c279eb488_image.png"]},
    },
    {
      id: 10,
      anio: 2026,
      titulo: "Máxima Acreditación y 60 Años (2024 - 2026)",
      descripcion: "Tanto el Instituto Profesional como el Centro de Formación Técnica alcanzan la excelencia con la obtención de la acreditación máxima de 7 años por parte de la Comisión Nacional de Acreditación (CNA). Coincidiendo con su 60º aniversario, se lanzan beneficios arancelarios (50% y 100% de descuento) para estudiantes nuevos mayores de 50 y 60 años, fomentando el aprendizaje a lo largo de la vida. Se concreta la integración estratégica y legal del CFT y el IP bajo una única entidad: el Instituto Profesional INACAP, actuando este como continuador legal para dar un paso más ágil en la articulación de carreras técnicas y profesionales.",
      audioUrl: "/assets/audio/inacap/inacap_10.mp3",
      imagenes: ["https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/7722f9e9f_WA_1781266502073.jpeg", "https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/db46bd78e_WA_1781266832356.jpeg", "https://media.base44.com/images/public/6a2bf121331e0303a1ce364c/779eb5920_IMG-20260612-WA0020.jpg"],
      local: {"titulo": "Récord de Titulados Sede Valdivia y Alianzas Estratégicas", "descripcion": "Un total de 483 nuevos técnicos y profesionales de todas las áreas académicas recibieron sus títulos. Este acontecimiento se consolidó como un récord histórico para el campus, celebrándose en una masiva e inédita ceremonia presencial que impactó directamente en la fuerza laboral local. Comenzó la alianza con la icónica Cervecería Kunstmann, dictando cátedras especializadas en análisis de aguas y estilos tradicionales de cerveza para productores locales. Este hito fue el puntapié inicial que unió la academia con el sector productivo más característico de la Región de Los Ríos. El alumno de Ingeniería en Telecomunicaciones de la sede, Francisco Loncomilla, alcanzó un histórico 3.º lugar mundial en el track de Network de la \"Huawei ICT Competition\" celebrada en Shenzhen, China. Este logro internacional posicionó la calidad de la formación técnica y tecnológica de la sede a nivel global.", "imagenes": ["https://media.base44.com/images/public/6a3303b6d623a23befeecf48/2ed125b7d_image.png", "https://media.base44.com/images/public/6a3303b6d623a23befeecf48/9615f7a58_image.png", "https://media.base44.com/images/public/6a3303b6d623a23befeecf48/69591ccd3_image.png"]},
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
      titulo: "Familia del Desbaste y Carpintería (Los Cepillos)",
      descripcion: "El cepillo manual y las garlopas de madera dominaban los talleres de carpintería a mediados del siglo XX. El dominio de estas herramientas definía la precisión del oficio y la calidad del acabado en madera.",
      audioUrl: "/assets/audio/herramientas/herramienta_1.mp3",
      modelo3dUrl: "/cepillo.glb",
      imagenes: [
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 2,
      anio: 1978,
      titulo: "Familia del Perforado (Los Taladros)",
      descripcion: "Los taladros eléctricos portátiles y de pedestal transformaron la velocidad de perforación en madera y metales, marcando el inicio de la mecanización a gran escala en los talleres técnicos.",
      audioUrl: "/assets/audio/herramientas/herramienta_2.mp3",
      modelo3dUrl: "/deWalt.glb",
      imagenes: [
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 3,
      anio: 1992,
      titulo: "Familia del Corte (Los Serruchos y Sierras)",
      descripcion: "Serruchos tradicionales, sierras de calar y sierras circulares portátiles agilizaron el dimensionamiento de piezas, incrementando la productividad y disminuyendo el esfuerzo físico en obra.",
      audioUrl: "/assets/audio/herramientas/herramienta_3.mp3",
      modelo3dUrl: "/ingleteadora.glb",
      imagenes: [
        "https://images.unsplash.com/photo-1530124560677-bdaea027df01?w=600&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 4,
      anio: 2005,
      titulo: "Familia de la Nivelación y Topografía (Los Plomos y Niveles)",
      descripcion: "La Estación Total Electrónica unificó la medición de ángulos y distancias en un solo dispositivo digital, aportando precisión milimétrica y permitiendo exportar datos directamente a planos CAD.",
      audioUrl: "/assets/audio/herramientas/herramienta_4.mp3",
      modelo3dUrl: "/estacion_total.glb",
      imagenes: [
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: 5,
      anio: 2026,
      titulo: "Familia de la Unión y Estructura (Las Soldadoras)",
      descripcion: "Soldadoras inversoras compactas y de alta frecuencia facilitaron la unión estructural del acero, permitiendo un arco más de calidad y adaptándose al trabajo pesado tanto en terreno como en taller.",
      audioUrl: "/assets/audio/herramientas/herramienta_5.mp3",
      modelo3dUrl: "/soldadora.glb",
      imagenes: [
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80"
      ]
    }
  ],
};
