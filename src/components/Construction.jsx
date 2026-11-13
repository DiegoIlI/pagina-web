import React, { useCallback, useRef, useState } from 'react';
import { BUILD_STAGES } from '../content';
import { gsap, ScrollTrigger, useMotion, prefersReduced } from '../lib/motion';
import { ArrowUpRight } from '../lib/icons';
import IsoShop from './IsoShop';
import { Lines, Magnetic, SectionTag } from './ui';

/**
 * "Así nace un espacio": 5 etapas.
 * Con movimiento: la sección es alta y su contenido queda `sticky`; el scroll avanza la etapa.
 * Sin movimiento (o si falla GSAP): las mismas etapas se controlan con los botones.
 */
export default function Construction({ onQuote }) {
  const [stage, setStage] = useState(0);
  const st = useRef(null);
  const ref = useRef(null);

  const scope = useMotion((el) => {
    st.current = ScrollTrigger.create({
      trigger: el.querySelector('.build-track'),
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const s = Math.min(BUILD_STAGES.length - 1, Math.floor(self.progress * BUILD_STAGES.length));
        setStage((prev) => (prev === s ? prev : s));
      },
    });
    // Cámara: el volumen se acerca suavemente durante toda la secuencia
    gsap.fromTo(el.querySelector('.iso-cam'), { scale: 0.92, rotateZ: -1.5 }, {
      scale: 1.04, rotateZ: 1.5, ease: 'none',
      scrollTrigger: { trigger: el.querySelector('.build-track'), start: 'top top', end: 'bottom bottom', scrub: 0.6 },
    });
    el.classList.add('is-scroll-driven');
  }, []);

  const go = useCallback((i) => {
    setStage(i);
    const trigger = st.current;
    if (trigger && !prefersReduced()) {
      const top = trigger.start + (trigger.end - trigger.start) * ((i + 0.5) / BUILD_STAGES.length);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const cur = BUILD_STAGES[stage];
  const assign = (node) => { scope.current = node; ref.current = node; };

  return (
    <section className="build" id="obra" ref={assign}>
      <div className="build-track">
        <div className="build-sticky">
          <div className="container build-inner">
            <div className="build-copy">
              <SectionTag n="04">ARQUITECTURA EN MOVIMIENTO</SectionTag>
              <h2 className="h2"><Lines lines={['ASÍ NACE', 'UN ESPACIO.']} /></h2>
              <p className="demo-badge mono">DEMOSTRACIÓN CONCEPTUAL · NO ES UNA OBRA REALIZADA</p>

              <div className="build-stagecopy" aria-live="polite">
                <p className="mono eyebrow-c warm">ETAPA {cur.n} / 05 — {cur.tag}</p>
                <h3 key={cur.n} className="build-title">{cur.title}</h3>
                <p key={`${cur.n}t`} className="build-text">{cur.text}</p>
              </div>

              <ol className="build-steps" aria-label="Etapas">
                {BUILD_STAGES.map((b, i) => (
                  <li key={b.n}>
                    <button type="button" className={`bstep ${i === stage ? 'is-on' : ''} ${i < stage ? 'is-done' : ''}`} aria-current={i === stage ? 'step' : undefined} aria-label={`Etapa ${b.n}: ${b.tag}`} onClick={() => go(i)}>
                      <span className="mono">{b.n}</span><i />
                    </button>
                  </li>
                ))}
              </ol>

              <Magnetic className="btn-orange build-cta" onClick={() => onQuote('Construcción o remodelación')}>
                <span>Cotizar mi proyecto</span><ArrowUpRight size={19} />
              </Magnetic>
            </div>

            <div className="build-visual">
              <div className="blueprint-grid" aria-hidden="true" />
              <div className="iso-cam"><IsoShop stage={stage} uid="bld" /></div>
              <span className="build-tag mono">VISTA ISOMÉTRICA · CONCEPTO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
