// Marca o link de navegação correspondente à seção visível com aria-current,
// para leitores de tela e para o estilo visual do item ativo.

const VIEWPORT_CENTER_MARGIN = '-40% 0px -55% 0px';

function clearActiveLinks(navLinks) {
  navLinks.forEach((link) => link.removeAttribute('aria-current'));
}

function activateLinksFor(sectionId, navLinks) {
  clearActiveLinks(navLinks);
  navLinks
    .filter((link) => link.dataset.navTarget === sectionId)
    .forEach((link) => link.setAttribute('aria-current', 'true'));
}

export function initScrollSpy(navLinks, sectionIds) {
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((section) => section !== null);

  if (sections.length === 0 || typeof IntersectionObserver === 'undefined') {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        activateLinksFor(visibleEntry.target.id, navLinks);
      }
    },
    { rootMargin: VIEWPORT_CENTER_MARGIN, threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}
