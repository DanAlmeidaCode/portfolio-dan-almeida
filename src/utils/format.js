// Formatação de números e moeda usada em métricas e no simulador de retenção.

const BRL_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const INTEGER_FORMATTER = new Intl.NumberFormat('pt-BR');

export function formatCurrencyBRL(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return BRL_FORMATTER.format(safeValue);
}

export function formatInteger(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return INTEGER_FORMATTER.format(Math.round(safeValue));
}

export function formatPercent(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue}%`;
}
