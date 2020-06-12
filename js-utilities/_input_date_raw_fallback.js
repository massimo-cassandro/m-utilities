import {inputDateSupport} from 'm-utilities/js-utilities/_input_date_support';
import {date_utilities} from 'm-utilities/js-utilities/_date-utilities';
/*
  Se date non è supportato, la funzione aggiunge pattern e placeholder

  necessario comunque effettuare la validazione della data nel submit
*/
export function inputDateRawFallback() {
  'use strict';

  if( !inputDateSupport() ) {

    const date_regexp_string = '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
      date_regexp = new RegExp(date_regexp_string);

    document.querySelectorAll('[type=date]').forEach(date_field => {

      date_field.setAttribute('type', 'text');
      date_field.placeholder = 'AAAA-MM-GG';
      date_field.pattern = date_regexp_string;

      date_field.addEventListener('change', () => {
        let data = date_field.value,
          data_valida = date_utilities.date_from_iso(data) !== false && date_regexp.test(data),
          customValidity = 'È necessario inserire la data nel formato AAAA-MM-GG. '+
            'Mese e giorno devono essere di due cifre (es. 01, 02... 10, 11...)';

        date_field.setCustomValidity(data_valida? '' : customValidity);
      }, false);

    }); // end foreach
  } // end if input suppport
}
