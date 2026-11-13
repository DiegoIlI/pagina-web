import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Evita que la barra de direcciones de iOS/Android dispare recálculos de las escenas fijadas.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const isCompact = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 899px)').matches;

/**
 * Hook de animación con limpieza automática (gsap.context + revert).
 * - No hace nada si el usuario pidió "reducir movimiento".
 * - Si una animación lanza un error, se registra y la página sigue funcionando
 *   (el contenido siempre existe en el DOM; GSAP solo lo anima).
 */
export function useMotion(setup, deps = []) {
  const scope = useRef(null);
  useLayoutEffect(() => {
    if (!scope.current || prefersReduced()) return undefined;
    let ctx;
    try {
      ctx = gsap.context(() => setup(scope.current), scope);
    } catch (error) {
      console.warn('[FRÍO & OBRA] animación omitida:', error);
    }
    return () => ctx && ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}

/** Desplazamiento a una sección compensando el encabezado fijo. */
export function scrollToId(id, behavior) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = id === 'inicio' ? 0 : 0;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: behavior || (prefersReduced() ? 'auto' : 'smooth') });
}
