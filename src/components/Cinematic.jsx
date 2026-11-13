import React, { useRef } from 'react';
import { gsap, useMotion, isCompact } from '../lib/motion';
import { ArrowUpRight } from '../lib/icons';
import { ColdScene, BuildScene, FinishedScene } from './CinematicScenes';
import { Lines, Magnetic } from './ui';

const LABELS = ['REFRIGERACIÓN', 'TRANSICIÓN', 'CONSTRUCCIÓN', 'RESULTADO'];
// Tiempos de la línea de tiempo (unidades relativas, total = 4.6)
const TOTAL = 4.6;
const sceneAt = (p) => { const t = p * TOTAL; return t < 1.2 ? 0 : t < 2.1 ? 1 : t < 3.3 ? 2 : 3; };

/**
 * REFRIGERACIÓN → CONSTRUCCIÓN
 * Escena fijada (pin) con scrub. Base CSS = 4 paneles apilados (sin JS / movimiento reducido).
 * Con movimiento activo (html.motion) se convierte en una secuencia continua de cámara.
 */
export default function Cinematic({ onQuote }) {
  const counter = useRef(null);

  const root = useMotion((el) => {
    const q = gsap.utils.selector(el);
    const compact = isCompact();
    const rail = q('.cine-rail-fill')[0];
    const stateEl = el;
    let last = -1;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (compact ? 3.6 : 5.2))}`,
        scrub: compact ? 0.4 : 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (rail) rail.style.transform = `scaleX(${self.progress})`;
          const s = sceneAt(self.progress);
          if (s !== last) {
            last = s;
            stateEl.dataset.scene = String(s);
            if (counter.current) counter.current.textContent = `0${s + 1} / 04 — ${LABELS[s]}`;
          }
        },
      },
    });

    // ── ESCENA A · refrigeración: la cámara avanza hacia el ventilador ──
    tl.fromTo(q('.a-inner'), { scale: 1, transformOrigin: '50% 50%' }, { scale: compact ? 3.6 : 5, duration: 1.9, ease: 'power1.in' }, 0)
      .fromTo(q('.a-blades'), { rotation: 0, svgOrigin: '800 450' }, { rotation: 300, svgOrigin: '800 450', duration: 1.9 }, 0)
      .fromTo(q('.a-callouts'), { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0.5)
      .to(q('.ct-a .mask > span'), { yPercent: -115, duration: 0.25, stagger: 0.03, ease: 'power3.in' }, 0.95)

      // ── ESCENA B · transición: se atraviesa el ventilador y el azul se vuelve cálido ──
      .fromTo(q('.flash'), { opacity: 0 }, { opacity: 0.85, duration: 0.45 }, 1.15)
      .to(q('.flash'), { opacity: 0, duration: 0.7 }, 1.6)
      .fromTo(q('.scene-c'), { clipPath: 'circle(0vmax at 50% 50%)' }, { clipPath: 'circle(110vmax at 50% 50%)', duration: 1.1, ease: 'power2.inOut' }, 1.2)
      .fromTo(q('.portal-ring'), { scale: 0.001, opacity: 1 }, { scale: 1, opacity: 0, duration: 1.1, ease: 'power2.inOut' }, 1.2)
      .fromTo(q('.grade-cold'), { opacity: 0.55 }, { opacity: 0, duration: 1.3 }, 1.2)
      .fromTo(q('.grade-warm'), { opacity: 0 }, { opacity: 0.5, duration: 1.1 }, 1.4)
      .to(q('.grade-warm'), { opacity: 0.12, duration: 1.4 }, 2.6)
      .fromTo(q('.streaks'), { opacity: 0, xPercent: -20 }, { opacity: 1, xPercent: 20, duration: 0.9 }, 1.3)
      .to(q('.streaks'), { opacity: 0, duration: 0.4 }, 2.2)
      .fromTo(q('.ct-b .mask > span'), { yPercent: 115 }, { yPercent: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, 1.3)
      .to(q('.ct-b .mask > span'), { yPercent: -115, duration: 0.25, stagger: 0.04, ease: 'power3.in' }, 1.95)

      // ── ESCENA C · construcción: se dibuja la estructura y cambia la perspectiva ──
      .fromTo(q('.c-inner'), { rotateY: -18, scale: 1.18, transformOrigin: '50% 60%' }, { rotateY: 10, scale: 1, duration: 2.1, ease: 'power1.out' }, 1.35)
      .fromTo(q('.bs-lines .draw'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, stagger: 0.09, ease: 'power1.inOut' }, 1.75)
      .fromTo(q('.ct-c .mask > span'), { yPercent: 115 }, { yPercent: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, 2.15)
      .to(q('.ct-c .mask > span'), { yPercent: -115, duration: 0.25, stagger: 0.04, ease: 'power3.in' }, 3.05)

      // ── ESCENA D · resultado: se revela el espacio terminado ──
      .fromTo(q('.scene-d'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power2.inOut' }, 3.0)
      .fromTo(q('.d-inner'), { scale: 1.22 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, 3.0)
      .fromTo(q('.d-glow, .d-lit'), { opacity: 0.15 }, { opacity: 1, duration: 0.8 }, 3.5)
      .fromTo(q('.ct-d .mask > span'), { yPercent: 115 }, { yPercent: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, 3.55)
      .fromTo(q('.ct-d .cta-wrap'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 4.0)
      .to({}, { duration: TOTAL - 4.35 }, 4.35); // pausa final: tiempo para leer y pulsar el botón

  }, []);

  return (
    <section className="cine" id="experiencia" ref={root} data-scene="0" aria-label="Secuencia visual: de la refrigeración a la construcción">
      <div className="cine-stage">
        {/* A — Refrigeración */}
        <div className="cine-scene scene-a">
          <div className="a-inner"><ColdScene /></div>
          <div className="ct ct-a">
            <p className="mono eyebrow-c">ESCENA 01 — REFRIGERACIÓN</p>
            <h2 className="h2 cine-h"><Lines lines={['PRECISIÓN', 'EN CADA GRADO.']} /></h2>
            <p className="cine-p">Sistemas de refrigeración comercial e industrial, revisados con detalle.</p>
          </div>
        </div>

        {/* C — Construcción (se revela con un portal circular) */}
        <div className="cine-scene scene-c">
          <div className="c-inner"><BuildScene /></div>
          <div className="ct ct-c">
            <p className="mono eyebrow-c warm">ESCENA 03 — CONSTRUCCIÓN</p>
            <h2 className="h2 cine-h"><Lines lines={['ESTRUCTURA', 'QUE SOSTIENE', 'TU NEGOCIO.']} /></h2>
            <p className="cine-p">Locales, remodelaciones y obras con acabados, coordinados de principio a fin.</p>
          </div>
        </div>

        {/* D — Resultado */}
        <div className="cine-scene scene-d">
          <div className="d-inner"><FinishedScene /></div>
          <div className="ct ct-d">
            <p className="mono eyebrow-c warm">ESCENA 04 — RESULTADO</p>
            <h2 className="h2 cine-h"><Lines lines={['TU ESPACIO,', 'LISTO PARA', 'OPERAR.']} /></h2>
            <p className="cine-p">Cuéntanos qué necesita tu negocio y preparamos el siguiente paso.</p>
            <div className="cta-wrap">
              <Magnetic className="btn-orange" onClick={() => onQuote('Construcción o remodelación')}><span>Cotizar mi proyecto</span><ArrowUpRight size={19} /></Magnetic>
            </div>
          </div>
        </div>

        {/* B — Transición: texto y efectos de luz */}
        <div className="cine-fx" aria-hidden="true">
          <div className="grade grade-cold" /><div className="grade grade-warm" />
          <div className="portal-ring" />
          <div className="streaks fx-heavy" />
          <div className="flash" />
        </div>
        <div className="ct ct-b">
          <p className="mono eyebrow-c">ESCENA 02 — TRANSICIÓN</p>
          <h2 className="h2 cine-h"><Lines lines={['DEL FRÍO', 'A LA OBRA.']} /></h2>
        </div>

        {/* Interfaz de la secuencia */}
        <div className="cine-ui">
          <span className="mono cine-counter" ref={counter} aria-hidden="true">01 / 04 — REFRIGERACIÓN</span>
          <div className="cine-rail" aria-hidden="true"><i className="cine-rail-fill" /></div>
          <span className="mono cine-hint" aria-hidden="true">DESLIZA PARA AVANZAR</span>
        </div>
      </div>
    </section>
  );
}
