// Anima elementos com a classe .reveal para opacity/transform quando entram
// na viewport. Só transforma e opacidade, nunca layout (largura/altura).

import { observeOnce, prefersReducedMotion } from '../utils/motion.js';

export function initRevealOnScroll(elements) {
  const targets = Array.isArray(elements) ? elements : [elements];

  if (targets.length === 0) {
    return;
  }

  if (prefersReducedMotion()) {
    targets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  observeOnce(targets, (element) => element.classList.add('is-visible'), { threshold: 0.15 });
}
