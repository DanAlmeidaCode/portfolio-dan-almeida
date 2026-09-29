// Atualiza a barra de progresso de leitura no header conforme o usuário rola a página.

function calculateScrollPercentage() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) {
    return 0;
  }
  return Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100));
}

export function initScrollProgress(progressBarElement) {
  let ticking = false;

  function updateProgressBar() {
    const percentage = calculateScrollPercentage();
    progressBarElement.style.setProperty('--progress', `${percentage}%`);
    progressBarElement.setAttribute('aria-valuenow', String(Math.round(percentage)));
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgressBar);
      ticking = true;
    }
  });

  updateProgressBar();
}
