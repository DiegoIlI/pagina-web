/**
 * ============================================================
 *  PUNTO ÚNICO DE CONFIGURACIÓN COMERCIAL  (edita SOLO este archivo)
 * ============================================================
 *  - No inventes teléfono, correo, dirección, clientes ni certificaciones.
 *  - Deja vacío ('') lo que aún no esté confirmado: la página lo oculta sola.
 *  - El formulario usa lo que esté configurado:
 *      whatsapp → botón "Enviar por WhatsApp"
 *      email    → botón "Enviar por correo"
 *      (siempre) → "Copiar solicitud"
 */
export const COMPANY = {
  name: 'FRÍO & OBRA', // Nombre provisional: sustituir por el definitivo
  tagline: 'Refrigeración · Básculas · Construcción',
  city: 'Mérida, Yucatán',
  whatsapp: '', // Ej.: '529991234567' (código de país + número, sin símbolos)
  phone: '', // Ej.: '+52 999 123 4567'
  email: '', // Ej.: 'contacto@tuempresa.com'
  hours: '', // Ej.: 'Lun a Sáb · 8:00 a 18:00'
  address: '', // Solo si la empresa desea publicarla
};

export const WHATSAPP_READY = /^\d{11,15}$/.test(COMPANY.whatsapp);
export const EMAIL_READY = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(COMPANY.email);
export const CONTACT_READY = WHATSAPP_READY || EMAIL_READY || Boolean(COMPANY.phone);

export const makeWhatsAppLink = (message) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
export const makeMailLink = (subject, body) =>
  `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/**
 * FOTOGRAFÍAS ILUSTRATIVAS (Unsplash, licencia Unsplash: uso comercial permitido).
 * No son trabajos de la empresa. Si una URL falla, la tarjeta muestra su ilustración
 * de respaldo (la página NUNCA queda en blanco).
 * Para usar fotos propias: súbelas a /public/fotos/ y escribe 'fotos/archivo.jpg'.
 * Fuentes y licencias: ver CREDITOS.md
 */
const U = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
const local = (p) => `${import.meta.env.BASE_URL}${p}`;

export const resolvePhoto = (src, w) => {
  if (!src) return '';
  if (src.startsWith('fotos/')) return local(src);
  return src.replace(/w=\d+/, `w=${w}`);
};

export const PHOTOS = {
  refrigeration: U('photo-1782750161991-23529c9462bb'),
  kitchen: U('photo-1784039534969-26e424548f3e'),
  kitchenWide: U('photo-1790156591731-09dbf6aee75a'),
  construction: U('photo-1748956628042-b73331e0b479'),
  constructionAlt: U('photo-1504307651254-35680f356dfd'),
  architecture: U('photo-1487958449943-2429e8be8625'),
};
