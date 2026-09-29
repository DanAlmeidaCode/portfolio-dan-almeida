import { describe, it, expect } from 'vitest';
import { calculateRetentionImpact } from './retentionCalculator.js';

describe('calculateRetentionImpact', () => {
  it('calcula receita preservada e projeção anual com valores normais', () => {
    const result = calculateRetentionImpact({
      activeClients: 100,
      averageMonthlyTicket: 500,
      currentMonthlyChurn: 0.05,
      churnReduction: 0.2,
    });

    // 100 clientes * 0.05 churn * 0.2 redução * 500 ticket = 500
    expect(result.preservedMonthlyRevenue).toBe(500);
    expect(result.annualProjection).toBe(6000);
  });

  it('retorna zero quando qualquer entrada é zero', () => {
    const result = calculateRetentionImpact({
      activeClients: 0,
      averageMonthlyTicket: 500,
      currentMonthlyChurn: 0.05,
      churnReduction: 0.2,
    });

    expect(result.preservedMonthlyRevenue).toBe(0);
    expect(result.annualProjection).toBe(0);
  });

  it('trata entradas negativas como zero em vez de lançar erro', () => {
    const result = calculateRetentionImpact({
      activeClients: -50,
      averageMonthlyTicket: 500,
      currentMonthlyChurn: 0.05,
      churnReduction: 0.2,
    });

    expect(result.preservedMonthlyRevenue).toBe(0);
    expect(result.annualProjection).toBe(0);
  });

  it('trata entradas inválidas (NaN, undefined, string não numérica) como zero', () => {
    const result = calculateRetentionImpact({
      activeClients: Number.NaN,
      averageMonthlyTicket: undefined,
      currentMonthlyChurn: 'abc',
      churnReduction: 0.2,
    });

    expect(result.preservedMonthlyRevenue).toBe(0);
    expect(result.annualProjection).toBe(0);
    expect(Number.isFinite(result.preservedMonthlyRevenue)).toBe(true);
  });

  it('não lança exceção mesmo com objeto de entrada vazio', () => {
    expect(() => calculateRetentionImpact({})).not.toThrow();
  });
});
