const SVG_NS = 'http://www.w3.org/2000/svg';
const SPARKLINE_WIDTH = 200;
const SPARKLINE_HEIGHT = 56;
const POINT_PADDING = 6;

function toCoordinates(values) {
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;
  const step = (SPARKLINE_WIDTH - POINT_PADDING * 2) / (values.length - 1);

  return values.map((value, index) => {
    const x = POINT_PADDING + step * index;
    const normalized = (value - minValue) / range;
    const y = SPARKLINE_HEIGHT - POINT_PADDING - normalized * (SPARKLINE_HEIGHT - POINT_PADDING * 2);
    return { x, y };
  });
}

/** Constrói um sparkline SVG simples a partir de uma lista de valores numéricos. */
export function buildSparkline(values) {
  if (!Array.isArray(values) || values.length < 2) {
    const emptySvg = document.createElementNS(SVG_NS, 'svg');
    emptySvg.setAttribute('viewBox', `0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`);
    emptySvg.setAttribute('role', 'img');
    emptySvg.setAttribute('aria-label', 'Sem dados suficientes para o gráfico');
    return emptySvg;
  }

  const coordinates = toCoordinates(values);
  const pathData = coordinates
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`);
  svg.setAttribute('class', 'sparkline');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `Tendência das métricas de carreira: ${values.join(', ')}`);

  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', pathData);
  path.setAttribute('class', 'sparkline__line');
  svg.appendChild(path);

  coordinates.forEach((point) => {
    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('cx', point.x);
    dot.setAttribute('cy', point.y);
    dot.setAttribute('r', 3);
    dot.setAttribute('class', 'sparkline__dot');
    svg.appendChild(dot);
  });

  return svg;
}
