import React, { useEffect } from 'react';
import { COMPANY } from '../config';
import { gsap, useMotion, isFinePointer, prefersReduced } from '../lib/motion';
import { ArrowDown, ArrowUpRight } from '../lib/icons';
import { Chars, Lines, Magnetic } from './ui';

/** Equipo de refrigeración comercial de dos puertas (ilustración vectorial original). */
function HeroFridge() {
  const shelves = [180, 268, 356, 444];
  const bottles = (x0, y) =>
    Array.from({ length: 6 }, (_, i) => (
      <rect key={`${x0}-${y}-${i}`} x={x0 + 14 + i * 28} y={y - 46 - ((i * 7) % 12)} width="16" height={46 + ((i * 7) % 12)} rx="4"
        fill="#9fd9f2" opacity={0.18 + (i % 3) * 0.07} />
    ));
  return (
    <svg className="hero-fridge-svg" viewBox="0 0 520 690" role="img" aria-label="Ilustración de un refrigerador comercial de dos puertas con luz fría">
      <defs>
        <linearGradient id="hf-steel" x1="0" x2="1"><stop offset="0" stopColor="#58707c" /><stop offset=".5" stopColor="#a8bcc6" /><stop offset="1" stopColor="#4f6571" /></linearGradient>
        <linearGradient id="hf-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9f4ff" stopOpacity=".95" /><stop offset=".45" stopColor="#58b9e0" stopOpacity=".55" /><stop offset="1" stopColor="#0c3550" stopOpacity=".9" /></linearGradient>
        <linearGradient id="hf-streak" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <filter id="hf-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id="hf-floor"><stop offset="0" stopColor="#5fd0ff" stopOpacity=".38" /><stop offset="1" stopColor="#5fd0ff" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="260" cy="662" rx="250" ry="26" fill="url(#hf-floor)" className="fx-heavy" />
      <rect x="36" y="22" width="448" height="606" rx="16" fill="url(#hf-steel)" stroke="#2b3b44" strokeWidth="2" />
      <rect x="36" y="22" width="448" height="62" rx="16" fill="#0b161c" />
      <rect x="318" y="36" width="140" height="34" rx="6" fill="#041117" stroke="#3fb8e6" strokeWidth="1.5" />
      <path className="hero-wave" d="M328 54h14l6-9 8 17 8-14 6 6h28" stroke="#8be4ff" strokeWidth="2" fill="none" filter="url(#hf-glow)" />
      <circle cx="64" cy="53" r="4" fill="#5fd0ff" className="blink" /><circle cx="82" cy="53" r="4" fill="#3b5560" />
      {[0, 1].map((d) => {
        const x = 54 + d * 208;
        return (
          <g key={d} className="hero-door">
            <rect x={x} y="98" width="204" height="450" rx="8" fill="#06222f" stroke="#86bdd2" strokeWidth="2" />
            <rect x={x + 6} y="104" width="192" height="438" rx="5" fill="url(#hf-glass)" />
            {shelves.map((y) => (
              <g key={y}><path d={`M${x + 8} ${y}h188`} stroke="#d9f4ff" strokeOpacity=".55" strokeWidth="3" />{bottles(x, y)}</g>
            ))}
            <rect x={d ? x + 4 : x + 190} y="104" width="6" height="438" fill="#e9fbff" opacity=".95" filter="url(#hf-glow)" className="led" />
            <path d={`M${x + 20} 104L${x + 120} 104L${x + 36} 542L${x + 8} 542Z`} fill="url(#hf-streak)" />
          </g>
        );
      })}
      <rect x="246" y="230" width="9" height="170" rx="4.5" fill="#cbd8de" /><rect x="265" y="230" width="9" height="170" rx="4.5" fill="#cbd8de" />
      <rect x="54" y="558" width="412" height="56" rx="6" fill="#071117" stroke="#2f4652" />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${68 + i * 18.4} 566v40`} stroke="#33505e" strokeWidth="3" />)}
      <rect x="64" y="628" width="34" height="14" rx="3" fill="#1a272e" /><rect x="422" y="628" width="34" height="14" rx="3" fill="#1a272e" />
    </svg>
  );
}

export default function Hero({ onQuote }) {
  const root = useMotion((el) => {
    const q = gsap.utils.selector(el);

    // ── Intro cinematográfica corta (≈3 s). La página es navegable desde el primer instante. ──
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(q('.hero-camera'), { scale: 1.45, rotateX: 9, yPercent: 5 }, { scale: 1, rotateX: 0, yPercent: 0, duration: 3, ease: 'power2.out' }, 0)
      .fromTo(q('.hero-lightbeam'), { opacity: 0, scaleY: 0.3 }, { opacity: 1, scaleY: 1, duration: 2, transformOrigin: '50% 0%' }, 0.2)
      .fromTo(q('.hero-fridge'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.6 }, 0.1)
      .fromTo(q('.hero-bracket'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08 }, 0.5)
      .fromTo(q('.hero-kicker'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.7)
      .fromTo(q('.hero-title .ch > span'), { yPercent: 118 }, { yPercent: 0, duration: 1.05, stagger: 0.05 }, 0.8)
      .fromTo(q('.hero-sub .mask > span'), { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 1.55)
      .fromTo(q('.hero-actions > *'), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 2)
      .fromTo(q('.hero-indicators > *'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1 }, 2.2)
      .fromTo(q('.hero-scroll'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2.5);

    // ── Cámara que sigue avanzando mientras se desplaza la página ──
    gsap.to(q('.hero-dolly'), { scale: 1.28, yPercent: -5, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(q('.hero-content'), { yPercent: -16, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: '15% top', end: 'bottom top', scrub: true } });

  }, []);

  // ── Parallax con ratón (solo punteros finos y movimiento permitido) ──
  useEffect(() => {
    if (prefersReduced() || !isFinePointer() || !root.current) return undefined;
    let ctx;
    let move;
    try {
      ctx = gsap.context(() => {
        const layers = gsap.utils.toArray(root.current.querySelectorAll('[data-depth]')).map((node) => ({
          depth: Number(node.dataset.depth),
          x: gsap.quickTo(node, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(node, 'y', { duration: 0.9, ease: 'power3.out' }),
        }));
        move = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => { l.x(-nx * l.depth); l.y(-ny * l.depth * 0.6); });
        };
        window.addEventListener('pointermove', move, { passive: true });
      }, root);
    } catch (error) { console.warn('[FRÍO & OBRA] parallax omitido:', error); }
    return () => { if (move) window.removeEventListener('pointermove', move); ctx && ctx.revert(); };
  }, [root]);

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero-camera">
        <div className="hero-dolly">
          <div className="hero-bg" />
          <div className="hero-floorgrid" aria-hidden="true" />
          <div className="hero-beam-wrap" data-depth="14"><div className="hero-lightbeam" aria-hidden="true" /></div>
          <div className="hero-fridge"><div className="hero-fridge-in" data-depth="26"><HeroFridge /><span className="hero-mist fx-heavy" aria-hidden="true" /></div></div>
          <div className="hero-dust fx-heavy" aria-hidden="true" data-depth="40" />
        </div>
      </div>
      <div className="hero-vignette" aria-hidden="true" />

      <i className="hero-bracket tl" aria-hidden="true" /><i className="hero-bracket tr" aria-hidden="true" />
      <i className="hero-bracket bl" aria-hidden="true" /><i className="hero-bracket br" aria-hidden="true" />

      <div className="container hero-content">
        <p className="hero-kicker mono"><i className="pulse-dot" /> {COMPANY.city.toUpperCase()} · SERVICIOS TÉCNICOS Y CONSTRUCCIÓN</p>
        <h1 className="hero-title" aria-label={COMPANY.name}>
          <span className="line"><Chars text="FRÍO" /></span>
          <span className="line"><Chars text="&" className="amp" /><Chars text=" OBRA" /></span>
        </h1>
        <p className="hero-sub"><Lines lines={['Refrigeración comercial, básculas', 'y construcción de espacios.']} /></p>
        <p className="hero-lead">Ingeniería y oficio para que tu negocio siga en marcha.</p>
        <div className="hero-actions">
          <Magnetic as="a" href="#servicios" className="btn-ice"><span>Ver servicios</span><ArrowDown size={19} /></Magnetic>
          <Magnetic className="btn-orange" onClick={() => onQuote('Servicio general')}><span>Solicitar cotización</span><ArrowUpRight size={19} /></Magnetic>
        </div>
      </div>

      <div className="hero-indicators mono" aria-hidden="true">
        <span><i className="bar b1" /> REFRIGERACIÓN</span>
        <span><i className="bar b2" /> BÁSCULAS</span>
        <span><i className="bar b3" /> CONSTRUCCIÓN</span>
      </div>
      <a className="hero-scroll mono" href="#servicios" aria-label="Desplazarse hacia los servicios">SCROLL <span className="scroll-line" /></a>
    </section>
  );
}
