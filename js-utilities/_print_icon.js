
export function print_icon(icon_id, svg_class='icona') {
  let icon_file = $('.appdata').data('d').i;
  return `<svg${svg_class? ` class="${svg_class}"` : ''} role="img">
    <use xlink:href="${icon_file}#${icon_id}" class="${icon_id}"></use>
  </svg>`;
}
