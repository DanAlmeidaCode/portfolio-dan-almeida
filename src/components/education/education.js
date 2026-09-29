import { createElement } from '../../utils/dom.js';
import { profile } from '../../data/profile.js';
import { recommendations } from '../../data/recommendations.js';

function buildEducationBlock() {
  return createElement('div', { className: 'education-block reveal' }, [
    createElement('h3', {}, 'Formação acadêmica'),
    createElement('p', { className: 'education-block__course' }, profile.education.course),
    createElement('p', { className: 'text-secondary' }, [
      profile.education.institution,
      ' · ',
      profile.education.period,
    ]),
  ]);
}

function buildCertificationsBlock() {
  return createElement('div', { className: 'education-block reveal' }, [
    createElement('h3', {}, 'Certificações'),
    createElement(
      'ul',
      { className: 'certifications-list' },
      profile.certifications.map((certification) => createElement('li', {}, certification)),
    ),
  ]);
}

function buildRecommendationsBlock() {
  const content =
    recommendations.length === 0
      ? createElement('p', { className: 'recommendations-empty text-secondary' }, [
          'Recomendações em breve. ',
          createElement('span', { className: 'text-mono' }, 'TODO(dan): coletar recomendações de gestores/colegas.'),
        ])
      : createElement(
          'ul',
          { className: 'recommendations-list' },
          recommendations.map((recommendation) => createElement('li', {}, recommendation.text)),
        );

  return createElement('div', { className: 'education-block reveal' }, [
    createElement('h3', {}, 'Recomendações'),
    content,
  ]);
}

export function renderEducation(container) {
  const sectionContent = createElement('div', { className: 'container' }, [
    createElement('div', { className: 'section-heading reveal' }, [
      createElement('span', { className: 'section-eyebrow' }, 'Formação'),
      createElement('h2', {}, 'Formação, certificações e recomendações'),
    ]),
    createElement('div', { className: 'education-grid' }, [
      buildEducationBlock(),
      buildCertificationsBlock(),
      buildRecommendationsBlock(),
    ]),
  ]);

  container.replaceChildren(sectionContent);

  return { revealTargets: Array.from(sectionContent.querySelectorAll('.reveal')) };
}
