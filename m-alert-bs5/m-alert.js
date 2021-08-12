// bootstrap based alert system
// check marks: https://codepen.io/sat-ui/pen/BeWbeo

import Modal from 'bootstrap/js/dist/modal'; // needs commonjs rollup plugin


export default function mAlert(parameters = {}) {

  const errorBtnLabel = function () {
      var labels = ['Oh My God!', 'Mon Dieu!', 'Mein Gott!', 'Parbleu!',
        'Mizzica!', 'Meu Deus!', 'Damn!', '¡Maldición!', '¡Sangre del diablo!'];
      return labels[Math.floor( Math.random() * labels.length )];
    },
    /*
      `title_class`, `ok_btn_class` and `cancel_btn_class` classes must match the ones
      defined in the `$m-alert-status-classes` scss variable

      null values for `title_class` mean that no extra text classes are used for titles
      the other classes must be defined

      `bs_status_class` corresponds to the bootstrap theme color name to be used

      `bs_modal_*` parameters are equivalent to the bootstrap modal ones

      Confirm modals have two buttons (OK and cancel). The focus is set to the cancel
      one by default, but you can change it setting `cancel_focus` to `false`
    */
    _defaults = {

      success: {
        svg: '<path class="check" d="M101.4 42L52.7 90.6 31 69.3" />',

        title: 'Operazione completata',
        mes: null,
        ok_btn_text: 'OK',

        bs_status_class: 'success',
        title_class: 'text-success',
        ok_btn_class: 'btn-success',

        timer: 4000,// ms
        bs_modal_keyboard: true,
        bs_modal_backdrop: true
      },

      error: {
        svg: '<path d="M35 39L96.4 93.4" />'+
          '<path d="M96.4 39L35 93.2" />',

        title: 'Si è verificato un errore',
        mes: null,
        ok_btn_text: errorBtnLabel(),

        bs_status_class: 'danger',
        title_class: 'text-danger',
        ok_btn_class: 'btn-danger',

        timer: null,
        bs_modal_keyboard: false,
        bs_modal_backdrop: 'static'

      },
      warning: {
        svg: '<path d="M41.839 72.475v-37.2c0-3.852 3.143-6.975 7.02-6.975s7.02 3.123 7.02 6.975V65.5m0-30.225v-9.3c0-3.852 3.143-6.975 7.02-6.975s7.02 3.123 7.02 6.975V65.5m0-30.225c0-3.852 3.143-6.975 7.02-6.975 3.878 0 7.02 3.123 7.02 6.975V65.5m0-20.925c0-3.852 3.144-6.975 7.02-6.975 3.878 0 7.021 3.123 7.021 6.975V84.1C98 99.509 85.428 112 69.92 112h-9.36c-9.896-1.357-18.517-6.496-23.401-13.95L24.522 73.637c-2.584-3.53-1.799-8.475 1.755-11.043 3.555-2.568 8.531-1.788 11.116 1.743l4.212 8.138" />',

        title: 'Attenzione!',
        mes: null,
        ok_btn_text: errorBtnLabel(),

        bs_status_class: 'warning',
        title_class: null,
        ok_btn_class: 'btn-warning',

        timer: null,
        bs_modal_keyboard: false,
        bs_modal_backdrop: 'static'
      },
      info: {
        svg: '<path d="M74 105l-8.6.237V45.713L56 46m9.6-13.025V26" />',

        title: null,
        mes: null,
        ok_btn_text: 'Ricevuto',

        bs_status_class: 'info',
        title_class: null,
        ok_btn_class: 'btn-info',

        timer: null,
        bs_modal_keyboard: true,
        bs_modal_backdrop: true
      },
      confirm: {
        svg: '<path d="M44 48a21.928 21.928 0 0 1 6.443-15.556A21.931 21.931 0 0 1 66 26c12.15 0 22 9.85 22 22 0 6.14-2.668 11.543-6.573 15.683-6.514 6.91-15.363 4.47-15.363 16.065v7.935M66 105.816v-6.975" />',

        title: 'Confermi?',
        mes: null,
        ok_btn_text: 'Ho capito',
        cancel_btn_text: 'Annulla',
        cancel_focus: true, // false to give focus to the ok button

        bs_status_class: 'warning',
        title_class: null,
        ok_btn_class: 'btn-warning',
        cancel_btn_class: 'btn-outline-warning',

        callback: null,

        timer: null,
        bs_modal_keyboard: false,
        bs_modal_backdrop: 'static'
      }

    },
    get_svg_mark = () => {

      return `<svg height="132" width="132" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="66" cy="66" r="63"/>
        ${params.svg}
      </g>
    </svg>`;
    },

    get_alert_text = () => {

      let text =  '<div class="mt-3 text-center">';

      if( params.title ) {
        text += `<div class="h2${params.title_class? ` ${params.title_class}` : ''}">
            ${params.title}
          </div>`;
      }
      if( params.mes ) {
        text += `<div>${params.mes}</div>`;
      }
      text += '</div>';
      return text;
    },

    get_alert_btns = () => {

      let btns = `<button type="button" class="m-alert-ok btn ${params.ok_btn_class}" data-bs-dismiss="modal">
        ${params.ok_btn_text}
      </button>`;

      if(params.type === 'confirm') {

        btns += ` <button type="button" class="m-alert-cancel btn ${params.cancel_btn_class}" data-bs-dismiss="modal">
          ${params.cancel_btn_text}
        </button>`;
      }

      return btns;
    };


  if( !parameters.type ) {
    parameters.type = 'success';
  }
  parameters.type = parameters.type.toLowerCase();

  const params = Object.assign({}, _defaults[parameters.type], parameters);

  if(params.callback && typeof params.callback !== 'function') {
    console.error('`params.callback` non corretto!') // eslint-disable-line
    return;
  }

  let modal =
    `<div class="modal fade m-alert m-alert-${params.bs_status_class}" tabindex="-1" role="dialog" aria-describedby="m-alert-content" aria-modal="true" aria-live="assertive">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-body" id="m-alert-content">
            <div class="m-alert-mark">
              ${get_svg_mark()}
            </div>
            ${get_alert_text()}
          </div>
          <div class="modal-footer justify-content-${params.type === 'confirm'? 'between' : 'center'}">
            ${get_alert_btns()}
          </div>
        </div>
      </div>
    </div>`;

  let timeoutID = null, autoclose = false, _modal;

  document.body.insertAdjacentHTML('beforeend', modal);
  const modal_element = document.querySelector('.m-alert');

  return  new Promise(function(resolve) {

    _modal = new Modal(modal_element, {
      keyboard: params.bs_modal_keyboard,
      backdrop: params.bs_modal_backdrop
    });

    modal_element.addEventListener('shown.bs.modal', function () {

      const cancel_btn = modal_element.querySelector('.m-alert-cancel'),
        ok_btn = modal_element.querySelector('.m-alert-ok');

      if(cancel_btn && params.cancel_focus) {
        cancel_btn.focus();
      } else {
        ok_btn.focus();
      }

      if( params.timer && params.type !== 'confirm') {
        timeoutID = window.setTimeout( function() {
          autoclose = true;
          _modal.hide();
          resolve(true);
        }, params.timer);
      }

      // OK
      ok_btn.addEventListener('click', () => {
        resolve(true);
      }, false);

      // Cancel
      if(cancel_btn) {
        cancel_btn.addEventListener('click', () => {
          resolve(false);
        }, false);
      }
    }); // end shown.bs.modal

    _modal.show();

  }) // end Promise
    .then(function(result) {

      modal_element.addEventListener('hide.bs.modal', function () {
        if ( timeoutID && !autoclose) {
          window.clearTimeout(timeoutID);
        }
      });

      modal_element.addEventListener('hidden.bs.modal', function () {
        modal_element.remove();
      });

      if(params.callback && typeof params.callback === 'function') {
        params.callback(result);
      }

      return result;

    }); // end then
}
