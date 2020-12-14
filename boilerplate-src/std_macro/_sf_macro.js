// std sƒ macro per tabelle molti a uno

// TODO add event delegation

export  function set_macro_listeners (context=document, add_callback = null, remove_callback = null) {

  /*
    context         : eventuale contesto (elemento DOM) in cui eseguire le procedure (default document)

    add_callback    : eventuale callback eseguito all'aggiunta di una riga
                      (riceve come argomenti l'elemento '.macro-container' e la riga aggiunta)

    remove_callback : eventuale callback eseguito all'eliminazione di una riga
                      (riceve come argomento l'elemento '.macro-container')
  */

  const rimuovi_riga_macro = (remove_btn, macro_container = null) => {

    remove_btn.closest('.macro-riga').remove();

    if(remove_callback && typeof remove_callback === 'function' ) {
      if(!macro_container) {
        let macro_container  = remove_btn.closest('.macro-container');
      }
      remove_callback( macro_container );
    }
  };

  context.querySelectorAll('.macro-riga-del').forEach( remove_btn => {
    remove_btn.addEventListener('click', () => {
      rimuovi_riga_macro(remove_btn);
    }, false);
  });


  context.querySelectorAll('.macro-riga-add').forEach(add_btn => {

    add_btn.addEventListener('click', () => {

      let macro_container  = add_btn.closest('.macro-wrapper').querySelector('.macro-container'),
        macro_template     = macro_container.dataset.template,
        indice_righe       = macro_container.querySelectorAll('.macro-riga').length;

      macro_container.insertAdjacentHTML('beforeend',
        macro_template.replace(/__indice\d?__/g, indice_righe++));

      const nuova_riga = macro_container.querySelector('.macro-riga:last-child');
      nuova_riga.querySelector('.macro-riga-del').addEventListener('click', e => {
        rimuovi_riga_macro(e.target, macro_container);
      }, false);


      if(add_callback && typeof add_callback === 'function' ) {
        add_callback( macro_container, nuova_riga );
      }

    }, false);

  });


  // aggiunta callback a righe preregistrate
  if(add_callback && typeof add_callback === 'function' ) {
    context.querySelectorAll('.macro-riga').forEach(riga => {
      add_callback( riga.closest('.macro-container'), riga );
    });
  }

}


