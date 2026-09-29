import { createElement } from '../../utils/dom.js';
import { profile } from '../../data/profile.js';
import { metrics } from '../../data/metrics.js';
import { contacts } from '../../data/contacts.js';
import { buildSparkline } from './sparkline.js';

/** Substitui a foto por um placeholder visual quando o arquivo ainda não existe. */
function handlePhotoError(event) {
  const image = event.target;
  image.replaceWith(
    createElement(
      'div',
      {
        className: 'hero__photo hero__photo--placeholder',
        style: `width:${profile.photo.width}px;height:${profile.photo.height}px`,
        role: 'img',
        'aria-label': profile.photo.alt,
      },
      createElement('span', { 'aria-hidden': 'true' }, 'foto em breve'),
    ),
  );
}

function buildPhoto() {
  return createElement('img', {
    className: 'hero__photo',
    src: profile.photo.src,
    width: profile.photo.width,
    height: profile.photo.height,
    alt: profile.photo.alt,
    loading: 'eager',
    fetchpriority: 'high',
    onError: handlePhotoError,
  });
}

function buildPerformanceCard() {
  const values = metrics.map((metric) => metric.value);

  return createElement('div', { className: 'hero__performance-card', 'aria-hidden': 'false' }, [
    createElement('p', { className: 'hero__performance-title text-mono' }, profile.performanceSummaryCard.title),
    buildSparkline(values),
    createElement('p', { className: 'hero__performance-caption text-secondary' }, profile.performanceSummaryCard.caption),
  ]);
}

export function renderHero(container) {
  const heroContent = createElement('div', { className: 'container hero__grid' }, [
    createElement('div', { className: 'hero__copy' }, [
      createElement('p', { className: 'section-eyebrow' }, profile.role),
      createElement('h1', { className: 'hero__name' }, profile.name),
      createElement('p', { className: 'hero__value-proposition' }, profile.valueProposition),
      createElement('div', { className: 'hero__cta-group' }, [
        createElement('a', { href: '#metrics', className: 'button button--primary' }, 'Ver métricas'),
        createElement(
          'a',
          { href: `mailto:${contacts.email}`, className: 'button button--secondary' },
          'Falar comigo',
        ),
      ]),
    ]),
    createElement('div', { className: 'hero__visual' }, [buildPhoto(), buildPerformanceCard()]),
  ]);

  const heroElement = createElement('div', { className: 'hero', id: 'hero-glow' }, heroContent);

  container.replaceChildren(heroElement);

  return { heroElement };
}
