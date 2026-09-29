// Toast simples de confirmação, anunciado via aria-live para leitores de tela.

const TOAST_VISIBLE_DURATION_MS = 3000;

export function showToast(message) {
  const toastRoot = document.getElementById('toast-root');
  if (!toastRoot) {
    return;
  }

  toastRoot.textContent = message;
  toastRoot.classList.remove('visually-hidden');
  toastRoot.classList.add('toast');

  window.setTimeout(() => {
    toastRoot.classList.add('visually-hidden');
    toastRoot.classList.remove('toast');
  }, TOAST_VISIBLE_DURATION_MS);
}
