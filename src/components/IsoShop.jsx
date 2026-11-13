import React from 'react';

/**
 * Local comercial isométrico — ILUSTRACIÓN CONCEPTUAL (no es una obra real).
 * `stage` 0..4 decide qué capas están visibles; todo el dibujo ocurre con transiciones CSS,
 * así funciona igual con scroll, con botones y con "reducir movimiento".
 */
const SX = 0.866, SY = 0.5;
const P = (x, y, z = 0) => `${(450 + (x - y) * SX).toFixed(1)} ${(540 - (x + y) * SY - z).toFixed(1)}`;
const poly = (pts) => `M${pts.map((p) => P(...p)).join('L')}Z`;
const seg = (...pts) => `M${pts.map((p) => P(...p)).join('L')}`;

const L = 300, W = 220, H = 150;

export default function IsoShop({ stage = 4, uid = 'iso', labels = true }) {
  const on = (n) => (stage >= n ? ' on' : '');
  const dr = (d, i = 0, extra = '') => <path className={`dr ${extra}`} d={d} pathLength="1" style={{ '--i': i }} />;
  const gx = [], gy = [];
  for (let v = -60; v <= 360; v += 60) gx.push(v);
  for (let v = -60; v <= 280; v += 60) gy.push(v);

  const colsX = [0, 150, 300], colsY = [0, 110, 220];
  const awning = Array.from({ length: 6 }, (_, i) => {
    const x0 = 10 + i * 46.6, x1 = x0 + 46.6;
    return <path key={i} d={poly([[x0, 0, H - 52], [x1, 0, H - 52], [x1, -42, H - 78], [x0, -42, H - 78]])} fill={i % 2 ? '#f4efe6' : '#ff7a2f'} stroke="#07090c" strokeOpacity=".35" />;
  });

  return (
    <svg className={`iso stage-${stage}`} viewBox="0 0 900 640" role="img"
      aria-label="Ilustración conceptual isométrica de un local comercial en cinco etapas de construcción">
      <defs>
        <linearGradient id={`${uid}-wallf`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b4c56" /><stop offset="1" stopColor="#1e2a31" /></linearGradient>
        <linearGradient id={`${uid}-walll`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#25343d" /><stop offset="1" stopColor="#141d23" /></linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe9fb" stopOpacity=".55" /><stop offset="1" stopColor="#3b7a96" stopOpacity=".35" /></linearGradient>
        <linearGradient id={`${uid}-lit`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe7bd" /><stop offset="1" stopColor="#ff9d4d" /></linearGradient>
        <radialGradient id={`${uid}-halo`}><stop offset="0" stopColor="#ffb15e" stopOpacity=".55" /><stop offset="1" stopColor="#ffb15e" stopOpacity="0" /></radialGradient>
      </defs>

      {/* 0 · Espacio inicial: terreno */}
      <g className="g g0 on">
        <path d={poly([[-60, -60, 0], [360, -60, 0], [360, 280, 0], [-60, 280, 0]])} fill="#10202a" stroke="#4a7d93" strokeOpacity=".6" strokeDasharray="6 7" />
        <g stroke="#5fd0ff" strokeOpacity=".16">
          {gx.map((x) => <path key={`x${x}`} d={seg([x, -60, 0], [x, 280, 0])} />)}
          {gy.map((y) => <path key={`y${y}`} d={seg([-60, y, 0], [360, y, 0])} />)}
        </g>
        {[[-60, -60], [360, -60], [360, 280], [-60, 280]].map(([x, y]) => (
          <g key={`${x}${y}`}><path d={seg([x, y, 0], [x, y, 34])} stroke="#ff7a2f" strokeWidth="3" /><path d={poly([[x, y, 34], [x, y, 24], [x + 14, y, 29]])} fill="#ff7a2f" /></g>
        ))}
      </g>

      {/* 1 · Concepto y planos */}
      <g className={`g g1${on(1)}`}>
        {dr(seg([0, 0, 0], [L, 0, 0], [L, W, 0], [0, W, 0], [0, 0, 0]), 0, 'plan')}
        {dr(seg([150, 0, 0], [150, 110, 0], [L, 110, 0]), 3, 'plan thin')}
        {dr(seg([0, 110, 0], [150, 110, 0]), 4, 'plan thin')}
        {dr(seg([0, -30, 0], [L, -30, 0]), 6, 'plan dim')}
        {dr(seg([0, -38, 0], [0, -22, 0]), 7, 'plan dim')}{dr(seg([L, -38, 0], [L, -22, 0]), 7, 'plan dim')}
        {dr(seg([-30, 0, 0], [-30, W, 0]), 8, 'plan dim')}
        {dr(seg([-38, 0, 0], [-22, 0, 0]), 9, 'plan dim')}{dr(seg([-38, W, 0], [-22, W, 0]), 9, 'plan dim')}
        {labels && <g className="fl" style={{ '--i': 10 }} fontFamily="'IBM Plex Mono',monospace" fontSize="15" fill="#8fd9f2" letterSpacing="2"><text x="610" y="470">FRENTE · A</text><text x="130" y="470" textAnchor="end">FONDO · B</text></g>}
      </g>

      {/* 2 · Desarrollo estructural */}
      <g className={`g g2${on(2)}`}>
        <path className="fl" style={{ '--i': 0 }} d={poly([[-8, -8, 0], [L + 8, -8, 0], [L + 8, W + 8, 0], [-8, W + 8, 0]])} fill="#2b3a43" stroke="#6b8795" />
        {colsX.flatMap((x, i) => colsY.map((y, j) => dr(seg([x, y, 0], [x, y, H]), 1 + i + j, 'steel'))).map((el, k) => React.cloneElement(el, { key: k }))}
        {dr(seg([0, 0, H], [L, 0, H], [L, W, H]), 7, 'steel')}
        {dr(seg([0, 0, H], [0, W, H], [L, W, H]), 8, 'steel')}
        {dr(seg([150, 0, H], [150, W, H]), 9, 'steel thin')}
        {dr(seg([0, 110, H], [L, 110, H]), 9, 'steel thin')}
        {dr(seg([0, 0, 70], [L, 0, 70]), 10, 'steel thin')}
        {colsX.flatMap((x) => colsY.map((y) => <circle key={`${x}-${y}`} className="fl" style={{ '--i': 11 }} cx={P(x, y, H).split(' ')[0]} cy={P(x, y, H).split(' ')[1]} r="4.5" fill="#ff7a2f" />))}
      </g>

      {/* 3 · Construcción y acabados */}
      <g className={`g g3${on(3)}`}>
        <path className="fl" style={{ '--i': 0 }} d={poly([[0, 0, 0], [0, W, 0], [0, W, H], [0, 0, H]])} fill={`url(#${uid}-walll)`} stroke="#6b8795" />
        <path className="fl" style={{ '--i': 1 }} d={poly([[0, 0, 0], [L, 0, 0], [L, 0, H], [0, 0, H]])} fill={`url(#${uid}-wallf)`} stroke="#8aa5b3" />
        <path className="fl" style={{ '--i': 3 }} d={poly([[28, 0, 0], [L - 28, 0, 0], [L - 28, 0, H - 52], [28, 0, H - 52]])} fill={`url(#${uid}-glass)`} stroke="#cfeaf5" strokeWidth="1.5" />
        <path className="fl" style={{ '--i': 4 }} d={seg([100, 0, 0], [100, 0, H - 52]) + seg([200, 0, 0], [200, 0, H - 52])} stroke="#cfeaf5" strokeOpacity=".7" strokeWidth="2" fill="none" />
        <path className="fl" style={{ '--i': 5 }} d={poly([[0, 60, 40], [0, 160, 40], [0, 160, 110], [0, 60, 110]])} fill={`url(#${uid}-glass)`} stroke="#cfeaf5" />
        <path className="fl" style={{ '--i': 6 }} d={poly([[-10, -10, H], [L + 10, -10, H], [L + 10, W + 10, H], [-10, W + 10, H]])} fill="#ff7a2f" fillOpacity=".92" stroke="#ffd2b0" />
        <path className="fl" style={{ '--i': 7 }} d={poly([[-10, -10, H], [L + 10, -10, H], [L + 10, -10, H - 10], [-10, -10, H - 10]])} fill="#c8541a" />
        <path className="fl" style={{ '--i': 8 }} d={seg([0, 0, 0], [L, 0, 0])} stroke="#cfd8dc" strokeWidth="3" />
      </g>

      {/* 4 · Resultado */}
      <g className={`g g4${on(4)}`}>
        <ellipse className="fl halo" style={{ '--i': 0 }} cx="450" cy="470" rx="330" ry="110" fill={`url(#${uid}-halo)`} />
        <path className="fl" style={{ '--i': 1 }} d={poly([[28, 0, 0], [L - 28, 0, 0], [L - 28, 0, H - 52], [28, 0, H - 52]])} fill={`url(#${uid}-lit)`} fillOpacity=".88" />
        <path className="fl" style={{ '--i': 2 }} d={poly([[0, 60, 40], [0, 160, 40], [0, 160, 110], [0, 60, 110]])} fill={`url(#${uid}-lit)`} fillOpacity=".85" />
        <path className="fl" style={{ '--i': 3 }} d={poly([[170, 0, 6], [262, 0, 6], [262, 0, 58], [170, 0, 58]])} fill="#a9e6ff" stroke="#e6f9ff" strokeWidth="2" />
        <path className="fl" style={{ '--i': 3 }} d={seg([170, 0, 32], [262, 0, 32])} stroke="#1e5e7c" strokeWidth="2" fill="none" />
        <g className="fl" style={{ '--i': 4 }}>{awning}</g>
        <path className="fl" style={{ '--i': 5 }} d={poly([[100, 0, H - 44], [200, 0, H - 44], [200, 0, H - 12], [100, 0, H - 12]])} fill="#0b0f12" stroke="#ff7a2f" strokeWidth="1.5" />
        <g className="fl" style={{ '--i': 6 }} transform={`matrix(0.866 -0.5 0 1 ${P(150, 0, H - 22).split(' ').join(' ')})`}>
          <text x="0" y="0" textAnchor="middle" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fontSize="13" letterSpacing="2" fill="#ffb15e">TU NEGOCIO</text>
        </g>
      </g>
    </svg>
  );
}
