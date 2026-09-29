import { createElement } from '../../utils/dom.js';
import { metrics } from '../../data/metrics.js';

function toContextId(metricLabel, index) {
  const slug = metricLabel
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  return `metric-context-${slug}-${index}`;
}

function toggleMetricCard(triggerButton, contextPanel, expand) {
  triggerButton.setAttribute('aria-expanded', String(expand));
  contextPanel.hidden = !expand;
  triggerButton.closest('.metric-card')?.classList.toggle('is-expanded', expand);
}

function buildMetricCard(metric, index) {
  const contextId = toContextId(metric.label, index);

  const valueElement = createElement(
    'span',
    {
      className: 'metric-card__value text-mono',
      dataset: { countTarget: String(metric.value) },
      'aria-hidden': 'true',
    },
    '0',
  );

  const triggerButton = createElement(
    'button',
    {
      type: 'button',
      className: 'metric-card__trigger reveal',
      'aria-expanded': 'false',
      'aria-controls': contextId,
    },
    [
      createElement('span', { className: 'metric-card__value-row' }, [
        valueElement,
        createElement('span', { className: 'metric-card__suffix text-mono', 'aria-hidden': 'true' }, metric.suffix),
      ]),
      createElement('span', { className: 'metric-card__label' }, metric.label),
      createElement(
        'span',
        { className: 'visually-hidden' },
        `${metric.value}${metric.suffix} de ${metric.label}. Ative para ver o contexto.`,
      ),
    ],
  );

  const contextPanel = createElement(
    'div',
    { id: contextId, className: 'metric-card__context', hidden: true },
    [
      createElement('p', {}, metric.context),
      createElement('p', { className: 'text-secondary metric-card__source' }, metric.sourceNote),
    ],
  );

  const card = createElement('article', { className: 'metric-card' }, [triggerButton, contextPanel]);

  function handleToggle() {
    const isExpanded = triggerButton.getAttribute('aria-expanded') === 'true';
    toggleMetricCard(triggerButton, contextPanel, !isExpanded);
  }

  triggerButton.addEventListener('click', handleToggle);
  triggerButton.addEventListener('focus', () => toggleMetricCard(triggerButton, contextPanel, true));

  return { card, triggerButton, valueElement };
}

export function renderMetricsBand(container) {
  if (metrics.length === 0) {
    container.replaceChildren(
      createElement('div', { className: 'container' }, createElement('p', {}, 'Métricas em breve.')),
    );
    return { countUpTargets: [], revealTargets: [] };
  }

  const cards = metrics.map(buildMetricCard);

  const sectionContent = createElement('div', { className: 'container' }, [
    createElement('div', { className: 'section-heading reveal' }, [
      createElement('span', { className: 'section-eyebrow' }, 'Métricas'),
      createElement('h2', {}, 'Resultados ao longo da carreira'),
    ]),
    createElement(
      'div',
      { className: 'metrics-band__grid' },
      cards.map((item) => item.card),
    ),
  ]);

  container.replaceChildren(sectionContent);

  return {
    countUpTargets: cards.map((item) => item.valueElement),
    revealTargets: [sectionContent.querySelector('.section-heading'), ...cards.map((item) => item.triggerButton)],
  };
}
