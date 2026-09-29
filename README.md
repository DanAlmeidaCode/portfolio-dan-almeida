# Portfolio — Danilo Almeida

Portfolio pessoal de Danilo (Dan) Almeida, profissional de Customer Success e
Customer Experience B2B em busca de posições sênior em SaaS. Site estático de
uma página só, construído com Vite + JavaScript puro (sem framework) e CSS
puro com design tokens.

## Como rodar

Pré-requisitos: Node.js 18+ e npm.

```bash
npm install       # instala dependências
npm run dev       # inicia o servidor de desenvolvimento (http://localhost:5173)
npm run build     # gera o build de produção em dist/
npm run preview   # serve o build de produção localmente para conferência
npm run lint      # roda o ESLint
npm run format    # formata src/*.{js,css} e arquivos na raiz com Prettier
npm run test      # roda os testes unitários (Vitest)
```

## Estrutura de pastas

```
src/
  main.js                 # orquestrador: só importa e inicializa, sem lógica de negócio
  data/                    # única fonte de verdade do conteúdo do site
    profile.js             # nome, cargo, proposta de valor, fatos narrativos, educação
    metrics.js              # as 4 métricas de carreira aprovadas
    skills.js                # as 12 ferramentas, categorias, nível e uso
    experience.js            # experiência profissional (ordem reversa)
    cases.js                  # os 3 cases (Problema/Ação/Resultado)
    contacts.js                # e-mail, WhatsApp, LinkedIn, GitHub, currículo
    navigation.js                # itens do menu
    recommendations.js            # lista de recomendações (vazia por ora)
    retentionSimulatorConfig.js    # limites/valores padrão do simulador
  components/               # cada pasta = um bloco visual que lê de data/ e renderiza DOM
    header/ hero/ metricsBand/ skillsGrid/ skillModal/ experienceAccordion/
    caseCards/ retentionSimulator/ education/ contactCta/ footer/
  features/                 # comportamento reutilizável e desacoplado do conteúdo
    scrollSpy.js mobileMenu.js scrollProgress.js pointerGlow.js countUp.js
    revealOnScroll.js backToTop.js toast.js
  utils/                     # funções puras (DOM helpers, formatação, motion, cálculo)
    dom.js format.js motion.js retentionCalculator.js (+ retentionCalculator.test.js)
  styles/
    tokens.css               # cor, espaçamento, tipografia, raio, sombra, duração
    base.css layout.css utilities.css
    components/*.css          # um arquivo de estilo por componente
public/
  icons/                     # SVGs de marca (extraídos do simple-icons) + ícones neutros
  images/                     # foto (public/images/dan.jpg ainda não existe — ver Pendências)
  cv/                          # texto do currículo para download
docs/
  curriculo.txt                # texto extraído do currículo (ver nota abaixo)
```

### Por que docs/curriculo.txt em vez do PDF original?

Este projeto foi montado a partir do texto do currículo, não do arquivo PDF
original. `docs/curriculo.txt` guarda esse texto na íntegra como referência
de conteúdo. O botão "Baixar currículo" do site aponta para
`public/cv/curriculo-dan-almeida.txt` (mesmo conteúdo) até que um PDF real
seja fornecido — ver pendência correspondente abaixo.

## Como editar o conteúdo

Todo o texto e todos os números do site vivem em `src/data/*.js`. Os
componentes em `src/components/` apenas leem esses arquivos e renderizam DOM
— eles não têm texto nem números "chumbados" no código. Para alterar
qualquer coisa visível no site (nome, métricas, skills, experiência, cases,
contatos, etc.), edite o arquivo de dados correspondente; nenhum componente
precisa ser tocado.

Exemplos:
- Trocar o texto de uma métrica → `src/data/metrics.js`
- Adicionar uma recomendação → `src/data/recommendations.js`
- Atualizar o WhatsApp/e-mail → `src/data/contacts.js`
- Adicionar uma ferramenta ao grid de skills → `src/data/skills.js` (e
  adicionar o SVG correspondente em `public/icons/`)

## Decisões de design importantes

- **Sem framework.** Vite + JS puro com um pequeno helper `createElement`
  (`src/utils/dom.js`) para montar DOM de forma declarativa sem repetir
  `document.createElement`/`setAttribute` em todo componente.
- **Separação estrita de conteúdo e apresentação.** Isso deixa claro o que é
  fato (currículo, métricas aprovadas) versus o que é apresentação (como o
  cartão é desenhado), e facilita o Dan editar o site sem mexer em código.
- **Paleta escura com contraste verificado.** As combinações de texto usadas
  no site foram checadas com a fórmula de luminância relativa do WCAG; todas
  superam 4.5:1 (a pior é ~6.8:1). Detalhes no topo de `src/styles/tokens.css`.
- **Métricas honestas.** Apenas os 4 números que o Dan confirmou como
  aprovados aparecem como métricas de destaque (cards com count-up). Outros
  números do currículo (eficiência operacional, satisfação) foram
  deliberadamente deixados de fora, conforme instrução explícita.
- **Nada inventado.** Onde o currículo não dá evidência direta (nível de
  proficiência em ferramentas, uso diário de certas ferramentas, resultados
  numéricos por cargo/case), o campo é literalmente o texto `TODO(dan)` em
  vez de um texto genérico ou um número inventado. Lista completa abaixo.
- **Ícones locais, sem hotlink.** Os logos de marca vêm do pacote npm
  `simple-icons` e ficam versionados em `public/icons/`. Ferramentas sem
  logo de marca disponível no pacote (Pipedrive, Google Workspace,
  Microsoft Office, SQL) recebem um ícone neutro desenhado à mão em vez de
  usar um logo de terceiro indevidamente.
- **Simulador de retenção é só ilustrativo.** O cálculo é uma função pura e
  testada (`src/utils/retentionCalculator.js`), mas simplificada de
  propósito (sem juros compostos, sem sazonalidade) — isso é avisado na
  interface, não só no código.
- **Acessibilidade como requisito, não extra.** Skip link, foco visível,
  `aria-current` no scroll-spy, accordion com `aria-expanded`/`aria-controls`,
  modal em `<dialog>` nativo (foco e Esc gerenciados pelo browser + reforço
  manual), `prefers-reduced-motion` respeitado em toda animação.

## Deploy no Vercel

1. Suba o repositório para o GitHub (já feito neste projeto).
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e
   importe o repositório `portfolio-dan-almeida`.
3. O Vercel detecta o Vite automaticamente. Confirme:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Clique em **Deploy**. Cada push para `main` gera um novo deploy de
   produção automaticamente; pull requests geram preview deploys.
5. Domínio próprio (opcional): em **Project Settings → Domains**, adicione o
   domínio e siga as instruções de DNS do Vercel.

Não há variáveis de ambiente nem backend — é um site 100% estático.

## Pendências para o Dan

Todo lugar do código com o texto `TODO(dan)` é algo que precisa da
confirmação ou do input do Dan antes de ser considerado "final". Nada foi
inventado para preencher essas lacunas. Lista completa (via
`grep -rn "TODO(dan)" src`):

**Conteúdo visível no site:**
- `src/components/education/education.js:33` — mensagem de estado vazio das
  recomendações inclui o texto "TODO(dan): coletar recomendações de
  gestores/colegas."
- `src/data/skills.js` — campo `level` (nível de proficiência) é
  `'TODO(dan)'` para as 12 ferramentas (linhas 21, 31, 41, 50, 60, 69, 78,
  88, 99, 109, 118, 127): o Dan ainda precisa definir a régua (básico/
  intermediário/avançado, por exemplo).
- `src/data/skills.js` — campo `usage` (como uso no dia a dia) é
  `'TODO(dan)'` para as ferramentas sem evidência direta no currículo:
  Pipedrive (linha 42), Slack (61), Google Workspace (70), ClickUp (89),
  JavaScript (110), Python (119), Meta (128).
- `src/data/experience.js` — campo `results` é `['TODO(dan)']` para os
  cargos sem resultado numérico específico no currículo: Tráfego 360 (linha
  19), Ribon (47), SenseData (60), Mooney Edu CSM (73), Mooney Edu SDR (85),
  Centauro (97), Lotus Beauty (109). (O cargo Autônomo já tem um resultado
  real: carteira de até 80 clientes B2B.)
- `src/data/cases.js` — campo `result` é `'TODO(dan)'` nos 3 cases (linhas
  16, 27, 38): o currículo não atribui um resultado numérico específico a
  cada case individual, só as 4 métricas gerais de carreira.

**Comentários de código (orientam o Dan, não aparecem no site):**
- `src/data/contacts.js:19` — o link de download do currículo aponta para
  um `.txt` (texto extraído) porque o PDF original não foi fornecido a este
  projeto; trocar por um PDF real quando disponível.
- `src/data/metrics.js:8,17,26,35` — o texto exato de cada `label` (ex.:
  "redução de churn") é um melhor esforço baseado no currículo, mas ainda
  não foi confirmado palavra por palavra pelo Dan.

**Fora do grep, mas também pendente:**
- `public/images/dan.jpg` — a foto real do Dan ainda não existe. O hero (e
  qualquer outro lugar que use `profile.photo`) já trata isso como estado
  de erro explícito: ao falhar o carregamento, mostra um placeholder com
  `width`/`height` fixos (sem layout shift) em vez de quebrar.
