import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SCENES } from '../content';
import { ArrowLeft, ArrowRight, Drag, Snowflake, Building } from '../lib/icons';
import IsoShop from './IsoShop';
import { Lines, Photo, SectionTag } from './ui';

/** Galería horizontal con scroll nativo (táctil perfecto), parallax por CSS y arrastre con ratón. */
function Strip() {
  const strip = useRef(null);
  const [idx, setIdx] = useState(0);
  const [prog, setProg] = useState(0);

  const update = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 0 ? el.scrollLeft / max : 0);
    const cards = [...el.children];
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0, bd = Infinity;
    cards.forEach((c, i) => {
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bd) { bd = d; best = i; }
      // parallax: desplazamiento relativo al centro, en [-1, 1]
      c.style.setProperty('--p', Math.max(-1, Math.min(1, (cc - center) / el.clientWidth)).toFixed(3));
    });
    setIdx(best);
  }, []);

  useEffect(() => {
    const el = strip.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    // Arrastre con ratón (en táctil se usa el scroll nativo)
    let down = false, sx = 0, sl = 0, moved = false;
    const pd = (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; };
    const pm = (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) { moved = true; el.classList.add('is-drag'); } el.scrollLeft = sl - dx; };
    const pu = () => { down = false; el.classList.remove('is-drag'); };
    const click = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    el.addEventListener('pointerdown', pd); window.addEventListener('pointermove', pm); window.addEventListener('pointerup', pu); el.addEventListener('click', click, true);
    return () => {
      el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll);
      el.removeEventListener('pointerdown', pd); window.removeEventListener('pointermove', pm); window.removeEventListener('pointerup', pu); el.removeEventListener('click', click, true);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [update]);

  const goTo = (i) => {
    const el = strip.current;
    const c = el?.children[Math.max(0, Math.min(SCENES.length - 1, i))];
    if (c) el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <div className="strip-wrap">
      <div className="strip" ref={strip} tabIndex={0} role="region" aria-label="Galería horizontal de escenarios ilustrativos. Usa las flechas del teclado o desliza.">
        {SCENES.map((s, i) => (
          <article className={`pcard tone-${s.tone} ${i === idx ? 'is-current' : ''}`} key={s.n}>
            <div className="pcard-media">
              <div className="pcard-art" aria-hidden="true">{s.tone === 'cold' ? <Snowflake size={120} strokeWidth={0.6} /> : <Building size={120} strokeWidth={0.6} />}</div>
              <Photo src={s.photo} alt={`Fotografía ilustrativa: ${s.title}`} className="pcard-img" sizes="(max-width: 900px) 86vw, 62vw" />
              <div className="pcard-shade" />
            </div>
            <span className="pcard-n mono">{s.n} / {String(SCENES.length).padStart(2, '0')}</span>
            <div className="pcard-info">
              <span className="mono eyebrow-c">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="strip-ui">
        <span className="mono strip-count">{String(idx + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}</span>
        <div className="strip-bar" aria-hidden="true"><i style={{ transform: `scaleX(${0.12 + prog * 0.88})` }} /></div>
        <span className="mono strip-hint"><Drag size={16} /> DESLIZA</span>
        <div className="strip-btns">
          <button type="button" aria-label="Escenario anterior" onClick={() => goTo(idx - 1)} disabled={idx === 0}><ArrowLeft size={20} /></button>
          <button type="button" aria-label="Escenario siguiente" onClick={() => goTo(idx + 1)} disabled={idx === SCENES.length - 1}><ArrowRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}

/** Comparador táctil: plano conceptual ↔ ilustración terminada (NO es un antes/después real). */
function Compare() {
  const [v, setV] = useState(55);
  return (
    <div className="compare" style={{ '--split': `${v}%` }}>
      <div className="compare-layer compare-wire"><IsoShop stage={2} uid="cmpa" labels={false} /></div>
      <div className="compare-layer compare-final"><IsoShop stage={4} uid="cmpb" labels={false} /></div>
      <span className="compare-divider" aria-hidden="true" />
      <span className="compare-handle" aria-hidden="true"><Drag size={20} /></span>
      <span className="compare-chip a mono">ESTRUCTURA</span><span className="compare-chip b mono">RESULTADO</span>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(Number(e.target.value))} aria-label="Comparar estructura y resultado ilustrativos" />
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="section portfolio" id="portafolio">
      <div className="container">
        <SectionTag n="05">PORTAFOLIO · ESCENARIOS DE APLICACIÓN</SectionTag>
        <div className="section-head">
          <h2 className="h2"><Lines lines={['ESPACIOS DONDE', 'PODEMOS APORTAR.']} /></h2>
          <p className="lead" data-reveal>Aún no publicamos proyectos ejecutados. Estas imágenes son ilustrativas y muestran el tipo de espacios y equipos que atendemos; se sustituirán por trabajos reales y autorizados.</p>
        </div>
      </div>
      <Strip />
      <div className="container compare-block">
        <div className="compare-copy">
          <p className="mono eyebrow-c warm">COMPARADOR CONCEPTUAL</p>
          <h3 className="h3">De la estructura al resultado.</h3>
          <p className="lead-sm">Desliza el control para pasar de la estructura al local terminado. Es una ilustración del proceso, no el antes y después de una obra real.</p>
        </div>
        <Compare />
      </div>
    </section>
  );
}
