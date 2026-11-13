# FRÍO & OBRA V3 — CINEMATIC EXPERIENCE

Sitio empresarial (React 19 + Vite 6 + GSAP/ScrollTrigger) para refrigeración comercial, servicio técnico de básculas y construcción de locales. Nombre **provisional**: FRÍO & OBRA.

> Fotos e ilustraciones son **ilustrativas**. No hay proyectos, clientes, certificaciones ni testimonios reales publicados. Las secciones de construcción son una **demostración conceptual**.

## Qué incluye

| Sección | Qué hace |
|---|---|
| Hero | Intro cinematográfica corta (~3 s, no bloquea): cámara con push‑in 3D, refrigerador comercial vectorial, tipografía monumental revelada por máscaras, parallax con ratón, cámara que sigue avanzando con el scroll. |
| Servicios | Tres especialidades (refrigeración, básculas, construcción) en filas editoriales. |
| **Refrigeración → Construcción** | Escena fijada (`pin` + `scrub`) de 4 escenas: ventilador (zoom de cámara) → portal circular con cambio de azul a cálido → estructura que se dibuja con cambio de perspectiva 3D → local terminado + CTA. |
| Laboratorio técnico | Esquema 2.5D interactivo: compresor, condensador, evaporador, ventiladores y controles. Resalta, explica, inclina la cámara y mantiene "Solicitar revisión". Sin diagnósticos. |
| Así nace un espacio | 5 etapas (terreno → planos → estructura → acabados → resultado) en isométrico SVG, guiadas por scroll o por botones. |
| Portafolio | Galería horizontal con scroll nativo (táctil), parallax, zoom, arrastre con ratón y comparador estructura ↔ resultado. |
| Cotización | Formulario con validación. Envía por WhatsApp / correo si están configurados y **siempre** permite copiar la solicitud. |

## Comandos

```bash
npm install
npm run dev       # desarrollo
npm run build     # produce dist/
npm run preview   # sirve dist/ en http://localhost:4173/pagina-web/
```

## Publicación en GitHub Pages (repositorio `pagina-web`)

1. Sube **el contenido** de este ZIP a la raíz del repositorio (`index.html`, `package.json`, `src/`, `public/`, `.github/`…, sin carpeta contenedora).
2. En GitHub: *Settings → Pages → Source: **GitHub Actions***.
3. Haz commit a `main`. El workflow `.github/workflows/deploy.yml` compila y publica.
4. URL: `https://<tu-usuario>.github.io/pagina-web/`.

**Prevención de pantalla blanca**
- `vite.config.js` fija `base: '/pagina-web/'` (única fuente de verdad; el workflow ya no pasa `--base`).
- `index.html` usa `%BASE_URL%` para el favicon; ningún recurso usa rutas absolutas `/…`.
- El workflow **falla** si `dist/index.html` no apunta a `/pagina-web/assets/`.
- `ErrorBoundary` en la raíz: si algo falla, se ve un mensaje, nunca una página vacía.
- Las animaciones son mejora progresiva: sin JS de animación o con "reducir movimiento" todo el contenido sigue visible.
- Si renombras el repositorio, cambia `REPO_BASE` en `vite.config.js` y las dos rutas del paso *Verificar rutas* del workflow.

## Configuración (un solo archivo): `src/config.js`
Nombre, ciudad, `whatsapp` (`529991234567`), `phone`, `email`, `hours`, `address`. Lo que dejes vacío se oculta. No inventes datos.

## Decisiones técnicas
- **GSAP + ScrollTrigger** para pin/scrub/timelines. **Sin ScrollSmoother ni Lenis**: el scroll nativo es más estable en iOS Safari y evita conflictos con escenas fijadas.
- **Sin Three.js/WebGL**: el 2.5D en SVG/CSS 3D da la profundidad necesaria sin coste de GPU ni de peso; los modelos 3D no aportaban valor sin material real.
- **Sin lucide-react ni @gsap/react**: iconos SVG propios y `gsap.context` con limpieza propia (menos dependencias).
- Móvil: escena fijada más corta, efectos pesados (`.fx-heavy`) desactivados, tamaños de toque ≥ 44 px, campos a 16 px (sin zoom de iOS), `svh` y *safe areas*.
- Accesibilidad: `prefers-reduced-motion`, foco visible, `aria-*`, menú con `inert`, enlace "Saltar al contenido".

## Fotografías
Ver `CREDITOS.md`. Para usar fotos propias: súbelas a `public/fotos/` y en `src/config.js` usa `'fotos/archivo.jpg'`.

## Estado de verificación
Ver la sección final de la entrega: qué se probó y qué **no** se pudo probar en el entorno de desarrollo (sin acceso a npm).
