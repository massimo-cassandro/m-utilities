import {inputDateSupport, inputTimeSupport, inputDatetimeSupport} from '@massimo-cassandro/m-utilities/js-utilities/_input_date_support';

/*
  Datetime fallback utilizzando una finestra modal BS4

  Utilizzo:

  if( !inputDatetimeSupport() && inputDateSupport() && inputTimeSupport() ) {
    new datetimeModalFallback( {
      container_class: '',
      date_display_class: 'form-control text-truncate font-weight-normal',
      btn_class: 'btn btn-secondary',
      locale_opts: {...}
    });
  }

  In cui:
    * container_class    : classe aggiuntiva da associare all'input-group contenitore,
    * date_display_class : classi da assegnare allo span in cui viene mostrata la data,
    * btn_class          : classe da assegnare all'elemento button
    * locale_opts        : impostazioni intl (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)

  Se datetime non è supportato, la funzione trasforma il campo in un hidden
  e crea un box per visualizzare la data con un pulsante per la modifica.

  Eventuali attributi min, max e step vengono interpretati e utilizzati nei campi
  di fallback.
  il valore step è utilizzato solo per il campo time

  Si possono collegare due campi datetime tra loro in modo che il valore di uno
  imposti minimo o massimo dell'altro.
  Per questo scopo va utilizzato il modulo `_date_in_sequenza.js`, e quindi
  impostare:
    Sul datetime iniziale → data-max = id campo data finale
    Sul datetime finale   → data-min = id campo data iniziale

  Se il campo data ora è obbligatorio, è necessario effettuare un controllo ad hoc
  al momento del submit

  Richiede la presenza dei moduli modal e alert di Bootstrap

  TODO: personalizzazione intero markup
  TODO: gestione required
*/
export class datetimeModalFallback {

  constructor(options) {
    if( !inputDatetimeSupport() && inputDateSupport() && inputTimeSupport() ) {
      const default_options = {
          container_class: '',
          date_display_class: 'form-control text-truncate font-weight-normal',
          btn_class: 'btn btn-secondary',
          locale_opts: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour12: false,
            hour:'2-digit',
            minute:'2-digit'
          }
        },

        modal = `<div class="modal fade" id="modalDatetimeFallback" tabindex="-1" role="dialog" aria-labelledby="modalDatetimeFallbackTitle" aria-hidden="true">
          <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <div class="modal-title" id="modalDatetimeFallbackTitle">Imposta data &amp; ora</div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Chiudi">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div id="modalDatetimeFallbackInfo"></div>

                <div class="form-group">
                  <label for="modal-datetime-fallback-date">Data</label>
                  <input class="form-control" id="modal-datetime-fallback-date" value="" type="date">
                </div>

                <div class="form-group">
                  <label for="modal-datetime-fallback-time">Ora</label>
                  <input class="form-control" id="modal-datetime-fallback-time" value="" type="time">
                </div>

              </div>
              <div class="modal-footer">
              <button id="modal-datetime-set-date" type="button" class="btn btn-primary">Imposta data/ora</button>
            </div>
            </div>
          </div>
        </div>`;

      options = Object.assign({}, default_options, options || {});

      document.body.insertAdjacentHTML('beforeend', modal);

      const modalDatetimeFallback = document.querySelector('#modalDatetimeFallback'),
        date_fallback_field = modalDatetimeFallback.querySelector('#modal-datetime-fallback-date'),
        time_fallback_field = modalDatetimeFallback.querySelector('#modal-datetime-fallback-time'),
        modalDatetimeFallbackInfo = modalDatetimeFallback.querySelector('#modalDatetimeFallbackInfo');


      document.querySelectorAll('[type=datetime-local]').forEach(datetime_field => {
        let fallback_container_id = datetime_field.id + '-dt-fallback-text',
          fallback_trigger_id = datetime_field.id + '-dt-fallback-trigger';

        datetime_field.setAttribute('type', 'hidden');
        datetime_field.required = false;

        if(datetime_field.step) {
          time_fallback_field.step = datetime_field.step;
        }

        let fallback_date = (datetime_field.value?
          new Date(datetime_field.value).toLocaleString('it-IT', options.locale_opts) :
          '&mdash;'
        );

        datetime_field.insertAdjacentHTML('beforebegin',
          `<div class="datetime-fallback input-group ${options.container_class}">
            <span id="${fallback_container_id}" class="${options.date_display_class}"
              title="${fallback_date}">
              ${fallback_date}
            </span>
            <div class="input-group-append">
              <button id="${fallback_trigger_id}" class="${options.btn_class}" type="button"
                data-field="${datetime_field.id}" data-text="${fallback_container_id}">Imposta</button>
            </div>
          </div>`
        );

        let fallback_trigger = document.getElementById(fallback_trigger_id);
        // // altezza fallback uguale al pulsante
        // document.getElementById(fallback_container_id).parentElement.height =
        //   fallback_trigger.parentNode.offsetHeight;

        fallback_trigger.addEventListener('click', trigger => {
          let this_datetime = new Date(datetime_field.value);

          date_fallback_field.removeAttribute('min');
          date_fallback_field.removeAttribute('max');

          if(datetime_field.min) {
            try {
              let min_value = new Date(datetime_field.min);
              date_fallback_field.min =
                  min_value.getFullYear() + '-' +
                  String('00' + (min_value.getMonth() + 1)).slice(-2) + '-' +
                  String('00' + min_value.getDate()).slice(-2);

              modalDatetimeFallbackInfo.innerHTML = '<small>Min.: ' +
                min_value.toLocaleString('it-IT',options.locale_opts) + '</small>';

            } catch(e) {
              alert('Il valore dell\'attributo “min” non è corretto');
            }
          }
          if(datetime_field.max) {
            try {
              let max_value = new Date(datetime_field.max);

              date_fallback_field.max =
                max_value.getFullYear() + '-' +
                  String('00' + (max_value.getMonth() + 1)).slice(-2) + '-' +
                  String('00' + max_value.getDate()).slice(-2);

              modalDatetimeFallbackInfo.innerHTML = '<small>Max: ' +
                max_value.toLocaleString('it-IT', options.locale_opts) + '</small>';

            } catch(e) {
              alert('Il valore dell\'attributo “max” non è corretto');
            }
          }

          date_fallback_field.value = this_datetime.getFullYear() + '-' +
            ('00' + (this_datetime.getMonth() + 1)).slice(-2) + '-' +
            ('00' + this_datetime.getDate()).slice(-2);

          time_fallback_field.value = this_datetime.toLocaleString('it-IT', {
            hour12: false,
            hour:'2-digit',
            minute:'2-digit'
          });

          modalDatetimeFallback.dataset.field = trigger.target.dataset.field;
          modalDatetimeFallback.dataset.text = trigger.target.dataset.text;
          modalDatetimeFallback.dataset.min = datetime_field.min || '';
          modalDatetimeFallback.dataset.max = datetime_field.max || '';
          $(modalDatetimeFallback).modal('show');
        }, false);


        modalDatetimeFallback.querySelector('#modal-datetime-set-date').addEventListener('click', () => {

          let alert = modalDatetimeFallback.querySelector('.alert'),
            nuova_data = date_fallback_field.value + 'T' + time_fallback_field.value;

          if(alert) {
            alert.remove();
          }

          const add_alert = mes => {
            modalDatetimeFallbackInfo
              .insertAdjacentHTML('beforebegin',
                '<div class="alert alert-dismissible alert-danger" role="alert">'+
                '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Chiudi</span></button>'+
                mes +
                '</div>'
              );
          };


          if(!date_fallback_field.value || !time_fallback_field.value) {

            add_alert('Devi inserire data e ora');

          } else if( modalDatetimeFallback.querySelectorAll(':invalid').length ) {

            modalDatetimeFallback.querySelector(':invalid').reportValidity();

          } else {
            let err_min = false, err_max = false,
              min_value = modalDatetimeFallback.dataset.min? new Date(modalDatetimeFallback.dataset.min) : null,
              max_value = modalDatetimeFallback.dataset.max? new Date(modalDatetimeFallback.dataset.max) : null,
              new_date = new Date(nuova_data);

            if( min_value && new_date.getTime() < min_value.getTime() ) {
              err_min = true;
            }

            if(max_value && new_date.getTime() > max_value.getTime() ) {
              err_max = true;
            }

            if(err_min || err_max) {
              let err_mes;
              if(err_min && err_max) {
                err_mes = 'Data e ora devono essere comprese tra ' +
                  '<strong class="text-nowrap">' + min_value.toLocaleString('it-IT', options.locale_opts) + '</strong>' +
                  ' e ' +
                  '<strong class="text-nowrap">' + max_value.toLocaleString('it-IT', options.locale_opts) + '</strong>';

              } else if(err_min) {
                err_mes = 'Data e ora non devono essere precedenti a ' +
                  '<strong class="text-nowrap">' + min_value.toLocaleString('it-IT', options.locale_opts) + '</strong>';

              } else if(err_max) {
                err_mes = 'Data e ora non devono essere successive a ' +
                  '<strong class="text-nowrap">' + max_value.toLocaleString('it-IT', options.locale_opts) + '</strong>';
              }

              add_alert(err_mes);

            } else {

              document.getElementById(modalDatetimeFallback.dataset.field).value = nuova_data;
              document.getElementById(modalDatetimeFallback.dataset.field)
                .dispatchEvent(new Event('change'));

              fallback_date = new Date(nuova_data).toLocaleString('it-IT', options.locale_opts);
              let fallback_text = document.getElementById(modalDatetimeFallback.dataset.text);
              fallback_text.innerText = fallback_date;
              fallback_text.title = fallback_date;

              $('#modalDatetimeFallback').modal('hide');
            }
          }
        }, false);
      }); // end foreach
    } // end if input types support
  } // end constructor
}
