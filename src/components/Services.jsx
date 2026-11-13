import React from 'react';
import { SERVICES } from '../content';
import { gsap, useMotion } from '../lib/motion';
import { ArrowUpRight, Snowflake, Scale, Building } from '../lib/icons';
import { Lines, SectionTag } from './ui';

const ICONS = { cold: Snowflake, scale: Scale, build: Building };

export default function Services({ onQuote }) {
  const root = useMotion((el) => {
    const q = gsap.utils.selector(el);
    gsap.utils.toArray(q('.svc-row')).forEach((row) => {
      gsap.fromTo(row.querySelector('.svc-rule'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 88%', once: true } });
      gsap.fromTo(row.querySelectorAll('.svc-title .mask > span'), { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: row, start: 'top 85%', once: true } });
    });
  }, []);

  return (
    <section className="section services" id="servicios" ref={root}>
      <div className="container">
        <SectionTag n="01">ESPECIALIDADES</SectionTag>
        <div className="section-head">
          <h2 className="h2" data-reveal-lines><Lines lines={['TRES OFICIOS.', 'UN SOLO', 'COMPROMISO.']} /></h2>
          <p className="lead" data-reveal>Cuidamos los equipos que mantienen tu negocio funcionando y construimos el espacio donde trabaja.</p>
        </div>

        <div className="svc-list">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.kind];
            return (
              <article className={`svc-row svc-${s.kind}`} key={s.id}>
                <i className="svc-rule" aria-hidden="true" />
                <span className="svc-num mono">{s.id}</span>
                <div className="svc-main">
                  <h3 className="svc-title"><Lines lines={[s.title]} /></h3>
                  <p className="svc-lead">{s.lead}</p>
                </div>
                <ul className="svc-items">
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <div className="svc-side">
                  <span className="svc-icon" aria-hidden="true"><Icon size={46} strokeWidth={1.2} /></span>
                  <button type="button" className="svc-link" onClick={() => onQuote(s.quote)}>
                    <span>Solicitar información</span><ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
