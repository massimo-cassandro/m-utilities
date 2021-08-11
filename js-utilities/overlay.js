export  function overlay( container ) {

  container = container || document.body;
  let full_page = container === document.body;

  container.insertAdjacentHTML('beforeend',
    `<div class="${full_page? 'page-overlay' : 'div-overlay'}">` +
      '<div class="spinner-border" role="status">' +
        '<span class="sr-only">Caricamento...</span>' +
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
