import {set_macro_listeners} from '@massimo-cassandro/m-utilities/boilerplate-src/std_macro/_sf_macro';
import {mAlert} from '@massimo-cassandro/m-utilities/mAlert-bs4/_mAlert';

export default function () {

  set_macro_listeners();

  document.querySelector('.macro-wrapper').addEventListener('click', e => {
    if(e.target.classList.contains('rec-princ')) {
      let riga = e.target.closest('.macro-riga'),
        tipo = riga.querySelector
    }
  });

}
