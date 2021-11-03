// add a new snackbar
// import { slideUp, slideDown } from '@massimo-cassandro/m-utilities/js-utilities/slide-up-down-toggle';
export function snackbar(message, status='std', icons_obj = null) {

  /*
    icons_obj: oggetto facoltativo di icone da aggiungere al messaggio
    la chiave di ogni icona corrisponde allo stato:
    {
      std: <icon_markup>, // null o non presente se non si vuole l'icona per questo stato
      error: ...
    }

    il css delle icone va gestito autonomamente
  */

  // lo status di default è std, ma può essere omesso o usare al suo posto 'info'
  // in generale, qualsiasi status diverso da success, warning, error o danger
  // viene impostato su 'std'

  if(status === 'danger') { // per allineamento con gli stati di BS
    status='error';
  }

  if(['error', 'warning', 'success'].indexOf(status) === -1) {
    status='std';
  }

  let snackbar_class = status !== 'std'? ` snackbar-${status}` : '',
    icon = '';

  if(icons_obj && icons_obj[status]) {
    icon = icons_obj[status];
  }

  if(!document.querySelector('.snackbars-container')) {
    document.body.insertAdjacentHTML('beforeend', '<div class="snackbars-container"></div>');
  }

  const container = document.querySelector('.snackbars-container');

  container.insertAdjacentHTML('beforeend',
    `<div class="snackbar${snackbar_class}">${icon} ${message}</div>`
  );
  let this_snackbar = container.querySelector('.snackbar:last-child');

  setTimeout(() => {
    this_snackbar.remove();
    if(!container.querySelectorAll('.snackbar')) {
      container.remove();
    }
  }, 5000);
}
