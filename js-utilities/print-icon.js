/*
  import {print_icon} from '@massimo-cassandro/m-utilities/js-utilities/print-icon';

  // uso base
  print_icon({
    id          : 'icona_id',
    svg_class   : 'icona',
    icon_file   : app_data.icons
  })

*/
export function print_icon(params) {

  const default_params = {
    id          : '', // o array di id
    svg_class   : 'icona',
    icon_file   : '/imgs/icone.svg', // app_data.icons
    title       : '',
    descr       : '',
    aria_hidden : false, // forzata su false se descr o title sono definiti
  };

  params = {...default_params, ...params};

  if(!Array.isArray(params.id)) {
    params.id = [params.id];
  }

  // se c'è una sola icona di tipo line o fill, la classe `line-icon` o `fill-icon`
  // viene aggiunta direttamente all'elemento svg
  if(params.id.length === 1) {

    if(/-line$/.test(params.id)) {
      params.svg_class = `${params.svg_class} line-icon`.trim();

    } else if (/-fill$/.test(params.id)) {
      params.svg_class = `${params.svg_class} fill-icon`.trim();
    }
  }
  let base_id = params.id.join('') + Number(Math.round(Math.random() * Date.now())).toString(36),
    aria_ids = [],
    descr_unique_id = null,
    descr = '';

  if (params.descr) {
    params.aria_hidden = false;
    descr_unique_id = 'd-' + base_id;
    aria_ids.push(descr_unique_id);

    descr = `<desc id="${descr_unique_id}">${params.descr}</desc>`;
  }

  let title_unique_id = null,
    title = '';
  if(params.title) {
    params.aria_hidden = false;
    title_unique_id = 't-' + base_id;
    aria_ids.push(title_unique_id);

    title = `<title id="${title_unique_id}">${params.title}</title>`;
  }

  let svg_attrs = ['role="img"'];
  if(params.svg_class) {
    svg_attrs.push(`class="${params.svg_class}"`);
  }
  if(params.aria_hidden) {
    svg_attrs.push('aria-hidden="true"');
  }
  if(aria_ids.length) {
    svg_attrs.push(`aria-labelledby="${aria_ids.join(' ')}"`);
  }

  return `<svg ${svg_attrs.join(' ')}>
    ${title}${descr}
    ${params.id.map(id => {
      let use_class = '';

      // se si tratta di un'icona composta, ad pgni elelemtno use viene aggiunta
      // una classe corrispondente all'id e, se necessario, una tra `line-icon` e `fill-icon`
      if(params.id.length > 1) {

        use_class = id;

        if(/-line$/i.test(id)) {
          use_class += ' line-icon';

        } else if (/-fill$/i.test(id)) {
          use_class += ' fill-icon';
        }
      }
      use_class = use_class? ` class="${use_class}"` : '';

      return `<use xlink:href="${params.icon_file}#${id}"${use_class}></use>`;
    }).join('')}</svg>`;
}
