// NB: versione mantenuta per compatibilità
// utilizzare js-utilities/print-icon.js


export function print_icon(icon_id, svg_class='icona', icon_file) {
  if(/-line$/.test(icon_id)) {
    svg_class = `${svg_class} line-icon`.trim();
  }
  return `<svg${svg_class? ` class="${svg_class}"` : ''} role="img">
    <use xlink:href="${icon_file}#${icon_id}" class="${icon_id}"></use>
  </svg>`;
}
