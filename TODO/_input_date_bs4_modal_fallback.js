/*
  Da rivedere per problemi di visualizzazione dei select nello spazio di un input
  (utilizzare modal?)

  se presenti più campi nella stessa pagina, i valori options personalizzati vengono
  erroneamente condivisi da tutti i campi

*/


import {inputDateSupport} from 'm-utilities/js-utilities/_input_date_support';

/*
  Se date non è supportato, la funzione trasforma il campo in un hidden

  eventuali attributi required, min, max ecc. vanno verificati manualmente nel submit
  così come la validità della data (per eventuali date inesistenti)

  min_year e max_year indicano il range degli anni da mostrare nel select relativo

  possono essere impostati anche direttamente nel campo originale tramite gli attributi
  `data-fbck-min-year` e `data-fbck-max-year`
  (prevalgono su quelli impostati al momento di istanziare la classe)
*/
export class inputDateRawFallback {
  'use strict';

  constructor(options) {
    if( inputDateSupport() ) {

      document.querySelectorAll('[type=date]').forEach(date_field => {

        date_field.setAttribute('type', 'hidden');
        date_field.required = false;

        const mesi = {
          '01' : 'gen',
          '02' : 'feb',
          '03' : 'mar',
          '04' : 'apr',
          '05' : 'mag',
          '06' : 'giu',
          '07' : 'lug',
          '08' : 'ago',
          '09' : 'set',
          '10' : 'ott',
          '11' : 'nov',
          '12' : 'dic'
        };

        let [anno, mese, giorno] = date_field.value.split('-'),
          anno_oggi = new Date().getFullYear(),
          default_options = {
            min_year: anno_oggi - 80,
            max_year: anno_oggi + 1
          },

          options_giorni = '<option value=""></option>',
          options_mesi = '<option value=""></option>',
          options_anni = '<option value=""></option>';

        options = Object.assign({}, default_options, options);

        if(date_field.dataset.fbckMinYear) {
          options.min_year = date_field.dataset.fbckMinYear;
        }
        if(date_field.dataset.fbckMaxYear) {
          options.max_year = date_field.dataset.fbckMaxYear;
        }



        for(let i = 1; i <= 31; i++) {
          let g = (i < 10? '0' : '') + i;
          options_giorni += `<option value="${g}"${g === giorno? ' selected' : ''}>${i}</option>`;
        }
        for(let i in mesi) {
          options_mesi += `<option value="${i}"${i === mese? ' selected' : ''}>${mesi[i]}</option>`;
        }
        for(let i = options.max_year; i >= options.min_year; i--) {
          options_anni += `<option value="${i}"${i === +anno? ' selected' : ''}>${i}</option>`;
        }

        date_field.insertAdjacentHTML('beforebegin',
          `<div class="date-fallback input-group">
            <select class="form-control custom-select date-fallback-gg" aria-label="Giorno">
              ${options_giorni}
            </select>
            <select class="form-control custom-select date-fallback-mm" aria-label="Mese">
              ${options_mesi}
            </select>
            <select class="form-control custom-select date-fallback-aa" aria-label="Anno">
              ${options_anni}
            </select>
          </div>`
        );



        // let data_nascita = $('#dataNascita').val(),
        //   data_nascita_valida = date_utilities.date_from_iso(data_nascita) !== false;

        // const dateRegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        // if(!hasInputDateSupport &&(!dateRegExp.test(data_nascita) || !data_nascita_valida)) {
        //   mAlert({
        //     type  : 'error',
        //     title : 'Data di nascita non valida',
        //     mes   : null
        //   });
        //   return false;
        // }
      }); // end foreach
    } // end if input suppport
  } // end constructor
}
