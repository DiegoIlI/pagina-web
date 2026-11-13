import React, { useCallback, useEffect, useState } from 'react';
import { COMPANY } from './config';
import { NAV } from './content';
import { gsap, ScrollTrigger, prefersReduced, scrollToId } from './lib/motion';
import { ArrowUpRight } from './lib/icons';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Cinematic from './components/Cinematic';
import Refrigeration from './components/Refrigeration';
import Construction from './components/Construction';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { Logo } from './components/Header';

function Ticker() {
  const items = ['REFRIGERACIÓN COMERCIAL', 'MANTENIMIENTO PREVENTIVO', 'BÁSCULAS', 'CONSTRUCCIÓN DE LOCALES', 'REMODELACIONES'];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{[...items, ...items, ...items].map((t, i) => <span key={i}><i />{t}</span>)}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <a className="brand" href="#inicio"><Logo /><span className="brand-text"><strong>{COMPANY.name}</strong><small>{COMPANY.tagline}</small></span></a>
          <nav aria-label="Pie de página">{NAV.map((l) => <a key={l.id} href={`#${l.id}`}>{l.label}</a>)}</nav>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} {COMPANY.name} · NOMBRE PROVISIONAL</span>
          <span>Las imágenes y secuencias son ilustrativas, no trabajos realizados.</span>
        </div>
      </div>
    </footer>
  );
}

/** Sección activa para el menú (por posición, compatible con escenas fijadas). */
function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      let cur = '';
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = id;
      });
      setActive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    calc();
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, [ids]);
  return active;
}

const NAV_IDS = NAV.map((n) => n.id);

export default function App() {
  const [service, setService] = useState('Servicio general');
  const [showFab, setShowFab] = useState(false);
  const active = useActiveSection(NAV_IDS);

  const quote = useCallback((s) => {
    if (s) setService(s);
    scrollToId('cotizar');
  }, []);

  // Enlaces internos (#id): desplazamiento controlado, compatible con secciones fijadas.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      history.replaceState(null, '', `#${id}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Revelados genéricos de secciones + refresco de ScrollTrigger cuando cargan fuentes/imágenes.
  useEffect(() => {
    let ctx;
    if (!prefersReduced()) {
      try {
        ctx = gsap.context(() => {
          gsap.utils.toArray('[data-reveal]').forEach((el) => {
            gsap.fromTo(el, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
          });
          gsap.utils.toArray('[data-reveal-lines]').forEach((el) => {
            gsap.fromTo(el.querySelectorAll('.mask > span'), { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          });
          gsap.utils.toArray('.refri .h2 .mask > span, .build .h2 .mask > span, .portfolio .h2 .mask > span, .faq .h2 .mask > span, .contact .h2 .mask > span').forEach((s) => {
            gsap.fromTo(s, { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: s.closest('.h2'), start: 'top 88%', once: true } });
          });
        });
      } catch (error) { console.warn('[FRÍO & OBRA] revelados omitidos:', error); }
    }
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh, { once: true });
    document.fonts?.ready?.then(refresh).catch(() => {});
    return () => { window.removeEventListener('load', refresh); ctx && ctx.revert(); };
  }, []);

  // El botón flotante se oculta en la primera pantalla y en la sección de contacto.
  useEffect(() => {
    const on = () => {
      const c = document.getElementById('cotizar');
      const nearContact = c ? c.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      const inView = (id) => { const e = document.getElementById(id); if (!e) return false; const r = e.getBoundingClientRect(); return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5; };
      // Se oculta donde ya hay un botón de cotizar propio (secuencias a pantalla completa).
      setShowFab(window.scrollY > window.innerHeight * 0.7 && !nearContact && !inView('obra') && !inView('experiencia'));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <a className="skip" href="#servicios">Saltar al contenido</a>
      <Header onQuote={quote} active={active} />
      <main>
        <Hero onQuote={quote} />
        <Ticker />
        <Services onQuote={quote} />
        <Cinematic onQuote={quote} />
        <Refrigeration onQuote={quote} />
        <Construction onQuote={quote} />
        <Portfolio />
        <Contact selected={service} onSelect={setService} />
      </main>
      <Footer />
      <button type="button" className={`fab ${showFab ? 'is-visible' : ''}`} onClick={() => quote('Servicio general')} aria-label="Solicitar cotización" tabIndex={showFab ? 0 : -1}>
        <span>Cotizar</span><ArrowUpRight size={18} />
      </button>
    </>
  );
}
