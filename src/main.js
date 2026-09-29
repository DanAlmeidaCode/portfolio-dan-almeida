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

function initPortfolio() {
  // Componentes serão adicionados aqui conforme forem implementados.
}

document.addEventListener('DOMContentLoaded', initPortfolio);
