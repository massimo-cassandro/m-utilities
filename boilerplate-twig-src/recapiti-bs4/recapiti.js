import {set_macro_listeners} from '../std-macro/sf-macro';
import {mAlert} from '../../mAlert-bs4/_mAlert';

export default function () {

  const check_recapito = (riga) => {
    const macro_container  = riga.closest('.sf-macro-container'),
      campo_princ = riga.querySelector('.rec-princ'),
      campo_tipo = riga.querySelector('.rec-tipo'),
      campo_recapito = riga.querySelector('.rec-recapito'),
      tipo_value = +campo_tipo.options[campo_tipo.selectedIndex].value,
      tipo_text = campo_tipo.options[campo_tipo.selectedIndex].text;

    // righe con lo stesso tipo e con il flag principale
    let righe = [];
    macro_container.querySelectorAll(`.rec-tipo option[value="${tipo_value}"]:checked`)
      .forEach(item => {
        let r = item.closest('.sf-macro-riga');
        if( r.querySelector('.rec-princ:checked') ) {
          righe.push(r);
        }
      });

    if(campo_princ.checked && righe.length > 1 ) {
      mAlert({
        type  : 'confirm',
        title : 'Vuoi impostare il recapito selezionato come “Principale”?',
        mes   : `Puoi impostare come <strong>Principale</strong> un solo recapito per tipologia.<br>
          Se confermi questa scelta, la casella “Principale” verrà automaticamente disattivata
          negli gli altri recapiti con la tipologia “${tipo_text}”`,
        ok_btn_text: 'Procedi',
        cancel_btn_text: 'Annulla',
        callback: function(esito) {
          if(esito) {
            righe.forEach(item => {
              if(item !== riga) {
                item.querySelector('.rec-princ').checked = false;
              }
            });
          } else {
            campo_princ.checked = false;
          }
        }
        //timer: 4000, // ms
        //title_class: 'text-success',
        //ok_btn_class: 'btn-success',
        //cancel_btn_class: 'btn-outline-warning'
      });
    }

    // aggiunta attributi html per tipo campo
    switch (tipo_value) {
      case 1: // email
      case 5: // pec
        campo_recapito.type = 'email';
        campo_recapito.removeAttribute('autocomplete');
        campo_recapito.removeAttribute('pattern');
        campo_recapito.removeAttribute('title');
        break;

      case 2: // tel fisso
      case 4: // fax
        campo_recapito.type = 'tel';
        campo_recapito.setAttribute('autocomplete', 'tel');
        campo_recapito.setAttribute('pattern', '[0-9\-\.\/ ]*');
        campo_recapito.setAttribute('title', 'Sono ammessi solo numeri, spazi, trattini, punti e barre');
        break;

      case 3: // cellulare
        campo_recapito.type = 'tel';
        campo_recapito.setAttribute('autocomplete', 'tel');
        campo_recapito.setAttribute('title', 'Sono ammessi solo numeri, spazi, trattini, punti e barre');
        break;
    }

  };

  document.querySelectorAll('.fset_recapiti').forEach(fset_recapiti => {

    set_macro_listeners({macro_wrapper: fset_recapiti});

    fset_recapiti.addEventListener('click', e => {
      if(e.target.classList.contains('rec-princ')) {
        check_recapito(e.target.closest('.sf-macro-riga'));
      }
    });

    fset_recapiti.addEventListener('change', e => {
      if(e.target.classList.contains('rec-tipo')) {
        check_recapito(e.target.closest('.sf-macro-riga'));
      }
    });

  });

  // start
  document.querySelectorAll('.fset_recapiti .sf-macro-riga').forEach(item => {
    check_recapito(item);
  });

}
