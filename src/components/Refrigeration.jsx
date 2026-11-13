import React, { useEffect, useRef, useState } from 'react';
import { PARTS } from '../content';
import { gsap, prefersReduced, useMotion } from '../lib/motion';
import { ArrowUpRight, Check } from '../lib/icons';
import { Lines, Magnetic, SectionTag } from './ui';

// Inclinación suave de la cámara según el componente elegido (rotateY, rotateX)
const TILT = { compresor: [-9, 3], condensador: [8, 3], evaporador: [-3, -5], ventiladores: [4, -2], controles: [10, -5] };
const HOTSPOT = { compresor: [200, 505], condensador: [365, 500], evaporador: [340, 200], ventiladores: [340, 292], controles: [480, 146] };

function Equipment({ selected, onSelect }) {
  const cls = (id) => `rp rp-${id} ${selected === id ? 'is-on' : selected ? 'is-dim' : ''}`;
  const key = (id) => (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(id); } };
  const fins = (x, y, w, h, step) => Array.from({ length: Math.floor(w / step) }, (_, i) => <path key={i} d={`M${x + 6 + i * step} ${y + 3}v${h - 6}`} className="pl" fill="none" strokeOpacity=".5" />);
  const hit = (id, children, label) => (
    <g className={cls(id)} onClick={() => onSelect(id)} onKeyDown={key(id)} role="button" tabIndex={0} aria-pressed={selected === id} aria-label={label}>
      {children}
    </g>
  );
  return (
    <svg className="refri-svg" viewBox="0 0 800 640" role="group" aria-label="Esquema ilustrativo 2.5D de un equipo de refrigeración comercial. Selecciona un componente.">
      <defs>
        <linearGradient id="rf-front" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#173644" /><stop offset="1" stopColor="#0b1a23" /></linearGradient>
        <linearGradient id="rf-side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0f2530" /><stop offset="1" stopColor="#081319" /></linearGradient>
        <linearGradient id="rf-top" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2c5266" /><stop offset="1" stopColor="#1a3647" /></linearGradient>
      </defs>
      <ellipse cx="400" cy="590" rx="320" ry="26" fill="#02070a" opacity=".7" />
      {/* carcasa 2.5D */}
      <path d="M120 130 220 80H660L560 130Z" fill="url(#rf-top)" stroke="#6fa4ba" strokeWidth="2" />
      <path d="M560 130 660 80V490L560 540Z" fill="url(#rf-side)" stroke="#6fa4ba" strokeWidth="2" />
      <path d="M120 130H560V540H120Z" fill="url(#rf-front)" stroke="#7db4ca" strokeWidth="2.5" />
      <path d="M120 460H560" stroke="#6fa4ba" strokeOpacity=".5" />
      <path d="M130 355H550M130 415H550" className="pl" strokeOpacity=".4" strokeWidth="3" />
      {[170, 230, 290, 350, 410, 470].map((x, i) => <rect key={x} x={x} y={i % 2 ? 318 : 325} width="34" height={i % 2 ? 37 : 30} rx="4" fill="#8bd3ee" opacity=".12" />)}
      {[160, 215, 270, 330, 400, 455].map((x, i) => <rect key={x} x={x} y={i % 2 ? 380 : 372} width="40" height={i % 2 ? 35 : 43} rx="4" fill="#8bd3ee" opacity=".1" />)}

      {/* Evaporador */}
      {hit('evaporador', <><rect x="150" y="172" width="380" height="56" rx="5" fill="#0c2430" className="pl" strokeWidth="2" />{fins(150, 172, 380, 56, 12)}{[190, 210].map((y) => <path key={y} d={`M158 ${y}H522`} stroke="#c98a5a" strokeOpacity=".6" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />)}</>, 'Evaporador')}

      {/* Ventiladores (evaporador y condensador) */}
      {hit('ventiladores', <>
        {[[250, 292], [430, 292]].map(([cx, cy]) => (
          <g key={cx} transform={`translate(${cx} ${cy})`}>
            <circle r="44" fill="#07202c" className="pl" strokeWidth="2" />
            <g className="rf-blades">{[0, 90, 180, 270].map((a) => <path key={a} d="M0 0C-5-22 4-40 20-38 28-26 14-8 0 0Z" transform={`rotate(${a})`} fill="#2e6e85" className="pl" strokeWidth="1" />)}</g>
            <circle r="7" fill="#0a2230" className="pl" strokeWidth="1.5" />
          </g>
        ))}
        <g transform="translate(486 500)"><circle r="22" fill="#07202c" className="pl" strokeWidth="2" /><g className="rf-blades">{[0, 120, 240].map((a) => <path key={a} d="M0 0C-3-11 2-20 10-19 14-13 7-4 0 0Z" transform={`rotate(${a})`} fill="#2e6e85" className="pl" /> )}</g></g>
      </>, 'Ventiladores')}

      {/* Compartimento de máquinas */}
      <rect x="140" y="470" width="400" height="58" rx="5" fill="#06141b" stroke="#35617a" />
      {hit('compresor', <>
        <ellipse cx="200" cy="486" rx="34" ry="10" fill="#1d4a5e" className="pl" />
        <path d="M166 486v34a34 10 0 0 0 68 0v-34" fill="#14394a" className="pl" strokeWidth="2" />
        <path d="M234 500h26v-20" className="pl" fill="none" strokeWidth="3" />
      </>, 'Compresor')}
      {hit('condensador', <>
        <rect x="290" y="480" width="150" height="40" rx="4" fill="#0c2430" className="pl" strokeWidth="2" />{fins(290, 480, 150, 40, 10)}
      </>, 'Condensador')}

      {/* Controles de temperatura */}
      {hit('controles', <>
        <rect x="414" y="136" width="130" height="24" rx="4" fill="#041117" className="pl" strokeWidth="2" />
        <path className="rf-wave" d="M422 150h14l5-8 7 14 6-10 5 4h22" fill="none" stroke="#8be4ff" strokeWidth="2" />
        <circle cx="520" cy="148" r="3" fill="#5fd0ff" /><circle cx="531" cy="148" r="3" fill="#3b5560" />
      </>, 'Controles de temperatura')}

      {/* Puntos de interés */}
      {PARTS.map((p) => {
        const [x, y] = HOTSPOT[p.id];
        return (
          <g key={p.id} className={`hs ${selected === p.id ? 'is-on' : ''}`} transform={`translate(${x} ${y})`} onClick={() => onSelect(p.id)} aria-hidden="true">
            <circle className="hs-ring" r="16" /><circle className="hs-dot" r="11" /><text y="4" textAnchor="middle">{p.n.slice(1)}</text>
          </g>
        );
      })}
      <text x="130" y="612" fontFamily="'IBM Plex Mono',monospace" fontSize="14" letterSpacing="2" fill="#6fa4ba">ESQUEMA ILUSTRATIVO · LOS EQUIPOS REALES VARÍAN</text>
    </svg>
  );
}

export default function Refrigeration({ onQuote }) {
  const [selected, setSelected] = useState('compresor');
  const part = PARTS.find((p) => p.id === selected);
  const stage = useRef(null);
  const panel = useRef(null);

  const root = useMotion((el) => {
    const q = gsap.utils.selector(el);
    gsap.fromTo(q('.refri-art'), { opacity: 0, scale: 0.9, rotateY: -14 }, { opacity: 1, scale: 1, rotateY: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%', once: true } });
    gsap.to(q('.refri-orbit.a'), { rotation: 360, duration: 60, repeat: -1, ease: 'none' });
    gsap.to(q('.refri-orbit.b'), { rotation: -360, duration: 90, repeat: -1, ease: 'none' });
  }, []);

  // Transición suave al cambiar de componente: inclinación de cámara + revelado del panel.
  useEffect(() => {
    if (prefersReduced() || !stage.current || !panel.current) return undefined;
    let ctx;
    try {
      const [ry, rx] = TILT[selected] || [0, 0];
      gsap.to(stage.current, { rotateY: ry, rotateX: rx, duration: 1.1, ease: 'power3.out', overwrite: 'auto' });
      ctx = gsap.context(() => {
        gsap.fromTo(panel.current.querySelectorAll('[data-anim]'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out' });
      }, panel);
    } catch (error) { console.warn('[FRÍO & OBRA] transición omitida:', error); }
    return () => ctx && ctx.revert();
  }, [selected]);

  return (
    <section className="section refri" id="equipo" ref={root}>
      <div className="container">
        <SectionTag n="03">LABORATORIO TÉCNICO · REFRIGERACIÓN</SectionTag>
        <div className="section-head">
          <h2 className="h2"><Lines lines={['CADA COMPONENTE', 'IMPORTA.']} /></h2>
          <p className="lead" data-reveal>Explora un equipo comercial de forma ilustrativa. Es una guía para entender el sistema, no un diagnóstico: cada equipo requiere una revisión técnica.</p>
        </div>

        <div className="refri-grid">
          <div className="refri-art">
            <span className="refri-orbit a" aria-hidden="true" /><span className="refri-orbit b" aria-hidden="true" />
            <div className="refri-stage" ref={stage}><Equipment selected={selected} onSelect={setSelected} /></div>
          </div>

          <div className="refri-side">
            <div className="refri-list" role="group" aria-label="Componentes del equipo">
              {PARTS.map((p) => (
                <button key={p.id} type="button" aria-pressed={selected === p.id} aria-controls="refri-panel"
                  className={`refri-tab ${selected === p.id ? 'is-on' : ''}`} onClick={() => setSelected(p.id)}>
                  <span className="mono">{p.n}</span><span>{p.name}</span>
                </button>
              ))}
            </div>

            <div className="refri-panel" id="refri-panel" ref={panel} aria-live="polite">
              <p className="mono eyebrow-c" data-anim>COMPONENTE {part.n} / 05</p>
              <h3 className="refri-name" data-anim>{part.name}</h3>
              <p className="refri-role" data-anim>{part.role}</p>
              <p className="refri-desc" data-anim>{part.desc}</p>
              <ul className="refri-checks" data-anim>
                {part.checks.map((c) => <li key={c}><Check size={16} /> {c}</li>)}
              </ul>
              <p className="note" data-anim>En una revisión se observa el estado general del componente. No se asumen fallas sin inspeccionar el equipo.</p>
              <Magnetic className="btn-orange btn-block" onClick={() => onQuote(`Revisión de refrigeración · ${part.name}`)}>
                <span>Solicitar revisión</span><ArrowUpRight size={19} />
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
