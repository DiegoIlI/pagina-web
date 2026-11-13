import React, { useRef, useState } from 'react';
import { gsap, prefersReduced, isFinePointer } from '../lib/motion';
import { resolvePhoto } from '../config';

/** Texto en líneas con máscara (para el revelado tipográfico). */
export function Lines({ lines, className = '' }) {
  return lines.map((t, i) => (
    <span className={`mask ${className}`} key={i}>
      <span>{t}</span>
    </span>
  ));
}

/** Texto por letras con máscara. */
export function Chars({ text, className = '' }) {
  return (
    <span className={`word ${className}`} aria-hidden="true">
      {[...text].map((c, i) => (
        <span className="ch" key={i}>
          <span>{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </span>
  );
}

/** Fotografía con respaldo: si falla la carga, se oculta y queda la ilustración. */
export function Photo({ src, alt = '', className = '', sizes = '(max-width: 900px) 90vw, 70vw', eager = false }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return null;
  const srcSet = [640, 1000, 1600].map((w) => `${resolvePhoto(src, w)} ${w}w`).join(', ');
  return (
    <img
      className={`photo ${className}`}
      src={resolvePhoto(src, 1000)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setOk(false)}
    />
  );
}

/** Botón/enlace con respuesta magnética moderada (solo ratón; en táctil no hace nada). */
export function Magnetic({ as: Tag = 'button', className = '', children, strength = 0.18, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    if (prefersReduced() || !isFinePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.4, ease: 'power3.out', overwrite: 'auto',
    });
  };
  const leave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.6)', overwrite: 'auto' });
  };
  return (
    <Tag ref={ref} className={`btn ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionTag({ n, children }) {
  return (
    <div className="tag" data-reveal>
      <span className="tag-n">{n}</span>
      <span className="tag-line" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
