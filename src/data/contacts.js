// Dados de contato. Fonte de verdade única — nunca duplicar em componentes.

export const contacts = {
  email: 'danalmeida.consultor@gmail.com',
  whatsapp: {
    display: '+55 77 98154-0303',
    // Formato E.164 para links wa.me
    href: 'https://wa.me/5577981540303',
  },
  linkedin: {
    display: 'linkedin.com/in/danalmeidacs',
    href: 'https://linkedin.com/in/danalmeidacs',
  },
  github: {
    display: 'github.com/DanAlmeidaCode',
    href: 'https://github.com/DanAlmeidaCode',
  },
  cv: {
    // TODO(dan): substituir por PDF real quando disponível. Por ora aponta
    // para o texto extraído do currículo (ver README, seção Pendências).
    href: '/cv/curriculo-dan-almeida.txt',
  },
};
