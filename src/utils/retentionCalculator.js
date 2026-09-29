// Cálculo isolado do simulador de retenção. Função pura, sem acesso a DOM,
// para ser testável e para deixar claro que é uma projeção simplificada
// (sem juros compostos, sem sazonalidade, sem cohort real de clientes).
//
// Comportamento para entradas inválidas: qualquer valor que não seja um
// número finito, ou que seja negativo, é tratado como 0 (clampado), em vez
// de lançar erro. Isso mantém o simulador utilizável mesmo com campos vazios
// ou digitação incompleta do usuário.

const MONTHS_PER_YEAR = 12;

function toNonNegativeNumber(rawValue) {
  const value = Number(rawValue);
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return value;
}

/**
 * @param {object} params
 * @param {number} params.activeClients - Número de clientes ativos.
 * @param {number} params.averageMonthlyTicket - Ticket médio mensal (R$).
 * @param {number} params.currentMonthlyChurn - Churn mensal atual, como fração (ex.: 0.05 = 5%).
 * @param {number} params.churnReduction - Redução de churn simulada, como fração (ex.: 0.2 = 20%).
 * @returns {{ preservedMonthlyRevenue: number, annualProjection: number }}
 */
export function calculateRetentionImpact({
  activeClients,
  averageMonthlyTicket,
  currentMonthlyChurn,
  churnReduction,
}) {
  const clients = toNonNegativeNumber(activeClients);
  const ticket = toNonNegativeNumber(averageMonthlyTicket);
  const churn = toNonNegativeNumber(currentMonthlyChurn);
  const reduction = toNonNegativeNumber(churnReduction);

  const preservedMonthlyRevenue = clients * churn * reduction * ticket;
  const annualProjection = preservedMonthlyRevenue * MONTHS_PER_YEAR;

  return { preservedMonthlyRevenue, annualProjection };
}
