// Controla o drawer de navegação mobile: abrir/fechar, aria-expanded,
// fechar ao pressionar Esc e fechar ao clicar em um link.

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
}

function trapFocus(event, container) {
  if (event.key !== 'Tab') {
    return;
  }

  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function initMobileMenu(menuToggle, drawer) {
  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
    const focusable = getFocusableElements(drawer);
    focusable[0]?.focus();
    document.addEventListener('keydown', handleKeydown);
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    document.removeEventListener('keydown', handleKeydown);
    menuToggle.focus();
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeDrawer();
    } else {
      trapFocus(event, drawer);
    }
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawer.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      closeDrawer();
    }
  });
}
