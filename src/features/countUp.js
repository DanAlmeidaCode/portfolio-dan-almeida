// Anima números subindo de 0 até o valor alvo quando o elemento entra na
// viewport. Roda uma única vez por elemento e respeita prefers-reduced-motion.

import { observeOnce, prefersReducedMotion } from '../utils/motion.js';

const COUNT_UP_DURATION_MS = 1200;

function easeOutQuad(progress) {
  return 1 - (1 - progress) * (1 - progress);
}

function animateValue(element, targetValue) {
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / COUNT_UP_DURATION_MS);
    const currentValue = Math.round(targetValue * easeOutQuad(progress));
    element.textContent = String(currentValue);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

export function initCountUp(elements) {
  const targets = Array.isArray(elements) ? elements : [elements];

  if (targets.length === 0) {
    return;
  }

  if (prefersReducedMotion()) {
    targets.forEach((element) => {
      element.textContent = element.dataset.countTarget;
    });
    return;
  }

  observeOnce(
    targets,
    (element) => {
      const targetValue = Number(element.dataset.countTarget);
      if (Number.isFinite(targetValue)) {
        animateValue(element, targetValue);
      }
    },
    { threshold: 0.4 },
  );
}
