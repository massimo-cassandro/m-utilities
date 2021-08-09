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
        svg: '<path class="path check" d="M101.4 42L52.7 90.6 31 69.3"/>',

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
        svg: '<path class="path line" d="M35,39 L96.4,93.4">' +
      '</path><path class="path line" d="M96.4,39 L35,93.2"></path>',

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
        svg: '<path class="path line" d="M66.6 26.1l-.2 59.263m0 13v6.975"/>',

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
        svg: '<path class="path line" d="M65.4 105.237V45.713m.2-12.738V26" />',

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
        svg: '<path class="path line" d="M66 105.816v-6.975"/>'+
        '<path class="path line" d="M44 48a21.928 21.928 0 016.443-15.556A21.931 21.931 0 0166 26c12.15 0 22 9.85 22 22 0 6.14-2.668 11.543-6.573 15.683-6.514 6.91-15.363 4.47-15.363 16.065v7.935" />',

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
        <circle class="path circle" cx="66" cy="66" r="63"/>
        ${params.svg}
      </g>
    </svg>`;
    },

    get_alert_text = () => {

      let text =  '<div class="mt-3 text-center">';

      if( params.title ) {
        text += `<div class="h2${params.title_class? ` text-${params.title_class}` : ''}">
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
