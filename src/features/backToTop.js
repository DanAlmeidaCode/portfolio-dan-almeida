// Botão "voltar ao topo": some no início da página e aparece após rolar.

import { createElement } from '../utils/dom.js';

const SHOW_AFTER_SCROLL_PX = 480;

export function initBackToTop(container) {
  const button = createElement(
    'button',
    {
      type: 'button',
      className: 'back-to-top',
      'aria-label': 'Voltar ao topo da página',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    '↑',
  );

  container.appendChild(button);

  window.addEventListener('scroll', () => {
    button.classList.toggle('back-to-top--visible', window.scrollY > SHOW_AFTER_SCROLL_PX);
  });
}
