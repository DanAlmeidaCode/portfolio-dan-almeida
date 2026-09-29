import { createElement } from '../../utils/dom.js';
import { profile } from '../../data/profile.js';
import { navigationItems } from '../../data/navigation.js';
import { contacts } from '../../data/contacts.js';

function getInitials(fullName) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .map((namePart) => namePart[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function buildNavLink(item) {
  return createElement(
    'li',
    {},
    createElement(
      'a',
      {
        href: `#${item.id}`,
        className: 'header__nav-link',
        dataset: { navTarget: item.id },
      },
      item.label,
    ),
  );
}

function buildLogo() {
  return createElement('a', { href: '#hero', className: 'header__logo', 'aria-label': `${profile.name}, início da página` }, [
    createElement('span', { className: 'header__monogram', 'aria-hidden': 'true' }, getInitials(profile.name)),
    createElement('span', { className: 'visually-hidden' }, profile.name),
  ]);
}

/**
 * Renderiza o header fixo (logo, navegação, CTA de currículo, barra de
 * progresso de leitura e o botão/drawer do menu mobile) dentro de `container`.
 *
 * @returns referências de elementos usadas pelas features (scrollSpy,
 * mobileMenu, scrollProgress) para adicionar comportamento sem duplicar DOM.
 */
export function renderHeader(container) {
  const navLinks = navigationItems.map(buildNavLink);

  const desktopNav = createElement('nav', { className: 'header__nav', 'aria-label': 'Navegação principal' }, [
    createElement('ul', { className: 'header__nav-list' }, navLinks),
  ]);

  const cvButton = createElement(
    'a',
    {
      href: contacts.cv.href,
      className: 'button button--secondary header__cv-button',
      download: true,
    },
    'Baixar currículo',
  );

  const menuToggle = createElement(
    'button',
    {
      type: 'button',
      className: 'header__menu-toggle',
      'aria-expanded': 'false',
      'aria-controls': 'mobile-drawer',
      'aria-label': 'Abrir menu de navegação',
    },
    createElement('span', { className: 'header__menu-icon', 'aria-hidden': 'true' }),
  );

  const drawerNavLinks = navigationItems.map(buildNavLink);
  const drawer = createElement(
    'div',
    {
      id: 'mobile-drawer',
      className: 'header__drawer',
      'aria-label': 'Menu de navegação mobile',
      'aria-hidden': 'true',
    },
    [
      createElement('nav', { 'aria-label': 'Navegação mobile' }, [
        createElement('ul', { className: 'header__drawer-list' }, drawerNavLinks),
      ]),
      createElement(
        'a',
        { href: contacts.cv.href, className: 'button button--primary', download: true },
        'Baixar currículo',
      ),
    ],
  );

  const progressBar = createElement('div', {
    className: 'header__progress',
    role: 'progressbar',
    'aria-label': 'Progresso de leitura da página',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    'aria-valuenow': '0',
  });

  const headerElement = createElement('header', { className: 'header' }, [
    createElement('div', { className: 'container header__bar' }, [
      buildLogo(),
      desktopNav,
      cvButton,
      menuToggle,
    ]),
    progressBar,
  ]);

  container.replaceChildren(headerElement, drawer);

  return {
    headerElement,
    navLinks: [...navLinks, ...drawerNavLinks],
    menuToggle,
    drawer,
    progressBar,
  };
}
