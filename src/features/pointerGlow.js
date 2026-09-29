// Brilho sutil que segue o ponteiro, ativado só em dispositivos com hover
// real (mouse/trackpad). Em touch, o CSS correspondente nem é aplicado.

import { supportsHover } from '../utils/motion.js';

export function initPointerGlow(element) {
  if (!supportsHover()) {
    return;
  }

  element.addEventListener('pointermove', (event) => {
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    element.style.setProperty('--glow-x', `${x}%`);
    element.style.setProperty('--glow-y', `${y}%`);
  });
}
