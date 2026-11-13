import React, { useEffect, useRef, useState } from 'react';
import { COMPANY } from '../config';
import { NAV } from '../content';
import { ArrowUpRight, Close, Menu } from '../lib/icons';
import { Magnetic } from './ui';

export function Logo() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
        <rect x="1" y="1" width="38" height="38" rx="9" stroke="currentColor" strokeOpacity=".35" />
        <path d="M20 8v24M9 14l22 12M9 26l22-12" stroke="var(--ice)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M13 34h14" stroke="var(--orange)" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div className="read-progress" ref={ref} aria-hidden="true" />;
}

export default function Header({ onQuote, active }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Bloqueo de scroll mientras el menú está abierto + cierre con Escape.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const key = (e) => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); document.documentElement.classList.remove('menu-open'); };
  }, [open]);

  // Si se agranda la ventana, el menú móvil se cierra.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const fn = () => mq.matches && setOpen(false);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header className={`header ${solid ? 'is-solid' : ''}`}>
        <a className="brand" href="#inicio" aria-label={`${COMPANY.name}, ir al inicio`} onClick={() => setOpen(false)}>
          <Logo />
          <span className="brand-text"><strong>{COMPANY.name}</strong><small>{COMPANY.city}</small></span>
        </a>
        <nav className="nav" aria-label="Navegación principal">
          {NAV.slice(0, 5).map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} aria-current={active === l.id ? 'true' : undefined}>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
        <Magnetic className="btn-orange btn-sm header-cta" onClick={() => onQuote('Servicio general')}>
          <span>Cotizar</span><ArrowUpRight size={17} />
        </Magnetic>
        <button
          ref={toggleRef}
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div id="menu-movil" className={`menu-panel ${open ? 'is-open' : ''}`} inert={!open} aria-hidden={!open}>
        <span className="mono dim">MENÚ / NAVEGACIÓN</span>
        <nav aria-label="Navegación móvil">
          {[{ id: 'inicio', label: 'Inicio' }, ...NAV].map((l, i) => (
            <a key={l.id} href={`#${l.id}`} style={{ '--i': i }} onClick={() => setOpen(false)}>
              <small>{String(i + 1).padStart(2, '0')}</small>
              <span>{l.label}</span>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </nav>
        <button type="button" className="btn btn-orange btn-block" onClick={() => { setOpen(false); onQuote('Servicio general'); }}>
          <span>Solicitar cotización</span><ArrowUpRight size={19} />
        </button>
      </div>
    </>
  );
}
