import { createElement } from '../../utils/dom.js';
import { cases } from '../../data/cases.js';

function findRelatedCase(caseId) {
  return cases.find((caseItem) => caseItem.id === caseId) ?? null;
}

function buildModalBody(skill, onNavigateToCase) {
  const relatedCase = findRelatedCase(skill.relatedCaseId);

  return [
    createElement('p', { className: 'skill-modal__category text-mono' }, skill.category),
    createElement('dl', { className: 'skill-modal__facts' }, [
      createElement('dt', {}, 'Nível'),
      createElement('dd', {}, skill.level),
      createElement('dt', {}, 'Como uso no dia a dia'),
      createElement('dd', {}, skill.usage),
    ]),
    relatedCase
      ? createElement(
          'a',
          {
            href: `#case-${relatedCase.id}`,
            className: 'button button--secondary skill-modal__case-link',
            onClick: onNavigateToCase,
          },
          ['Ver case relacionado: ', relatedCase.title],
        )
      : createElement('p', { className: 'text-secondary' }, 'Nenhum case relacionado ainda.'),
  ];
}

/**
 * Cria (uma única vez) o <dialog> nativo usado para mostrar detalhes de
 * cada ferramenta. Anexado ao <body> (não à seção) porque a seção de
 * skills substitui seus filhos ao renderizar o grid, o que apagaria o
 * dialog se ele vivesse dentro dela. Retorna `openSkillModal(skill, trigger)`.
 */
export function createSkillModal(container = document.body) {
  const titleId = 'skill-modal-title';

  const closeButton = createElement(
    'button',
    { type: 'button', className: 'skill-modal__close', 'aria-label': 'Fechar' },
    '×',
  );
  const titleElement = createElement('h3', { id: titleId, className: 'skill-modal__title' }, '');
  const bodyContainer = createElement('div', { className: 'skill-modal__body' });

  const dialog = createElement(
    'dialog',
    { className: 'skill-modal', 'aria-labelledby': titleId },
    [closeButton, titleElement, bodyContainer],
  );

  container.appendChild(dialog);

  let lastTrigger = null;

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    // Fecha ao clicar no backdrop (fora do conteúdo do dialog).
    if (event.target === dialog) {
      dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    lastTrigger?.focus();
  });

  function openSkillModal(skill, triggerElement) {
    lastTrigger = triggerElement ?? null;
    titleElement.textContent = skill.name;
    bodyContainer.replaceChildren(...buildModalBody(skill, () => dialog.close()));
    dialog.showModal();
  }

  return { openSkillModal };
}
