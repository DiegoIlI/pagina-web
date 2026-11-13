import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/base.css';
import './styles/sections.css';
import './styles/cinematic.css';

/** Si algo falla en tiempo de ejecución, el visitante ve un mensaje útil, NUNCA una pantalla blanca. */
class Boundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.error('[FRÍO & OBRA]', error); document.documentElement.classList.remove('motion'); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="fatal">
        <h1>FRÍO &amp; OBRA</h1>
        <p>Refrigeración comercial · Básculas · Construcción</p>
        <p>No pudimos cargar la experiencia visual. Recarga la página o inténtalo de nuevo en unos minutos.</p>
        <button type="button" onClick={() => window.location.reload()}>Recargar</button>
      </div>
    );
  }
}

// Mejora progresiva: las animaciones solo se activan si el usuario no pidió "reducir movimiento".
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');
if (!reduce) document.documentElement.classList.add('motion');

createRoot(document.getElementById('root')).render(<Boundary><App /></Boundary>);
