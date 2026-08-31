// ============================================================
// DATOS DEL SITIO — EDITAR ACÁ
// Todo el contenido dinámico (equipo, entrevistas, transmisiones,
// redes, estadísticas) vive en este archivo. No hace falta tocar
// index.html ni js/main.js para actualizar estos datos.
// ============================================================

export const SITE = {
  nombre: "Un Rato de Fútbol",
  slogan: "Periodismo, fútbol y pasión.",
  descripcionCorta:
    "Un proyecto de comunicación deportiva dedicado a la cobertura, difusión y generación de contenidos vinculados al fútbol.",
  // Rutas de logos — reemplazar por los archivos reales
  logo: "assets/logo.svg",
  logoReducido: "assets/logo-reducido.svg",
  // Dossier de prensa en PDF — reemplazar por el archivo real
  dossierPdf: "assets/dossier/dossier-un-rato-de-futbol.pdf",
};

export const SOCIAL_LINKS = [
  { id: "instagram", nombre: "Instagram", usuario: "@unratodefutbol", url: "https://instagram.com/unratodefutbol" },
  { id: "tiktok", nombre: "TikTok", usuario: "@unratodefutbol", url: "https://tiktok.com/@unratodefutbol" },
  { id: "youtube", nombre: "YouTube", usuario: "Un Rato de Fútbol", url: "https://youtube.com/@unratodefutbol" },
  { id: "kick", nombre: "Kick", usuario: "unratodefutbol", url: "https://kick.com/unratodefutbol" },
];

export const CONTACT_INFO = {
  emailPrensa: "prensa@unratodefutbol.com",
  emailGeneral: "hola@unratodefutbol.com",
  motivos: [
    { value: "prensa", label: "Prensa — entrevistas, coberturas y acreditaciones" },
    { value: "clubes", label: "Clubes / Instituciones — propuestas y coordinación" },
    { value: "sponsors", label: "Sponsors — propuestas comerciales y alianzas" },
    { value: "general", label: "Consulta general" },
  ],
  // Reemplazar por el endpoint de Formspree / EmailJS / Supabase cuando esté disponible.
  // Ver README.md, sección "Conectar el formulario a un backend".
  formEndpoint: "",
};

// Para agregar un integrante nuevo, sumá un objeto más al array.
export const TEAM = [
  {
    id: "joaquin-sandoval",
    nombre: "Joaquín Sandoval",
    rol: "Relator",
    descripcion: "Conduce el relato de las transmisiones, marcando el ritmo y la emoción de cada partido.",
    // REEMPLAZAR POR FOTO REAL DE JOAQUÍN SANDOVAL
    foto: "assets/equipo/joaquin-sandoval.jpg",
    instagram: "",
  },
  {
    id: "lautaro-peralta",
    nombre: "Lautaro Peralta",
    rol: "Comentarista / Vestuarista",
    descripcion: "Aporta el análisis táctico en las transmisiones y trabaja el contacto directo en zona de vestuarios.",
    // REEMPLAZAR POR FOTO REAL DE LAUTARO PERALTA
    foto: "assets/equipo/lautaro-peralta.jpg",
    instagram: "",
  },
  {
    id: "francesco-gandolfo",
    nombre: "Francesco Gandolfo",
    rol: "Comentarista / Vestuarista",
    descripcion: "Suma su mirada al comentario en vivo y a la cobertura desde el vestuario tras cada encuentro.",
    // REEMPLAZAR POR FOTO REAL DE FRANCESCO GANDOLFO
    foto: "assets/equipo/francesco-gandolfo.jpg",
    instagram: "",
  },
  {
    id: "nicolas-de-los-santos",
    nombre: "Nicolás De Los Santos",
    rol: "Periodista / Entrevistador",
    descripcion: "Encabeza las entrevistas del proyecto, generando el vínculo con jugadores, entrenadores y dirigentes.",
    // REEMPLAZAR POR FOTO REAL DE NICOLÁS DE LOS SANTOS
    foto: "assets/equipo/nicolas-de-los-santos.jpg",
    instagram: "",
  },
];

// Para sumar una nueva entrevista, agregá un objeto al array.
export const INTERVIEWS = [
  {
    id: "marcelo-goux",
    numero: 2,
    entrevistado: "Marcelo Goux",
    descripcion: "Charla sobre su recorrido en el fútbol y su mirada sobre el presente del deporte.",
    fecha: "2026-05-14",
    // REEMPLAZAR POR FOTO REAL DE MARCELO GOUX
    imagen: "assets/entrevistas/marcelo-goux.jpg",
    youtubeUrl: "",
  },
  {
    id: "alan-crenz",
    numero: 1,
    entrevistado: "Alan Crenz",
    descripcion: "La primera entrevista del proyecto: trayectoria, anécdotas y presente futbolístico.",
    fecha: "2026-03-02",
    // REEMPLAZAR POR FOTO REAL DE ALAN CRENZ
    imagen: "assets/entrevistas/alan-crenz.jpg",
    youtubeUrl: "",
  },
];

// Cargá acá los partidos relatados/comentados por el equipo.
export const BROADCASTS = [
  {
    id: "transmision-1",
    competencia: "Torneo Regional",
    equipos: "Por definir vs. Por definir",
    fecha: "2026-06-01",
    resultado: "—",
    plataforma: "YouTube",
    imagen: "assets/transmisiones/transmision-1.jpg",
    url: "",
  },
  {
    id: "transmision-2",
    competencia: "Torneo Regional",
    equipos: "Por definir vs. Por definir",
    fecha: "2026-06-15",
    resultado: "—",
    plataforma: "Kick",
    imagen: "assets/transmisiones/transmision-2.jpg",
    url: "",
  },
];

// Números mostrados en "Quiénes somos"
export const QUICK_STATS = [
  { id: "entrevistas", valor: 2, sufijo: "+", label: "Entrevistas" },
  { id: "coberturas", valor: 5, sufijo: "+", label: "Coberturas" },
  { id: "transmisiones", valor: 2, sufijo: "+", label: "Transmisiones" },
  { id: "seguidores", valor: 500, sufijo: "+", label: "Seguidores" },
];

// Números mostrados en "Un proyecto en crecimiento"
export const GROWTH_STATS = [
  { id: "seguidores", valor: 500, sufijo: "+", label: "Seguidores en redes" },
  { id: "entrevistas", valor: 2, sufijo: "+", label: "Entrevistas realizadas" },
  { id: "transmisiones", valor: 2, sufijo: "+", label: "Transmisiones al aire" },
  { id: "coberturas", valor: 5, sufijo: "+", label: "Coberturas periodísticas" },
  { id: "reproducciones", valor: 10000, sufijo: "+", label: "Reproducciones" },
];
