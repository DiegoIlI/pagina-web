import { PHOTOS } from './config';

export const NAV = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'equipo', label: 'Refrigeración' },
  { id: 'obra', label: 'Construcción' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'cotizar', label: 'Contacto' },
];

export const SERVICES = [
  {
    id: '01',
    kind: 'cold',
    title: 'REFRIGERACIÓN',
    lead: 'Equipos comerciales e industriales funcionando como tu operación necesita.',
    items: [
      'Reparación de refrigeradores comerciales',
      'Mantenimiento de vitrinas refrigeradas',
      'Instalación y reparación de equipos',
      'Diagnóstico y mantenimiento preventivo',
      'Sistemas de refrigeración comercial e industrial',
    ],
    quote: 'Refrigeración comercial',
  },
  {
    id: '02',
    kind: 'scale',
    title: 'BÁSCULAS Y EQUIPOS',
    lead: 'Servicio técnico para equipos de pesaje y equipamiento comercial.',
    items: [
      'Reparación y mantenimiento de básculas',
      'Diagnóstico de equipos comerciales',
      'Servicios técnicos especializados',
    ],
    quote: 'Básculas y equipos',
  },
  {
    id: '03',
    kind: 'build',
    title: 'CONSTRUCCIÓN',
    lead: 'De la idea al local comercial listo para operar.',
    items: [
      'Construcción de locales comerciales',
      'Remodelaciones y adecuación de espacios',
      'Obras y acabados',
      'Proyectos de construcción comercial',
    ],
    quote: 'Construcción o remodelación',
  },
];

/** Descripciones generales, NO diagnósticos. Cada equipo es distinto. */
export const PARTS = [
  {
    id: 'compresor',
    n: '01',
    name: 'Compresor',
    role: 'Hace circular el refrigerante',
    desc: 'Mueve el refrigerante por el circuito y eleva su presión para que el sistema pueda transferir calor. Es una de las piezas centrales del equipo.',
    checks: ['Funcionamiento general', 'Fijaciones y conexiones', 'Condiciones de operación'],
  },
  {
    id: 'condensador',
    n: '02',
    name: 'Condensador',
    role: 'Libera el calor hacia el ambiente',
    desc: 'Es el intercambiador donde el refrigerante cede el calor que retiró del interior. Su limpieza y su ventilación influyen en cómo trabaja el sistema.',
    checks: ['Limpieza de aletas', 'Flujo de aire', 'Estado general'],
  },
  {
    id: 'evaporador',
    n: '03',
    name: 'Evaporador',
    role: 'Absorbe el calor del interior',
    desc: 'Es el serpentín que retira calor del espacio refrigerado. Se encuentra dentro de la cámara y trabaja junto con los ventiladores.',
    checks: ['Aletas y serpentín', 'Drenaje', 'Estado general'],
  },
  {
    id: 'ventiladores',
    n: '04',
    name: 'Ventiladores',
    role: 'Mueven el aire por el sistema',
    desc: 'Hacen circular el aire a través del evaporador y del condensador, para distribuir el frío y disipar el calor del equipo.',
    checks: ['Giro y holguras', 'Limpieza', 'Fijación'],
  },
  {
    id: 'controles',
    n: '05',
    name: 'Controles de temperatura',
    role: 'Regulan la temperatura de trabajo',
    desc: 'El controlador y sus sensores gobiernan la operación del equipo según la temperatura de trabajo configurada para el producto que conservas.',
    checks: ['Ajustes configurados', 'Lectura del sensor', 'Conexiones'],
  },
];

export const BUILD_STAGES = [
  { n: '01', tag: 'ESPACIO INICIAL', title: 'Un terreno, un local vacío', text: 'Todo proyecto comienza por conocer el espacio, sus medidas y lo que tu negocio necesita de él.' },
  { n: '02', tag: 'CONCEPTO Y PLANOS', title: 'La idea se dibuja', text: 'Distribución, accesos y alcances se definen sobre plano antes de mover un solo material.' },
  { n: '03', tag: 'DESARROLLO ESTRUCTURAL', title: 'Se levanta la estructura', text: 'Cimentación, columnas y cubierta dan forma y solidez al espacio comercial.' },
  { n: '04', tag: 'CONSTRUCCIÓN Y ACABADOS', title: 'El espacio toma carácter', text: 'Muros, cristales, instalaciones y acabados convierten la estructura en un local funcional.' },
  { n: '05', tag: 'RESULTADO', title: 'Listo para operar', text: 'Un espacio comercial terminado, con su equipamiento y su imagen, preparado para recibir clientes.' },
];

/** Escenarios ilustrativos. NO son proyectos ejecutados por la empresa. */
export const SCENES = [
  { n: '01', title: 'Cadena de frío', tag: 'REFRIGERACIÓN COMERCIAL', desc: 'Equipos que conservan producto en comercios y cocinas.', photo: PHOTOS.refrigeration, tone: 'cold' },
  { n: '02', title: 'Cocinas y servicio', tag: 'EQUIPAMIENTO', desc: 'Espacios donde refrigeración y operación trabajan juntas.', photo: PHOTOS.kitchen, tone: 'cold' },
  { n: '03', title: 'Áreas de preparación', tag: 'ADECUACIÓN DE ESPACIOS', desc: 'Distribución pensada para el flujo real de trabajo.', photo: PHOTOS.kitchenWide, tone: 'mix' },
  { n: '04', title: 'Obra en proceso', tag: 'CONSTRUCCIÓN COMERCIAL', desc: 'La fase en la que el proyecto deja de ser plano.', photo: PHOTOS.construction, tone: 'warm' },
  { n: '05', title: 'Espacios por crear', tag: 'REMODELACIÓN', desc: 'Ambientes adaptables a cada tipo de negocio.', photo: PHOTOS.architecture, tone: 'warm' },
];

export const FAQ = [
  { q: '¿Qué equipos de refrigeración atienden?', a: 'Refrigeradores comerciales, vitrinas refrigeradas y sistemas de refrigeración comercial e industrial. Antes de agendar, confirma con nosotros la marca y modelo de tu equipo.' },
  { q: '¿También dan servicio a básculas?', a: 'Sí: reparación, mantenimiento y diagnóstico de básculas y equipos comerciales. Indica el tipo de báscula y qué observas al solicitar el servicio.' },
  { q: '¿Pueden construir o remodelar mi local?', a: 'Sí. Cuéntanos qué espacio tienes y qué necesita tu negocio para revisar el alcance y preparar una propuesta.' },
  { q: '¿Las imágenes de esta página son trabajos reales?', a: 'No. Las fotografías y las secuencias visuales son ilustrativas. Se sustituirán por proyectos reales cuando la empresa los proporcione.' },
];
