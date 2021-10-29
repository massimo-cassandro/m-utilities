// import {overlay, remove_overlay} from '@massimo-cassandro/m-utilities/js-utilities/overlay';
export  function overlay( container ) {

  container = container || document.body;
  let full_page = container === document.body;

  container.insertAdjacentHTML('beforeend',
    `<div class="${full_page? 'page-overlay' : 'div-overlay'}">` +
      '<div class="spinner-border" role="status">' +
        '<span class="sr-only visually-hidden">Caricamento...</span>' +
      '</div>' +
    '</div>'
  );
}

export  function remove_overlay( container ) {

  container = container || document.body;
  let full_page = container === document.body;
  let overlay = container.querySelector(`.${full_page? 'page-overlay' : 'div-overlay'}`);
  if(overlay) {
    overlay.remove();
  }

}
