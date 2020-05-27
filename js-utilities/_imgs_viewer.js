import {escapeHTML} from './_escapeHTML';

export  function img_viewer(params) {
  'use strict';

  window.mUtilities = window.mUtilities || {};
  window.mUtilities.viewer = window.mUtilities.viewer || '/viewer';
  /*
    img è un oggetto nella forma
      {
        id: 20,
        width: 800,
        height: 800,
        mime: "image/jpeg",
        size: 88195,
      }

    bbs è un array di media queries e dimensioni (dal più grande al più piccolo):
    l'ultimo elemento (con mq== null) rappresenta le dimensioni dell'immagine base

    le dimensioni sono un array composto da base e altezza
      [
        {mq: '(min-width: 1199px)', bb:[255,255]},
        {mq: '...', bb:[210,210]},
        ...
        {mq: null, bb: [546,480]}
      ];

    l'ultimo deve avere mq = null
  */
  let default_params = {
      viewer: window.mUtilities.viewer,
      img: null,
      bbs: [],
      lazy: true,
      viewer_params: '', // eventuali parametri aggiunti per il viewer
      alt: '', // alt
      class: ''
    },
    p, // parametri elaborati
    base_src,

    // formati immagine prodotti dal viewer
    // in locale (mamp) non c'è webp (NB: nell'array va prima webp)
    img_fmt = ['8888', '8890'].indexOf(window.location.port) !== -1 ? ['pjpeg'] : ['webp', 'pjpeg'],

    sources = '',
    lazy_data_prefix;

  p = Object.assign({}, default_params, params);
  base_src = `${p.viewer}/${p.img.id}?` + (p.viewer_params ? `${p.viewer_params}&` : '');
  lazy_data_prefix = p.lazy? 'data-' : '';

  // elaborazione bbs e calcolo doppie densità (se l'immagine originale è abbastanza grande)
  p.bbs.forEach( item => {

    img_fmt.forEach( fmt => {
      let this_bb_wi = item.bb[0],
        this_bb_he = item.bb[1],
        this_base_src = base_src + `f=${fmt}&bb=`,
        this_src = '',
        doppia_densita = +p.img.width >= (this_bb_wi * 2) && +p.img.heigth >= (this_bb_he * 2);

      this_src = this_base_src + this_bb_wi + 'x' + this_bb_he;

      if(doppia_densita) {
        this_src += ' 1x, ' + this_base_src + (this_bb_wi * 2) + 'x' + (this_bb_he * 2) + ' 2x';
      }

      if(item.mq !== null || fmt === 'webp') {
        sources += `<source ${lazy_data_prefix}srcset="${this_src}"`;
        if(item.mq) sources += ` media="${item.mq}"`;
        if(fmt === 'webp') sources += ' type="image/webp"';
        sources += '>';

      } else {
        sources += `<img ${lazy_data_prefix}src="${this_base_src}${this_bb_wi}x${this_bb_he}"`;
        if(doppia_densita) sources += ` ${lazy_data_prefix}srcset="${this_src}"`;
        if(p.lazy) sources += ' loading="lazy"';
        if(p.class) sources += ` class="${p.class}"`;
        sources += ` alt="${escapeHTML(p.alt)}">`;
      }
    }); // end forEach fmt
  }); // end forEach bbs

  return `<picture>${sources}</picture>`;
}
