/*
  Datetime fallback utilizzando una finestra modal BS4

  Utilizzo:

  if( !inputDatetimeSupport() ) {
    datetimeModalFallback( datetime_field );
  }

  In cui;

    * inputDatetimeSupport() è il modulo di check del supporto datetime
      (in _input_date_support.js).
      Si dà per scontato il supporto dei campi date e time "semplici"
    * datetime_field è il campo datetime del form (dom element)

  Se datetime non è supportato, la funzione trasforma il campo in un hidden
  e crea un box per visualizzare la data con un pulsante per la modifica.

  Se il campo data ora è obbligatorio, è necessario effettuare un controllo ad hoc
  al momento del submit

  Richiede la presenza dei moduli modal e alert di Bootstrap

  TODO: personalizzazione del markup

*/
export  function datetimeModalFallback(datetime_field) {
  'use strict';

  let localeOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour12: false,
      hour:'2-digit',
      minute:'2-digit'
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
    </div>`,

    fallback_container_id = datetime_field.id + '-dt-fallback-show',
    fallback_trigger_id = datetime_field.id + '-dt-fallback-trigger';

  datetime_field.setAttribute('type', 'hidden');
  datetime_field.required = false;

  document.body.insertAdjacentHTML('beforeend', modal);
  const modalDatetimeFallback = document.querySelector('#modalDatetimeFallback'),
    date_fallback_field = modalDatetimeFallback.querySelector('#modal-datetime-fallback-date'),
    time_fallback_field = modalDatetimeFallback.querySelector('#modal-datetime-fallback-time');

  datetime_field.insertAdjacentHTML('beforebegin',
    '<div class="input-group mb-3">'+
      `<span id="${fallback_container_id}" class="form-control bg-transparent text-white text-truncate text-monospace font-weight-normal">` +
        new Date(datetime_field.value).toLocaleString('it-IT', localeOptions) +
      '</span>'+
      '<div class="input-group-append">'+
        `<button id="${fallback_trigger_id}" class="btn btn-secondary" type="button">Imposta</button>`+
      '</div>' +
    '</div>'
  );

  document.getElementById(fallback_trigger_id).addEventListener('click', () => {
    let data = new Date(datetime_field.value);

    date_fallback_field.value = data.getFullYear() + '-' +
      ('00' + (data.getMonth() + 1)).slice(-2) + '-' +
      ('00' + data.getDate()).slice(-2);

    time_fallback_field.value = data.toLocaleString('it-IT', {
        hour12: false,
        hour:'2-digit',
        minute:'2-digit'
      });

    $('#modalDatetimeFallback').modal('show');
  }, false);


  modalDatetimeFallback.querySelector('#modal-datetime-set-date').addEventListener('click', () => {

    if(date_fallback_field.value && time_fallback_field.value) {
      let nuova_data = date_fallback_field.value + 'T' + time_fallback_field.value;

      datetime_field.value = nuova_data;

      document.getElementById(fallback_container_id)
        .innerText = new Date(nuova_data).toLocaleString('it-IT', localeOptions);

      $('#modalDatetimeFallback').modal('hide');

    } else {

      modalDatetimeFallback.querySelector('#modalDatetimeFallbackInfo')
        .insertAdjacentHTML('beforebegin',
          '<div class="alert alert-dismissible alert-danger" role="alert">'+
          '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Chiudi</span></button>'+
          'Devi inserire data e ora'+
          '</div>'
        );
    }
  }, false)

}
