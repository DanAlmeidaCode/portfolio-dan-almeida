// Helpers de movimento/animação, centralizando a checagem de prefers-reduced-motion
// para que nenhum feature precise reimplementar essa lógica.

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function supportsHover() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(hover: hover)').matches;
}

/**
 * Observa elementos entrando na viewport e chama onIntersect uma única vez
 * por elemento, depois para de observá-lo (usado por reveal e count-up).
 */
export function observeOnce(elements, onIntersect, options = {}) {
  const targets = Array.isArray(elements) ? elements : [elements];

  if (typeof IntersectionObserver === 'undefined') {
    targets.forEach((target) => onIntersect(target));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersect(entry.target);
        currentObserver.unobserve(entry.target);
      }
    });
  }, options);

  targets.forEach((target) => observer.observe(target));

  return observer;
}
