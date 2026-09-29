// Métricas de carreira aprovadas. Apenas estas 4 — não adicionar outras
// sem confirmação explícita do Dan, mesmo que o currículo cite mais números.

export const metrics = [
  {
    value: 28,
    suffix: '%',
    // TODO(dan): confirmar rótulo exato
    label: 'redução de churn',
    context: 'Redução acumulada na taxa de cancelamento de clientes ao longo da carreira em CS.',
    sourceNote: 'Currículo profissional, resumo de carreira.',
    benchmarkNote: null,
  },
  {
    value: 22,
    suffix: '%',
    // TODO(dan): confirmar rótulo exato
    label: 'aumento de retenção',
    context: 'Crescimento na retenção de clientes em carteiras sob gestão.',
    sourceNote: 'Currículo profissional, resumo de carreira.',
    benchmarkNote: null,
  },
  {
    value: 18,
    suffix: '%',
    // TODO(dan): confirmar rótulo exato
    label: 'crescimento de receita',
    context: 'Crescimento de receita associado a ações de expansão e retenção.',
    sourceNote: 'Currículo profissional, resumo de carreira.',
    benchmarkNote: null,
  },
  {
    value: 35,
    suffix: '%',
    // TODO(dan): confirmar rótulo exato
    label: 'aumento de adoção',
    context: 'Aumento na adoção de produto/plataforma pelos clientes.',
    sourceNote: 'Currículo profissional, resumo de carreira.',
    benchmarkNote: null,
  },
];
