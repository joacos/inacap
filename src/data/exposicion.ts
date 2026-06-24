export type ObraRelacionada = {
  nombre: string;
  descripcion: string;
  anio: number | string;
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
  anio: number | string;
  titulo: string;
  descripcion: string;
  audioUrl: string;
  modelo3dUrl?: string;
  imagenes?: string[];
  obraRelacionada?: ObraRelacionada;
  obrasRelacionadas?: ObraRelacionada[];
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
      anio: "1960",
      titulo: "Ingeniería de emergencias en el \"Riñihuazo\"",
      descripcion: "En 1960, el mayor terremoto de la historia sacudió el sur de Chile, detonando una crisis sin precedentes. Este hito marcó el desarrollo de la ingeniería de emergencia y consolidó grandes obras de hormigón en la zona central y el sur del país.",
      audioUrl: "/assets/audio/construccion/construccion_1.mp3",
      obrasRelacionadas: [
        {
          nombre: "Arquitectura Alemana en la Isla Teja",
          descripcion: "Construida por Gustavo Prochelle en la Isla Teja de Valdivia, representa la influencia de la colonización alemana en el sur de Chile. Destaca por su arquitectura en maderas nativas adaptada al clima lluvioso regional y fue declarada Monumento Histórico Nacional en 1985.",
          anio: "1902",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/c3b091813_image.png"
        },
        {
          nombre: "Vanguardia en Hormigón Visto",
          descripcion: "Diseñado en Santiago por el arquitecto Emilio Duhart, constituye un referente ícono de la arquitectura moderna latinoamericana y sede de la CEPAL. Su diseño innovador en hormigón armado fue adaptado metodológicamente a las exigentes condiciones sísmicas de Chile, destacando por su estructura horizontal y caracol central.",
          anio: "1963–1966",
          imagenUrl: "https://media.base44.com/images/public/6a2d230dc1aabbc72c3e524e/3378bf3f0_WA_1781340472818.jpg"
        },
        {
          nombre: "La Catedral del Básquetbol Chileno",
          descripcion: "Diseñado por Mario Recordón y Alberto Sartori, el pabellón techado se transformó en la 'Catedral del básquetbol chileno'. El proyecto optimizó el uso público mediante soluciones de techado continuo de gran envergadura y graderías de hormigón armado para guarecerse de las intensas lluvias locales.",
          anio: "1966",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/38e1ca4f6_image.png"
        },
        {
          nombre: "Hazaña de la Ingeniería de Emergencia",
          descripcion: "Tras el terremoto del 22 de mayo de 1960, tres gigantescos deslizamientos bloquearon el río San Pedro creando un embalse peligroso en el lago Riñihue. Ante la falla de maquinarias por el lodo, cientos de obreros y voluntarios construyeron manualmente canales de evacuación durante 63 días, evitando una catastrófica inundación sobre Valdivia.",
          anio: "1960",
          imagenUrl: "https://media.base44.com/images/public/6a2d230dc1aabbc72c3e524e/8f2782708_rinihue2.jpg"
        },
      ]
    },
    {
      id: 2,
      anio: "1969",
      titulo: "Finalización de la Ruta 5 Sur",
      descripcion: "La integración territorial avanzó exponencialmente con la pavimentación y finalización de grandes tramos de la Ruta 5. Estas obras viales permitieron acortar distancias logísticas vitales y fueron acompañadas por grandes proezas de cálculo estructural en la cordillera.",
      audioUrl: "/assets/audio/construccion/construccion_2.mp3",
      obrasRelacionadas: [
        {
          nombre: "Red Vial de más de 3.000 Kilómetros",
          descripcion: "Obra de infraestructura vial que consolidó una red de más de 3.000 kilómetros pavimentados continuos entre Arica y Puerto Montt. Su unificación territorial progresó decisivamente con el Decreto N.º 150 de 1967 del Ministerio de Obras Públicas, articulando el territorio nacional de norte a sur.",
          anio: "1969",
          imagenUrl: "https://media.base44.com/images/public/6a2d230dc1aabbc72c3e524e/f93aede64_img-ruta5_julio1980.png"
        },
        {
          nombre: "Hidroeléctrica y Cálculo Estructural",
          descripcion: "Central de pasada en la cuenca del río Laja iniciada por ENDESA en 1972 e inaugurada en octubre de 1981. Destaca por excavaciones masivas en roca cordillerana y túneles subterráneos blindados de hormigón y acero que reutilizan en cascada las descargas de las plantas El Toro y Abanico.",
          anio: "1972",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/88f384f82_IMG-20260615-WA0001.jpg"
        },
      ]
    },
    {
      id: 3,
      anio: "1974",
      titulo: "Desarrollo de la industria naval (ASENAV)",
      descripcion: "El sur de Chile consolida su tradición marítima con la fundación de ASENAV en Valdivia, convirtiendo a la ciudad en la capital de la industria naval privada. En paralelo, en la capital, se inauguraban megainfraestructuras que revolucionarían las telecomunicaciones nacionales.",
      audioUrl: "/assets/audio/construccion/construccion_3.mp3",
      obrasRelacionadas: [
        {
          nombre: "Principal Astillero Privado del Pacífico Sur",
          descripcion: "Astilleros y Servicios Navales S.A. fue fundada en Valdivia por el ingeniero naval alemán Eberhard Kossmann. Nació como un pequeño taller en la ribera del río Calle-Calle y evolucionó hasta convertirse en el principal astillero privado del Pacífico sudamericano.",
          anio: "1974",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/112d3f86e_image.png"
        },
        {
          nombre: "Modernización Radical de las Telecomunicaciones",
          descripcion: "Emplazada como parte estratégica del Centro Nacional de Telecomunicaciones a partir del 1 de julio de 1970, modernizó de forma radical la conectividad de larga distancia de Chile. Integró los flujos de telefonía, televisión y radio, consolidándose como un hito urbano en Santiago y resistiendo impecablemente los terremotos de 1985 y 2010.",
          anio: "1970–1974",
          imagenUrl: "https://media.base44.com/images/public/6a2d230dc1aabbc72c3e524e/7c7028814_EDOziOcWsAAbsbr.jpg"
        },
      ]
    },
    {
      id: 4,
      anio: "1976",
      titulo: "Ley General de Urbanismo y Construcciones",
      descripcion: "La promulgación de la LGUC estableció un marco normativo moderno para el desarrollo territorial chileno. Al mismo tiempo, se iniciaron colosales obras de infraestructura destinadas a conectar los rincones más aislados de la Patagonia mediante explosiones y tajos en la roca viva.",
      audioUrl: "/assets/audio/construccion/construccion_4.mp3",
      obrasRelacionadas: [
        {
          nombre: "Ley de Urbanismo y Ruta al Fin del Mundo",
          descripcion: "En diciembre de 1975 se promulgó la Ley General de Urbanismo y Construcciones (LGUC), fijando un moderno marco normativo territorial. En paralelo, en 1976 el MOP y el Cuerpo Militar del Trabajo iniciaron la construcción de la Carretera Austral (Ruta 7) para romper el aislamiento patagónico.",
          anio: "1975–1976",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/749e042e0_image.png"
        },
      ]
    },
    {
      id: 5,
      anio: "1985",
      titulo: "Modernización portuaria y conectividad costera",
      descripcion: "Los puertos chilenos comenzaron una transformación logística radical mediante la contenerización. En Valdivia, este impulso se reflejó en infraestructuras viales y puentes que lograron romper el aislamiento histórico de las zonas costeras como Corral y Niebla.",
      audioUrl: "/assets/audio/construccion/construccion_5.mp3",
      obrasRelacionadas: [
        {
          nombre: "Viaducto Clave de la Costa Valdiviana",
          descripcion: "Desarrollo vial costero fundamental que permitió asegurar la continuidad de la ruta terrestre permanente entre Valdivia y Corral. La infraestructura del puente contribuyó significativamente a mitigar el aislamiento histórico de Corral, potenciando la integración de la provincia.",
          anio: "1984–1985",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/129e96188_image.png"
        },
        {
          nombre: "Revolución Logística del Comercio Exterior",
          descripcion: "Proceso de mejoramiento de los puertos de San Antonio y Valparaíso mediante incorporación masiva de sistemas de carga en contenedores, muelles ampliados y grúas de alto tonelaje. Esta revolución logística aceleró sustancialmente los tiempos operativos del comercio exterior chileno.",
          anio: "1980–1990",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/cec8c1d82_IMG-20260615-WA0000.jpg"
        },
      ]
    },
    {
      id: 6,
      anio: "1982",
      titulo: "Transformación digital con AutoCAD",
      descripcion: "La llegada del diseño digital reemplazó al tablero de dibujo manual, permitiendo niveles de precisión inéditos en los planos estructurales. Esto facilitó el rediseño sísmico de centros cívicos, normalizaciones hospitalarias y el alzamiento de grandes viaductos interurbanos.",
      audioUrl: "/assets/audio/construccion/construccion_6.mp3",
      obrasRelacionadas: [
        {
          nombre: "El Dibujo Técnico Digital en Chile",
          descripcion: "La llegada de AutoCAD en 1982 revoluciona las oficinas técnicas de ingeniería y arquitectura en Chile, reemplazando el dibujo manual en tablero por el diseño asistido por computadora. Este cambio tecnológico optimizó cubicaciones, precisión en planos estructurales y productividad, marcando un antes y después en la forma de proyectar y ejecutar infraestructura en el país.",
          anio: "1982",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/134a6033f_WA_1781501247777.jpeg"
        },
        {
          nombre: "Ingeniería Sísmica en el Centro Cívico",
          descripcion: "Desafío logístico y estructural en pleno centro cívico para subsanar los daños del terremoto de 1960. Empleó criterios sísmicos modernos: losa de fundación tipo 'balsa', zócalo rígido subterráneo de hormigón y una torre de campanario calada de 50 metros diseñada para reducir la resistencia aerodinámica y la masa sísmica.",
          anio: "1988–1998",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/07ff24a25_image.png"
        },
        {
          nombre: "Mayor Intervención Hospitalaria desde 1960",
          descripcion: "Mega obra de modernización hospitalaria que se transformó en la mayor intervención edilicia del recinto asistencial desde el terremoto de 1960. El proyecto de normalización arquitectónica unificó múltiples unidades y servicios de alta complejidad dispersos en la zona sur austral.",
          anio: "1992–1996",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/78583163e_image.png"
        },
        {
          nombre: "Ampliación Vial para el Crecimiento Urbano",
          descripcion: "Obra vial planificada para ampliar y complementar el puente original de arcos de hormigón inaugurado en 1945, respondiendo al acelerado crecimiento automotriz e inmobiliario. Su edificación permitió separar flujos vehiculares por sentidos de tránsito, optimizando la fluidez vial entre el centro y el acceso por Las Ánimas.",
          anio: "1994",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/eafd18717_image.png"
        },
        {
          nombre: "Gran Viaducto sobre el Biobío",
          descripcion: "Viaducto estratégico iniciado en 1998 como eje fundamental del plan maestro de recuperación de la ribera norte del río Biobío. Con más de dos kilómetros de extensión, optimizó la movilidad vial metropolitana uniendo Concepción y San Pedro de la Paz desde su apertura en el año 2000.",
          anio: "1998",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/8a4671b69_WA_1781501051743.jpeg"
        },
      ]
    },
    {
      id: 7,
      anio: "2011",
      titulo: "Hormigones de Alta Resistencia y Cirugía Urbana",
      descripcion: "El nuevo milenio trajo desafíos en altura y en tierra. Mientras se desarrollaban las tecnologías para bombear hormigón a más de 300 metros, en Valdivia se ejecutaban complejas cirugías urbanas para ensanchar avenidas y soterrar de manera masiva el cableado eléctrico.",
      audioUrl: "/assets/audio/construccion/construccion_7.mp3",
      obrasRelacionadas: [
        {
          nombre: "Hormigones H60 a 300 Metros de Altura",
          descripcion: "Proyecto inmobiliario de gran escala en Providencia iniciado el 3 de marzo de 2006. Integró la Gran Torre Santiago (300 metros, 62 pisos), el rascacielos más alto de Sudamérica, gracias al bombeo vertical de hormigón H-60 a 300 metros de altura y un muro cortina inteligente antisísmico.",
          anio: "2006–2012",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/fb7ba79a6_IMG-20260615-WA0003.jpg"
        },
        {
          nombre: "Cirugía Urbana de 3,5 km en Las Ánimas",
          descripcion: "Cirugía urbana de 3,5 km en Las Ánimas con inversión de $9.293 millones de pesos. Contempló 8.000 metros de calzada de hormigón en doble vía, un muro de contención de 400 metros, ciclovías, soterramiento de cables y 2.000 metros de colectores pluviales subterráneos.",
          anio: "2011",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/b9ee113d2_image.png"
        },
      ]
    },
    {
      id: 8,
      anio: "2014",
      titulo: "Contratos Globales y Expansión Comercial",
      descripcion: "El Ministerio de Obras Públicas impulsó pavimentaciones integrales y la renovación de puentes bajo los modernos Contratos Globales de Conservación. Estas mejoras en la accesibilidad catalizaron el desarrollo de los primeros centros comerciales de gran escala en la región.",
      audioUrl: "/assets/audio/construccion/construccion_8.mp3",
      obrasRelacionadas: [
        {
          nombre: "Pavimentación Integral de 28 km Bajo Contratos Globales MOP",
          descripcion: "Mejoramiento integral de 28 km de la Ruta T-35/T-204, transformando un camino de ripio rural en una vía pavimentada segura. Incluyó paraderos, drenaje y la reposición estructural completa de los puentes Cuiculelfu, Pishuinco y Arique, obra pionera bajo Contratos Globales de Conservación del MOP.",
          anio: "2011–2014",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/3fed780cc_IMG-20260615-WA0002.jpg"
        },
        {
          nombre: "El Puente más Largo sobre el Río Calle-Calle",
          descripcion: "Concebido de forma mixta (acero y hormigón armado) entre septiembre de 2013 y diciembre de 2015, se convirtió con sus 328 metros en el puente más largo sobre el río Calle-Calle. Hincó pilotes de acero a 44 metros de profundidad y utilizó sistemas de cerchas modulares de alta carga izados mediante barcazas fluviales.",
          anio: "2013–2015",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/dc0e3c616_image.png"
        },
        {
          nombre: "Primer Gran Centro Comercial de Los Ríos",
          descripcion: "El inicio de la construcción representó un hito urbano sustancial al alzarse como el primer gran centro comercial moderno en la Región de Los Ríos. El desarrollo concentró de manera histórica la actividad comercial e institucional, diversificando la experiencia y hábitos de consumo local.",
          anio: "2014–2015",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/5c20d7f61_image.png"
        },
      ]
    },
    {
      id: 9,
      anio: "2018",
      titulo: "Implementación de la Metodología BIM",
      descripcion: "La adopción de modelos tridimensionales interactivos (BIM) revolucionó la edificación pública y aeroportuaria, permitiendo detectar choques estructurales en tiempo real. Esta eficiencia precedió a colosales desafíos constructivos como el trazado de puentes colgantes sobre canales marinos.",
      audioUrl: "/assets/audio/construccion/construccion_9.mp3",
      obrasRelacionadas: [
        {
          nombre: "Primero en Utilizar Metodología BIM en Chile",
          descripcion: "Caso referencial y pionero en la edificación pública chilena impulsado por el MOP y Planbim. Mediante modelos tridimensionales virtuales integrales se aplicó Clash Detection coordinando anticipadamente las redes estructurales y sanitarias, eliminando planos de papel e incorporando tabletas digitales de control en faena.",
          anio: "2018–2022",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/eef01794a_WA_1781500806068.jpeg"
        },
        {
          nombre: "Mayor Expansión Aeroportuaria en la Historia de Chile",
          descripcion: "Considerada la mayor expansión aeroportuaria en la historia del país, la obra de seis años contempló la construcción del nuevo Terminal Internacional T2, inaugurado en febrero de 2022. Amplió la capacidad de atención anual de 13 millones a 38 millones de pasajeros con tecnologías de operación de vanguardia.",
          anio: "2015–2022",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/1ba26c67b_WA_1781502049688.jpeg"
        },
        {
          nombre: "El Puente Colgante más Largo de Latinoamérica",
          descripcion: "Iniciado el 15 de febrero de 2018, es uno de los proyectos colgantes más ambiciosos del siglo XXI, uniendo Chiloé con el continente a través de 2,75 km. Emplea pilotes de gran diámetro anclados al suelo marino y hormigón de alta resistencia capaz de tolerar la severa corrosión marina y corrientes implacables del canal.",
          anio: "2018",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/30c2c2d6b_WA_1781502070872.jpeg"
        },
      ]
    },
    {
      id: 10,
      anio: "2024",
      titulo: "Traslado Patrimonial e Infraestructura Futura",
      descripcion: "En una hazaña logística inédita, monumentales casonas patrimoniales en Valdivia fueron desplazadas íntegramente sobre rieles hidráulicos. Esta obra de precisión quirúrgica permitió entrelazar el respeto por la arquitectura histórica con la apertura de modernas fajas constructivas para futuros puentes.",
      audioUrl: "/assets/audio/construccion/construccion_10.mp3",
      obrasRelacionadas: [
        {
          nombre: "Inédito Traslado Patrimonial de 80 Metros",
          descripcion: "Extraordinario hito de conservación patrimonial e ingeniería estructural llevado a cabo en febrero de 2024. Para permitir la faja constructiva del futuro Puente Cochrane sin destruir el inmueble histórico de madera, la antigua estructura fue desplazada íntegramente 80 metros mediante un sofisticado sistema de gatas hidráulicas y rieles metálicos de precisión.",
          anio: "2024",
          imagenUrl: "https://media.base44.com/images/public/6a2f887897a0fffe436f42fe/97db24bfe_image.png"
        },
      ]
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
