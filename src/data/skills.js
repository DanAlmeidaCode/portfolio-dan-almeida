// Ferramentas e categorias do bloco de Skills & Tools.
// "level" é sempre TODO(dan): o Dan ainda vai definir a régua de proficiência.
// "usage" só tem texto real quando o currículo evidencia o uso da ferramenta;
// caso contrário, permanece TODO(dan) em vez de texto inventado.

export const skillCategories = [
  'CRM e Vendas',
  'Suporte',
  'Comunicação',
  'Produtividade',
  'Dados e Código',
  'Mídia Paga',
];

export const skills = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM e Vendas',
    iconSlug: 'salesforce',
    level: 'TODO(dan)',
    usage:
      'Usei o Salesforce para estruturar automações de acompanhamento de carteira e montar dashboards de sucesso do cliente na atuação como consultor autônomo, além de aparecer entre os CRMs do dia a dia em outras posições de CS.',
    relatedCaseId: 'churn-diagnostico',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM e Vendas',
    iconSlug: 'hubspot',
    level: 'TODO(dan)',
    usage:
      'Na Mooney Edu, usei o HubSpot para gerir a jornada do cliente e apoiar estratégias de retenção, upsell e cross-sell junto com Vendas e Produto.',
    relatedCaseId: 'onboarding',
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'CRM e Vendas',
    iconSlug: 'pipedrive',
    level: 'TODO(dan)',
    usage: 'TODO(dan)',
    relatedCaseId: 'sdr-playbook',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    category: 'Suporte',
    iconSlug: 'zendesk',
    level: 'TODO(dan)',
    usage:
      'Atendi via Zendesk na SenseData em parceria com o time de Customer Success e, na Ribon, estruturei base de conhecimento e automações dentro da própria ferramenta.',
    relatedCaseId: 'churn-diagnostico',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Comunicação',
    iconSlug: 'slack',
    level: 'TODO(dan)',
    usage: 'TODO(dan)',
    relatedCaseId: 'onboarding',
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    category: 'Produtividade',
    iconSlug: 'googleworkspace',
    level: 'TODO(dan)',
    usage: 'TODO(dan)',
    relatedCaseId: 'onboarding',
  },
  {
    id: 'microsoft-office',
    name: 'Microsoft Office',
    category: 'Produtividade',
    iconSlug: 'microsoftoffice',
    level: 'TODO(dan)',
    usage:
      'Uso o Excel avançado para montar planilhas de acompanhamento e, na Ribon, construí dashboards de CSAT, NPS e FCR combinando Looker Studio e Excel.',
    relatedCaseId: 'churn-diagnostico',
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    category: 'Produtividade',
    iconSlug: 'clickup',
    level: 'TODO(dan)',
    usage: 'TODO(dan)',
    relatedCaseId: 'sdr-playbook',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Dados e Código',
    iconSlug: null,
    level: 'TODO(dan)',
    usage:
      'Na SenseData, usei SQL para analisar dados de clientes como parte da rotina de Customer Experience, organizada em sprints via Jira.',
    relatedCaseId: 'churn-diagnostico',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Dados e Código',
    iconSlug: 'javascript',
    level: 'TODO(dan)',
    usage: 'TODO(dan)',
    relatedCaseId: 'churn-diagnostico',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Dados e Código',
    iconSlug: 'python',
    level: 'TODO(dan)',
    usage: 'TODO(dan)',
    relatedCaseId: 'churn-diagnostico',
  },
  {
    id: 'meta',
    name: 'Meta',
    category: 'Mídia Paga',
    iconSlug: 'meta',
    level: 'TODO(dan)',
    usage: 'TODO(dan)',
    relatedCaseId: 'sdr-playbook',
  },
];
