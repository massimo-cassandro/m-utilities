// std sƒ macro per tabelle molti a uno

export  function aggiungi_riga(callback = null, init_func = null) {

  /*
    callback  : eventuale callback specifico
                (riceve com argomento l'elemento '.macro-container')

    init_func : funzione di init globale per l'elemento appena aggiunto
                (riceve come argomento l'elemento aggiunto)
  */

  const add_btn = document.querySelector('.macro-riga-add');

  add_btn.addEventListener('click', () => {
    let macro_container  = add_btn.closest('.macro-wrapper').querySelector('.macro-container'),
      macro_template     = macro_container.dataset.template,
      indice_righe       = macro_container.querySelectorAll('.macro-riga').length;

    macro_container.insertAdjacentHTML('beforeend',
      macro_template.replace(/__indice\d?__/g, indice_righe++));

    if(callback && typeof callback === 'function' ) {
      callback( macro_container );
    }
    if(init_func && typeof init_func === 'function' ) {
      init_func(macro_container.querySelector('.macro-riga:last'));
    }

  }, false);

}

export function elimina_riga( callback = null) {
  const remove_btn = document.querySelector('.macro-riga-del');

  remove_btn.addEventListener('click', () => {
    let macro_container  = remove_btn.closest('.macro-container');

    remove_btn.closets('.macro-riga').remove();

    if(callback && typeof callback === 'function' ) {
      callback( macro_container );
    }

  }, false);

}
