export  function overlay( container ) {
  'use strict';

  container = container || document.body;
  let full_page = container === document.body;

  container.insertAdjacentHTML('beforeend',
    `<div class="${full_page? 'page_overlay' : 'div_overlay'} d-flex justify-content-center align-items-center">` +
      '<div class="spinner-border" role="status">' +
        '<span class="sr-only">Caricamento...</span>' +
      '</div>' +
    '</div>'
  );
}

export  function remove_overlay( container ) {
  'use strict';

  container = container || document.body;
  let full_page = container === document.body;
  container.querySelector(`.${full_page? 'page_overlay' : 'div_overlay'}`).remove();

}
