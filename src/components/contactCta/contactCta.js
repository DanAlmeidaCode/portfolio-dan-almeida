import { createElement } from '../../utils/dom.js';
import { contacts } from '../../data/contacts.js';
import { showToast } from '../../features/toast.js';

async function copyEmailToClipboard(email) {
  try {
    await navigator.clipboard.writeText(email);
    return true;
  } catch {
    return false;
  }
}

function buildEmailButton() {
  const button = createElement(
    'button',
    { type: 'button', className: 'contact-card contact-card--action' },
    [
      createElement('span', { className: 'contact-card__label' }, 'E-mail'),
      createElement('span', { className: 'contact-card__value text-mono' }, contacts.email),
      createElement('span', { className: 'text-secondary contact-card__hint' }, 'Clique para copiar'),
    ],
  );

  button.addEventListener('click', async () => {
    const copied = await copyEmailToClipboard(contacts.email);
    showToast(copied ? 'E-mail copiado para a área de transferência.' : 'Não foi possível copiar automaticamente.');
  });

  return button;
}

function buildLinkCard({ href, label, value }) {
  return createElement('a', { href, className: 'contact-card', target: '_blank', rel: 'noopener noreferrer' }, [
    createElement('span', { className: 'contact-card__label' }, label),
    createElement('span', { className: 'contact-card__value text-mono' }, value),
  ]);
}

export function renderContactCta(container) {
  const cards = [
    buildEmailButton(),
    buildLinkCard({ href: contacts.whatsapp.href, label: 'WhatsApp', value: contacts.whatsapp.display }),
    buildLinkCard({ href: contacts.linkedin.href, label: 'LinkedIn', value: contacts.linkedin.display }),
    buildLinkCard({ href: contacts.github.href, label: 'GitHub', value: contacts.github.display }),
    createElement(
      'a',
      { href: contacts.cv.href, className: 'contact-card contact-card--cv', download: true },
      [
        createElement('span', { className: 'contact-card__label' }, 'Currículo'),
        createElement('span', { className: 'contact-card__value text-mono' }, 'Baixar currículo'),
      ],
    ),
  ];

  const sectionContent = createElement('div', { className: 'container' }, [
    createElement('div', { className: 'section-heading reveal' }, [
      createElement('span', { className: 'section-eyebrow' }, 'Contato'),
      createElement('h2', {}, 'Vamos conversar'),
    ]),
    createElement('div', { className: 'contact-grid reveal' }, cards),
  ]);

  container.replaceChildren(sectionContent);

  return { revealTargets: [sectionContent.querySelector('.section-heading'), sectionContent.querySelector('.contact-grid')] };
}
