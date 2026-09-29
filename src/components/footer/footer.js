import { createElement } from '../../utils/dom.js';
import { profile } from '../../data/profile.js';
import { contacts } from '../../data/contacts.js';

function getCurrentYear() {
  return new Date().getFullYear();
}

export function renderFooter(container) {
  const footerContent = createElement('div', { className: 'container footer__bar' }, [
    createElement('p', { className: 'text-secondary' }, `© ${getCurrentYear()} ${profile.name}`),
    createElement('p', { className: 'text-secondary' }, profile.footerNote),
    createElement('a', { href: `mailto:${contacts.email}`, className: 'footer__email text-mono' }, contacts.email),
  ]);

  container.replaceChildren(footerContent);
}
