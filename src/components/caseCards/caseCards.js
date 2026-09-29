import { createElement } from '../../utils/dom.js';
import { cases } from '../../data/cases.js';

function buildTagList(tags) {
  return createElement(
    'ul',
    { className: 'case-card__tags' },
    tags.map((tag) => createElement('li', { className: 'tag' }, tag)),
  );
}

function buildCaseCard(caseItem) {
  const panelId = `case-panel-${caseItem.id}`;

  const trigger = createElement(
    'button',
    {
      type: 'button',
      className: 'case-card__trigger',
      'aria-expanded': 'false',
      'aria-controls': panelId,
    },
    [
      createElement('h3', {}, caseItem.title),
      createElement('p', { className: 'text-secondary' }, caseItem.company),
      buildTagList(caseItem.tags),
      createElement('span', { className: 'case-card__cta text-mono' }, 'Ver problema, ação e resultado'),
    ],
  );

  const panel = createElement(
    'div',
    { id: panelId, className: 'case-card__panel', hidden: true },
    [
      createElement('h4', {}, 'Problema'),
      createElement('p', {}, caseItem.problem),
      createElement('h4', {}, 'Ação'),
      createElement('p', {}, caseItem.action),
      createElement('h4', {}, 'Resultado'),
      createElement('p', {}, caseItem.result),
    ],
  );

  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isExpanded));
    panel.hidden = isExpanded;
  });

  return createElement('article', { className: 'case-card reveal', id: `case-${caseItem.id}` }, [trigger, panel]);
}

export function renderCaseCards(container) {
  if (cases.length === 0) {
    container.replaceChildren(
      createElement('div', { className: 'container' }, createElement('p', {}, 'Cases em breve.')),
    );
    return { revealTargets: [] };
  }

  const cardElements = cases.map(buildCaseCard);

  const sectionContent = createElement('div', { className: 'container' }, [
    createElement('div', { className: 'section-heading reveal' }, [
      createElement('span', { className: 'section-eyebrow' }, 'Cases'),
      createElement('h2', {}, 'Problema, ação e resultado'),
    ]),
    createElement('div', { className: 'case-cards-grid' }, cardElements),
  ]);

  container.replaceChildren(sectionContent);

  return { revealTargets: [sectionContent.querySelector('.section-heading'), ...cardElements] };
}
