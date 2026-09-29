import { createElement } from '../../utils/dom.js';
import { retentionSimulatorConfig } from '../../data/retentionSimulatorConfig.js';
import { calculateRetentionImpact } from '../../utils/retentionCalculator.js';
import { formatCurrencyBRL } from '../../utils/format.js';

const PERCENT_TO_FRACTION = 100;

function buildNumberField({ id, labelText, field }) {
  const input = createElement('input', {
    type: 'number',
    id,
    name: id,
    min: String(field.min),
    max: String(field.max),
    step: String(field.step),
    value: String(field.defaultValue),
    className: 'retention-simulator__input',
  });

  const label = createElement('label', { for: id, className: 'retention-simulator__label' }, labelText);

  return { wrapper: createElement('div', { className: 'retention-simulator__field' }, [label, input]), input };
}

function buildSliderField({ id, labelText, field }) {
  const output = createElement('output', { for: id, className: 'retention-simulator__slider-value' }, `${field.defaultValue}%`);

  const input = createElement('input', {
    type: 'range',
    id,
    name: id,
    min: String(field.min),
    max: String(field.max),
    step: String(field.step),
    value: String(field.defaultValue),
    className: 'retention-simulator__slider',
  });

  const labelRow = createElement('div', { className: 'retention-simulator__label-row' }, [
    createElement('label', { for: id, className: 'retention-simulator__label' }, labelText),
    output,
  ]);

  input.addEventListener('input', () => {
    output.textContent = `${input.value}%`;
  });

  return {
    wrapper: createElement('div', { className: 'retention-simulator__field' }, [labelRow, input]),
    input,
  };
}

function buildResultDisplay() {
  const preservedRevenue = createElement('p', { className: 'retention-simulator__result-value text-mono' }, formatCurrencyBRL(0));
  const annualProjection = createElement('p', { className: 'retention-simulator__result-value text-mono' }, formatCurrencyBRL(0));

  const resultsBlock = createElement('div', { className: 'retention-simulator__results' }, [
    createElement('div', { className: 'retention-simulator__result' }, [
      createElement('span', { className: 'retention-simulator__result-label' }, 'Receita mensal preservada'),
      preservedRevenue,
    ]),
    createElement('div', { className: 'retention-simulator__result' }, [
      createElement('span', { className: 'retention-simulator__result-label' }, 'Projeção anual (sem juros compostos)'),
      annualProjection,
    ]),
  ]);

  return { resultsBlock, preservedRevenue, annualProjection };
}

export function renderRetentionSimulator(container) {
  const clientsField = buildNumberField({
    id: 'sim-active-clients',
    labelText: 'Clientes ativos',
    field: retentionSimulatorConfig.activeClients,
  });
  const ticketField = buildNumberField({
    id: 'sim-average-ticket',
    labelText: 'Ticket médio mensal (R$)',
    field: retentionSimulatorConfig.averageMonthlyTicket,
  });
  const churnField = buildNumberField({
    id: 'sim-current-churn',
    labelText: 'Churn mensal atual (%)',
    field: retentionSimulatorConfig.currentMonthlyChurnPercent,
  });
  const reductionField = buildSliderField({
    id: 'sim-churn-reduction',
    labelText: 'Redução de churn simulada',
    field: retentionSimulatorConfig.churnReductionPercent,
  });

  const { resultsBlock, preservedRevenue, annualProjection } = buildResultDisplay();

  function recalculate() {
    const result = calculateRetentionImpact({
      activeClients: Number(clientsField.input.value),
      averageMonthlyTicket: Number(ticketField.input.value),
      currentMonthlyChurn: Number(churnField.input.value) / PERCENT_TO_FRACTION,
      churnReduction: Number(reductionField.input.value) / PERCENT_TO_FRACTION,
    });

    preservedRevenue.textContent = formatCurrencyBRL(result.preservedMonthlyRevenue);
    annualProjection.textContent = formatCurrencyBRL(result.annualProjection);
  }

  [clientsField.input, ticketField.input, churnField.input, reductionField.input].forEach((input) => {
    input.addEventListener('input', recalculate);
  });

  const form = createElement('form', { className: 'retention-simulator__form', onSubmit: (event) => event.preventDefault() }, [
    clientsField.wrapper,
    ticketField.wrapper,
    churnField.wrapper,
    reductionField.wrapper,
  ]);

  const sectionContent = createElement('div', { className: 'container' }, [
    createElement('div', { className: 'section-heading reveal' }, [
      createElement('span', { className: 'section-eyebrow' }, 'Simulador'),
      createElement('h2', {}, 'Simulador de impacto de retenção'),
      createElement('p', { className: 'retention-simulator__disclaimer' }, retentionSimulatorConfig.disclaimer),
    ]),
    createElement('div', { className: 'retention-simulator reveal' }, [form, resultsBlock]),
    createElement('p', { className: 'text-secondary retention-simulator__methodology' }, retentionSimulatorConfig.methodologyNote),
  ]);

  container.replaceChildren(sectionContent);

  recalculate();

  return { revealTargets: [sectionContent.querySelector('.section-heading'), sectionContent.querySelector('.retention-simulator')] };
}
