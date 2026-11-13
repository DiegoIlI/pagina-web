import React from 'react';

/* Escenas ilustrativas vectoriales para la transición Refrigeración → Construcción.
   Todas usan viewBox 1600×900 con "slice": el centro (800,450) siempre queda visible,
   también en pantallas verticales de teléfono. */

const BLADE = 'M0 0C46-44 150-250 70-310C26-322-22-210 0 0Z';

export function ColdScene() {
  const spokes = Array.from({ length: 28 }, (_, i) => i * (360 / 28));
  return (
    <svg className="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="cs-bg" cx="50%" cy="50%" r="75%"><stop offset="0" stopColor="#14425c" /><stop offset=".55" stopColor="#0a1f2c" /><stop offset="1" stopColor="#040a0f" /></radialGradient>
        <pattern id="cs-fins" width="16" height="44" patternUnits="userSpaceOnUse"><path d="M8 0v44" stroke="#8fd3ee" strokeOpacity=".22" strokeWidth="2" /><circle cx="8" cy="22" r="5.5" fill="none" stroke="#c98a5a" strokeOpacity=".6" strokeWidth="2" /></pattern>
        <radialGradient id="cs-hub" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#e9fbff" /><stop offset=".4" stopColor="#7fdcff" /><stop offset="1" stopColor="#0a2a3a" /></radialGradient>
        <radialGradient id="cs-vig" cx="50%" cy="50%" r="70%"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".82" /></radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#cs-bg)" />
      <rect width="1600" height="900" fill="url(#cs-fins)" />
      <rect width="1600" height="900" fill="url(#cs-vig)" />
      <g className="a-fan">
        <rect x="430" y="80" width="740" height="740" rx="70" fill="#07161f" stroke="#3f88a6" strokeWidth="3" />
        {[[470, 120], [1130, 120], [470, 780], [1130, 780]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="9" fill="#0d2a38" stroke="#6fb7d3" strokeWidth="2" />)}
        {[340, 280, 220, 160].map((r) => <circle key={r} cx="800" cy="450" r={r} fill="none" stroke="#7fcbe6" strokeOpacity=".32" strokeWidth="3" />)}
        <g className="a-blades">
          {[0, 72, 144, 216, 288].map((a) => <path key={a} d={BLADE} transform={`translate(800 450) rotate(${a})`} fill="#1d5d78" stroke="#8be4ff" strokeOpacity=".7" strokeWidth="2" />)}
        </g>
        <g className="a-guard" stroke="#a9dff3" strokeOpacity=".35" strokeWidth="2">
          {spokes.map((a) => <path key={a} d="M0 64V340" transform={`translate(800 450) rotate(${a})`} />)}
        </g>
        <circle cx="800" cy="450" r="62" fill="url(#cs-hub)" className="a-hub" />
        <circle cx="800" cy="450" r="62" fill="none" stroke="#d9f6ff" strokeWidth="3" />
      </g>
      <g className="fx-heavy" fill="#e9fbff">
        {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={(i * 211) % 1600} cy={(i * 137) % 900} r={1.5 + (i % 3)} opacity={0.12 + (i % 4) * 0.08} />)}
      </g>
      <g className="a-callouts" fontFamily="'IBM Plex Mono',monospace" fontSize="17" fill="#9fdcf2" letterSpacing="2">
        <path d="M430 160H250l-60-40" stroke="#5fd0ff" strokeOpacity=".6" fill="none" /><text x="60" y="112">EVAPORADOR</text>
        <path d="M1170 700h180l50 50" stroke="#5fd0ff" strokeOpacity=".6" fill="none" /><text x="1260" y="780">VENTILADOR AXIAL</text>
        <path d="M430 420H300" stroke="#5fd0ff" strokeOpacity=".6" fill="none" /><text x="60" y="425">TUBERÍA DE COBRE</text>
      </g>
    </svg>
  );
}

const D = (d, i = 0, cls = 'draw') => <path className={cls} d={d} pathLength="1" style={{ '--i': i }} key={d + i} />;

export function BuildScene() {
  // Estructura en perspectiva de un punto (punto de fuga en 800,350)
  const front = { x1: 340, x2: 1260, y1: 250, y2: 790, mx: [340, 647, 953, 1260], my: 520 };
  const bx1 = 610, bx2 = 990, by1 = 340, by2 = 560;
  return (
    <svg className="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="bs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1b1417" /><stop offset=".55" stopColor="#7a3a1f" /><stop offset=".78" stopColor="#ff9a4d" /><stop offset="1" stopColor="#ffd08a" /></linearGradient>
        <linearGradient id="bs-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2a22" /><stop offset="1" stopColor="#120c0a" /></linearGradient>
        <radialGradient id="bs-sun" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fff2c8" stopOpacity=".95" /><stop offset="1" stopColor="#ffb15e" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bs-sky)" />
      <circle cx="800" cy="610" r="320" fill="url(#bs-sun)" className="fx-heavy" />
      <rect y="760" width="1600" height="140" fill="url(#bs-ground)" />
      <path d="M0 760H1600" stroke="#ffcf94" strokeOpacity=".4" />
      <g className="bs-lines" fill="none" stroke="#ffd7a6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {/* losa */}
        {D(`M300 790H1300L1360 840H240Z`, 0)}
        {/* columnas frontales */}
        {front.mx.map((x, i) => D(`M${x} ${front.y2}V${front.y1}`, 1 + i))}
        {/* vigas frontales */}
        {D(`M${front.x1} ${front.y1}H${front.x2}`, 5)}
        {D(`M${front.x1} ${front.my}H${front.x2}`, 6)}
        {/* arriostres en X */}
        {D(`M${front.mx[0]} ${front.y1}L${front.mx[1]} ${front.my}M${front.mx[1]} ${front.y1}L${front.mx[0]} ${front.my}`, 7, 'draw thin')}
        {D(`M${front.mx[2]} ${front.y1}L${front.mx[3]} ${front.my}M${front.mx[3]} ${front.y1}L${front.mx[2]} ${front.my}`, 8, 'draw thin')}
        {/* fondo en perspectiva */}
        {D(`M${front.x1} ${front.y1}L${bx1} ${by1}M${front.x2} ${front.y1}L${bx2} ${by1}M${front.x1} ${front.y2}L${bx1} ${by2}M${front.x2} ${front.y2}L${bx2} ${by2}`, 9)}
        {D(`M${bx1} ${by1}H${bx2}V${by2}H${bx1}Z`, 10)}
        {D(`M${front.x1} ${front.my}L${bx1} 450M${front.x2} ${front.my}L${bx2} 450`, 11, 'draw thin')}
        {/* cubierta */}
        {D(`M${front.x1 - 40} ${front.y1}L800 150L${front.x2 + 40} ${front.y1}`, 12, 'draw accent')}
        {D(`M${front.mx[1]} ${front.y1}L800 150L${front.mx[2]} ${front.y1}M${front.mx[0]} ${front.y1}L${front.mx[1]} 198M${front.mx[3]} ${front.y1}L${front.mx[2]} 198`, 13, 'draw thin accent')}
        {/* andamio izquierdo */}
        {D('M130 790V420M230 790V420M130 420H230M130 520H230M130 620H230M130 720H230M130 520L230 620M230 520L130 620', 14, 'draw thin')}
        {/* grúa */}
        {D('M1430 790V90M1490 790V90M1430 790L1490 700L1430 610L1490 520L1430 430L1490 340L1430 250L1490 160L1430 90', 15, 'draw thin')}
        {D('M1080 90H1580M1430 90L1230 40L1080 90M1290 90V130M1290 130H1315', 16, 'draw accent')}
        {D('M1170 90V300M1150 300H1190', 17, 'draw thin accent')}
      </g>
      <g fontFamily="'IBM Plex Mono',monospace" fontSize="17" fill="#ffe3bf" letterSpacing="2" opacity=".85">
        <text x="140" y="395">ANDAMIO</text><text x="1300" y="75">GRÚA</text><text x="620" y="320">ESTRUCTURA</text>
      </g>
    </svg>
  );
}

export function FinishedScene() {
  return (
    <svg className="scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="fs-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a1410" /><stop offset="1" stopColor="#0a0807" /></linearGradient>
        <linearGradient id="fs-glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe7bd" /><stop offset=".6" stopColor="#ffb766" /><stop offset="1" stopColor="#c8651f" /></linearGradient>
        <linearGradient id="fs-cool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6f9ff" /><stop offset="1" stopColor="#3aa6d6" /></linearGradient>
        <radialGradient id="fs-halo" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#ffb15e" stopOpacity=".55" /><stop offset="1" stopColor="#ffb15e" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#fs-bg)" />
      <ellipse cx="800" cy="760" rx="760" ry="130" fill="url(#fs-halo)" className="d-glow fx-heavy" />
      <rect y="760" width="1600" height="140" fill="#0f0c0a" />
      <path d="M0 760H1600" stroke="#ffb15e" strokeOpacity=".35" />
      {/* fachada */}
      <rect x="270" y="250" width="1060" height="510" fill="#2a211c" stroke="#5a4637" strokeWidth="3" />
      <rect x="270" y="250" width="1060" height="70" fill="#1a1411" />
      <rect x="560" y="262" width="480" height="46" rx="6" fill="#0d0a08" stroke="#ff7a2f" strokeWidth="2" />
      <text x="800" y="296" textAnchor="middle" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fontSize="34" letterSpacing="8" fill="#ffb15e">TU NEGOCIO AQUÍ</text>
      {/* toldo */}
      {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${290 + i * 102} 330h102l-14 52h-102Z`} fill={i % 2 ? '#f4efe6' : '#ff7a2f'} />)}
      {/* vitrinas iluminadas */}
      <rect x="310" y="400" width="440" height="320" fill="url(#fs-glow)" className="d-lit" />
      <rect x="850" y="400" width="440" height="320" fill="url(#fs-glow)" className="d-lit" />
      {/* interior: estantes, mostrador y vitrina refrigerada */}
      <g stroke="#7a3f12" strokeWidth="4" opacity=".7"><path d="M330 480H730M330 560H730M330 640H730" /></g>
      <rect x="870" y="560" width="400" height="130" rx="8" fill="#0d2a38" stroke="#7fdcff" strokeWidth="3" />
      <rect x="880" y="570" width="380" height="82" rx="5" fill="url(#fs-cool)" opacity=".92" />
      <path d="M880 611H1260" stroke="#0d2a38" strokeWidth="3" />
      <rect x="870" y="690" width="400" height="30" fill="#3a2a20" />
      {[470, 640, 1000, 1150].map((x) => <g key={x}><path d={`M${x} 400v70`} stroke="#3a2a20" strokeWidth="3" /><circle cx={x} cy="482" r="16" fill="#fff4d6" /><circle cx={x} cy="482" r="46" fill="url(#fs-halo)" className="fx-heavy" /></g>)}
      {/* puerta */}
      <rect x="755" y="420" width="90" height="340" fill="#1a1411" stroke="#5a4637" strokeWidth="3" />
      <rect x="767" y="432" width="66" height="320" fill="url(#fs-glow)" opacity=".9" />
      <rect x="820" y="580" width="5" height="70" fill="#1a1411" />
      <path d="M310 400V720M750 400V720M850 400V720M1290 400V720M310 560H750M850 560H1290" stroke="#1a1411" strokeWidth="6" fill="none" opacity=".55" />
      {/* banqueta y reflejos */}
      <path d="M200 790H1400" stroke="#ffb15e" strokeOpacity=".3" strokeWidth="3" />
      <rect x="310" y="770" width="980" height="6" fill="#ffb15e" opacity=".25" />
      <text x="1330" y="860" textAnchor="end" fontFamily="'IBM Plex Mono',monospace" fontSize="17" letterSpacing="3" fill="#ffd9a8">ILUSTRACIÓN CONCEPTUAL — NO ES UNA OBRA REALIZADA</text>
    </svg>
  );
}
