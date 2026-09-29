import { createElement } from '../../utils/dom.js';
import { experience } from '../../data/experience.js';

function toPanelId(roleId) {
  return `experience-panel-${roleId}`;
}

function buildResponsibilitiesList(responsibilities) {
  return createElement(
    'ul',
    { className: 'experience-card__list' },
    responsibilities.map((item) => createElement('li', {}, item)),
  );
}

function buildResultsList(results) {
  return createElement(
    'ul',
    { className: 'experience-card__list' },
    results.map((item) => createElement('li', {}, item)),
  );
}

function buildAccordionItem(role) {
  const panelId = toPanelId(role.id);
  const headingId = `experience-heading-${role.id}`;

  const trigger = createElement(
    'button',
    {
      type: 'button',
      className: 'experience-card__trigger',
      'aria-expanded': 'false',
      'aria-controls': panelId,
      id: headingId,
    },
    [
      createElement('span', { className: 'experience-card__trigger-text' }, [
        createElement('span', { className: 'experience-card__role' }, role.role),
        createElement('span', { className: 'experience-card__company text-secondary' }, role.company),
        createElement(
          'span',
          { className: 'experience-card__hint text-secondary' },
          'Ver responsabilidades e resultados',
        ),
      ]),
      createElement('span', { className: 'experience-card__meta' }, [
        role.isCurrent
          ? createElement('span', { className: 'tag tag--current' }, 'Atual')
          : null,
        createElement('span', { className: 'experience-card__period text-mono' }, role.period),
        createElement('span', { className: 'experience-card__chevron', 'aria-hidden': 'true' }, '▾'),
      ]),
    ],
  );

  const panel = createElement(
    'div',
    {
      id: panelId,
      role: 'region',
      'aria-labelledby': headingId,
      className: 'experience-card__panel',
      hidden: true,
    },
    [
      createElement('h4', {}, 'Responsabilidades'),
      buildResponsibilitiesList(role.responsibilities),
      createElement('h4', {}, 'Resultados'),
      buildResultsList(role.results),
    ],
  );

  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isExpanded));
    panel.hidden = isExpanded;
  });

  const item = createElement('li', { className: 'experience-card' }, [
    createElement('h3', { className: 'experience-card__heading' }, [trigger]),
    panel,
  ]);

  return item;
}

export function renderExperienceAccordion(container) {
  if (experience.length === 0) {
    container.replaceChildren(
      createElement('div', { className: 'container' }, createElement('p', {}, 'Experiência em breve.')),
    );
    return { revealTargets: [] };
  }

  const items = experience.map(buildAccordionItem);

  const sectionContent = createElement('div', { className: 'container' }, [
    createElement('div', { className: 'section-heading reveal' }, [
      createElement('span', { className: 'section-eyebrow' }, 'Experiência'),
      createElement('h2', {}, 'Trajetória profissional'),
    ]),
    createElement('ul', { className: 'experience-accordion' }, items),
  ]);

  container.replaceChildren(sectionContent);

  return { revealTargets: [sectionContent.querySelector('.section-heading'), ...items] };
}
