// Configuração de valores padrão e limites dos campos do simulador de
// retenção. Fica em data/ para não ter números soltos no componente.

export const retentionSimulatorConfig = {
  activeClients: { defaultValue: 100, min: 0, max: 10000, step: 1 },
  averageMonthlyTicket: { defaultValue: 500, min: 0, max: 100000, step: 50 },
  currentMonthlyChurnPercent: { defaultValue: 5, min: 0, max: 100, step: 0.5 },
  churnReductionPercent: { defaultValue: 20, min: 0, max: 100, step: 5 },
  disclaimer: 'Simulação ilustrativa, não é resultado real.',
  methodologyNote:
    'Projeção simplificada: sem juros compostos, sem sazonalidade e sem considerar novos clientes ao longo do ano.',
};
