import { createElement } from '../../utils/dom.js';
import { skills, skillCategories } from '../../data/skills.js';
import { profile } from '../../data/profile.js';

const ALL_CATEGORIES_LABEL = 'Todas';

function buildTile(skill, onOpen) {
  const icon = createElement('img', {
    src: `/icons/${skill.iconSlug}.svg`,
    alt: '',
    width: 32,
    height: 32,
    loading: 'lazy',
  });

  const tile = createElement(
    'button',
    {
      type: 'button',
      className: 'skill-tile',
      'aria-label': skill.name,
      dataset: { category: skill.category },
      onClick: (event) => onOpen(skill, event.currentTarget),
    },
    [icon, createElement('span', { className: 'skill-tile__name' }, skill.name)],
  );

  return tile;
}

function setTileVisibility(tile, isVisible) {
  if (isVisible) {
    tile.hidden = false;
    // Força reflow para garantir que a transição de entrada rode.
    void tile.offsetHeight;
    tile.classList.remove('skill-tile--hidden');
  } else {
    tile.classList.add('skill-tile--hidden');
    tile.addEventListener(
      'transitionend',
      () => {
        if (tile.classList.contains('skill-tile--hidden')) {
          tile.hidden = true;
        }
      },
      { once: true },
    );
  }
}

function buildFilterChip(category, isActive, onSelect) {
  return createElement(
    'button',
    {
      type: 'button',
      className: `filter-chip${isActive ? ' filter-chip--active' : ''}`,
      'aria-pressed': String(isActive),
      onClick: () => onSelect(category),
    },
    category,
  );
}

// Coluna enxuta ao lado do grid. A lista completa de certificações fica na
// seção de Formação (#education), para não duplicar o mesmo conteúdo longo
// duas vezes na página.
function buildEducationColumn() {
  return createElement('div', { className: 'skills__education' }, [
    createElement('h3', {}, 'Formação'),
    createElement('p', { className: 'skills__education-course' }, profile.education.course),
    createElement('p', { className: 'text-secondary' }, [
      profile.education.institution,
      ' · ',
      profile.education.period,
    ]),
    createElement(
      'a',
      { href: '#education', className: 'skills__education-link' },
      'Ver certificações completas',
    ),
  ]);
}

export function renderSkillsGrid(container, { onOpenSkill }) {
  if (skills.length === 0) {
    container.replaceChildren(
      createElement('div', { className: 'container' }, createElement('p', {}, 'Skills em breve.')),
    );
    return;
  }

  const tiles = skills.map((skill) => buildTile(skill, onOpenSkill));

  function applyFilter(category) {
    tiles.forEach((tile) => {
      const matches = category === ALL_CATEGORIES_LABEL || tile.dataset.category === category;
      setTileVisibility(tile, matches);
    });
  }

  const chipsRow = createElement('div', { className: 'filter-chips', role: 'group', 'aria-label': 'Filtrar por categoria' });
  const allCategories = [ALL_CATEGORIES_LABEL, ...skillCategories];

  function refreshChips(selectedCategory) {
    chipsRow.replaceChildren(
      ...allCategories.map((category) =>
        buildFilterChip(category, category === selectedCategory, (nextCategory) => {
          applyFilter(nextCategory);
          refreshChips(nextCategory);
        }),
      ),
    );
  }

  refreshChips(ALL_CATEGORIES_LABEL);

  const grid = createElement('div', { className: 'skills-grid' }, tiles);

  const sectionContent = createElement('div', { className: 'container' }, [
    createElement('div', { className: 'section-heading reveal' }, [
      createElement('span', { className: 'section-eyebrow' }, 'Skills & Tools'),
      createElement('h2', {}, 'Ferramentas do dia a dia'),
    ]),
    chipsRow,
    createElement('div', { className: 'skills__layout' }, [grid, buildEducationColumn()]),
  ]);

  container.replaceChildren(sectionContent);
}
