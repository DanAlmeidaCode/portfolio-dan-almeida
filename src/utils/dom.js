// Pequenos helpers de DOM para manter os componentes legíveis e sem duplicação.

/**
 * Cria um elemento com atributos e filhos, evitando repetição de
 * document.createElement + setAttribute espalhada pelos componentes.
 */
export function createElement(tagName, attributes = {}, children = []) {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === undefined || value === false) {
      return;
    }
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  const childList = Array.isArray(children) ? children : [children];
  childList.forEach((child) => appendChild(element, child));

  return element;
}

function appendChild(parent, child) {
  if (child === null || child === undefined || child === false) {
    return;
  }
  if (typeof child === 'string' || typeof child === 'number') {
    parent.appendChild(document.createTextNode(String(child)));
  } else {
    parent.appendChild(child);
  }
}

/** Busca obrigatória de um elemento; lança erro cedo se o seletor não existir. */
export function requireElement(selector, root = document) {
  const element = root.querySelector(selector);
  if (!element) {
    throw new Error(`Elemento obrigatório não encontrado: ${selector}`);
  }
  return element;
}
