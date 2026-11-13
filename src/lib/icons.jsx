import React from 'react';

/** Iconos SVG propios (sin dependencias). Trazo uniforme, heredan currentColor. */
const make = (children) =>
  function Icon({ size = 20, strokeWidth = 1.8, ...rest }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
        {children}
      </svg>
    );
  };

export const ArrowUpRight = make(<path d="M7 17 17 7M8 7h9v9" />);
export const ArrowDown = make(<path d="M12 5v14m-6-6 6 6 6-6" />);
export const ArrowLeft = make(<path d="M19 12H5m6-6-6 6 6 6" />);
export const ArrowRight = make(<path d="M5 12h14m-6-6 6 6-6 6" />);
export const Menu = make(<path d="M4 8h16M4 16h16" />);
export const Close = make(<path d="M6 6l12 12M18 6 6 18" />);
export const Check = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const Copy = make(<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></>);
export const Send = make(<path d="M21 3 10 14M21 3l-7 18-4-7-7-4Z" />);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>);
export const Phone = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />);
export const Pin = make(<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>);
export const Plus = make(<path d="M12 5v14M5 12h14" />);
export const Snowflake = make(<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5M3 10.5l3.5.9L5.6 15M21 13.5l-3.5-.9.9-3.6" />);
export const Scale = make(<><path d="M12 4v16M7 20h10M4 8h16" /><path d="M6 8 3 14a3 3 0 0 0 6 0L6 8ZM18 8l-3 6a3 3 0 0 0 6 0l-3-6Z" /></>);
export const Building = make(<><path d="M3 21h18M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6M9 11h.01M15 11h.01" /></>);
export const Fan = make(<><circle cx="12" cy="12" r="1.5" /><path d="M12 10.5C10 6 12 3 14.5 4.5S14 9 13 10.7M13.5 12c4.5-2 7.5 0 6 2.5S15 15 13.3 14M12 13.5c2 4.5 0 7.5-2.5 6S9 15 10.7 14M10.5 12C6 14 3 12 4.5 9.5S9 9 10.7 10" /></>);
export const Thermo = make(<><path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z" /><path d="M12 9v7" /></>);
export const Compressor = make(<><rect x="5" y="8" width="14" height="11" rx="5" /><path d="M9 8V5h6v3M3 13h2M19 13h2" /></>);
export const Coil = make(<path d="M4 6h16M4 12h16M4 18h16M7 4v16M12 4v16M17 4v16" />);
export const Gauge = make(<><path d="M4 16a8 8 0 1 1 16 0" /><path d="m12 16 4-5" /></>);
export const Drag = make(<path d="M5 12h14M8 8l-4 4 4 4M16 8l4 4-4 4" />);
