// Ponto de entrada. Apenas orquestra: importa estilos/fontes e inicializa
// cada módulo. Nenhuma regra de negócio deve viver aqui.

import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/utilities.css';
import './styles/components/header.css';
import './styles/components/hero.css';
import './styles/components/metricsBand.css';
import './styles/components/skills.css';
import './styles/components/experience.css';
import './styles/components/cases.css';
import './styles/components/retentionSimulator.css';

import { renderHeader } from './components/header/header.js';
import { renderHero } from './components/hero/hero.js';
import { renderMetricsBand } from './components/metricsBand/metricsBand.js';
import { renderSkillsGrid } from './components/skillsGrid/skillsGrid.js';
import { createSkillModal } from './components/skillModal/skillModal.js';
import { renderExperienceAccordion } from './components/experienceAccordion/experienceAccordion.js';
import { renderCaseCards } from './components/caseCards/caseCards.js';
import { renderRetentionSimulator } from './components/retentionSimulator/retentionSimulator.js';
import { navigationItems } from './data/navigation.js';
import { initScrollSpy } from './features/scrollSpy.js';
import { initMobileMenu } from './features/mobileMenu.js';
import { initScrollProgress } from './features/scrollProgress.js';
import { initPointerGlow } from './features/pointerGlow.js';
import { initCountUp } from './features/countUp.js';
import { initRevealOnScroll } from './features/revealOnScroll.js';
import { requireElement } from './utils/dom.js';

function initHeader() {
  const headerRoot = requireElement('#header-root');
  const { navLinks, menuToggle, drawer, progressBar } = renderHeader(headerRoot);

  const sectionIds = navigationItems.map((item) => item.id);
  initScrollSpy(navLinks, sectionIds);
  initMobileMenu(menuToggle, drawer);
  initScrollProgress(progressBar);
}

function initHero() {
  const heroSection = requireElement('#hero');
  const { heroElement } = renderHero(heroSection);
  initPointerGlow(heroElement);
}

function initMetricsBand() {
  const metricsSection = requireElement('#metrics');
  const { countUpTargets, revealTargets } = renderMetricsBand(metricsSection);
  initCountUp(countUpTargets);
  initRevealOnScroll(revealTargets);
}

function initSkillsGrid() {
  const skillsSection = requireElement('#skills');
  const { openSkillModal } = createSkillModal();
  renderSkillsGrid(skillsSection, { onOpenSkill: openSkillModal });
}

function initExperienceAccordion() {
  const experienceSection = requireElement('#experience');
  const { revealTargets } = renderExperienceAccordion(experienceSection);
  initRevealOnScroll(revealTargets);
}

function initCaseCards() {
  const casesSection = requireElement('#cases');
  const { revealTargets } = renderCaseCards(casesSection);
  initRevealOnScroll(revealTargets);
}

function initRetentionSimulator() {
  const simulatorSection = requireElement('#retention-simulator');
  const { revealTargets } = renderRetentionSimulator(simulatorSection);
  initRevealOnScroll(revealTargets);
}

function initPortfolio() {
  initHeader();
  initHero();
  initMetricsBand();
  initSkillsGrid();
  initExperienceAccordion();
  initCaseCards();
  initRetentionSimulator();
}

document.addEventListener('DOMContentLoaded', initPortfolio);
