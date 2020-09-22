/* exported mAlert */

// bootstrap based alert system
// check marks: https://codepen.io/sat-ui/pen/BeWbeo

const mAlert = function(params = {}) {

  const errorBtnLabel = function () {
      var labels = ['Oh My God!', 'Mon Dieu!', 'Mein Gott!', 'Parbleu!', 'Mizzica!', 'Meu Deus!'];
      return labels[Math.floor( Math.random() * labels.length )];
    },
    _defaults = {

      success: {
        svg: '<path class="path check" d="M101.4 42L52.7 90.6 31 69.3"/>',

        title: 'Operazione completata',
        title_class: 'text-success',
        mes: null,

        ok_btn_text: 'OK',
        ok_btn_class: 'btn-success',

        timer: 4000,// ms
        modal_keyboard: true,
        modal_backdrop: true
      },

      error: {
        svg: '<path class="path line" d="M35,39 L96.4,93.4">' +
      '</path><path class="path line" d="M96.4,39 L35,93.2"></path>',

        title: 'Si è verificato un errore',
        title_class: 'text-danger',
        mes: null,

        ok_btn_text: errorBtnLabel(),
        ok_btn_class: 'btn-danger',

        timer: null,
        modal_keyboard: false,
        modal_backdrop: 'static'

      },
      warning: {
        svg: '<path class="path line" d="M66.6 26.1l-.2 59.263m0 13v6.975"/>',

        title: 'Attenzione!',
        mes: null,

        ok_btn_text: errorBtnLabel(),
        ok_btn_class: 'btn-warning',

        timer: null,
        modal_keyboard: false,
        modal_backdrop: 'static'
      },
      info: {
        svg: '<path class="path line" d="M65.4 105.237V45.713m.2-12.738V26" />',

        title: null,
        mes: null,

        ok_btn_text: 'Ricevuto',
        ok_btn_class: 'btn-info',

        timer: null,
        modal_keyboard: true,
        modal_backdrop: true
      },
      confirm: {
        svg: '<path class="path line" d="M66 105.816v-6.975"/>'+
        '<path class="path line" d="M44 48a21.928 21.928 0 016.443-15.556A21.931 21.931 0 0166 26c12.15 0 22 9.85 22 22 0 6.14-2.668 11.543-6.573 15.683-6.514 6.91-15.363 4.47-15.363 16.065v7.935" />',

        title: 'Confermi?',
        mes: null,

        ok_btn_text: 'Ho capito',
        ok_btn_class: 'btn-warning',
        cancel_btn_text: 'Annulla',
        cancel_btn_class: 'btn-outline-warning',

        callback: null,

        timer: null,
        modal_keyboard: false,
        modal_backdrop: 'static'
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

      if(!params.ok_btn_class) {
        params.ok_btn_class = 'btn-outline-primary';
      }
      if(!params.ok_btn_text) {
        params.ok_btn_text = 'OK';
      }

      let btns = '';

      if(params.type === 'confirm') {
        if(!params.cancel_btn_text) {
          params.cancel_btn_text = 'Annulla';
        }
        if(!params.cancel_btn_class) {
          params.cancel_btn_class = 'btn-outline-primary';
        }

        btns += `<button type="button" class="mAlert-cancel btn ${params.cancel_btn_class}" data-dismiss="modal">
          ${params.cancel_btn_text}
        </button>`;

      }

      btns += `<button type="button" class="mAlert-ok btn ${params.ok_btn_class}" data-dismiss="modal">
        ${params.ok_btn_text}
      </button>`;

      return btns;
    };

  params = params || {};
  if( !params.type ) {
    params.type = 'success';
  }
  if( params.type === 'notice' ) {
    params.type = 'error';
  }
  params.type = params.type.toLowerCase();
  if(params.type === 'confirm') {
    params.timer = null;
  }

  params = Object.assign({}, _defaults[params.type], params);

  let modal =
    `<div class="modal fade mAlert mAlert-${params.type}" tabindex="-1" role="dialog" aria-describedby="mAlert-content" aria-modal="true" aria-live="assertive">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-body" id="mAlert-content">
            <div class="mAlert-mark">
              ${get_svg_mark()}
            </div>
            ${get_alert_text()}
          </div>
          <div class="modal-footer justify-content-center">
            ${get_alert_btns()}
          </div>
        </div>
      </div>
    </div>`;

  let timeoutID = null, autoclose = false, confirm_result = null;

  $(modal).modal({
    keyboard: params.modal_keyboard,
    backdrop: params.modal_backdrop,
    show:true
  })
    .on('shown.bs.modal', function () {
      let _modal = $(this);
      $('.modal-footer button', _modal).eq(0).focus();

      if( params.timer ) {
        timeoutID = window.setTimeout( function() {
          autoclose = true;
          _modal.modal('hide');
        }, params.timer);
      }
      if(params.type === 'confirm') {
        if(!params.callback || typeof params.callback !== 'function') {
          console.error('mAlert[confirm]: `params.callback` non definito o non corretto!') // eslint-disable-line
        }
        //OK
        $('.modal-footer button.mAlert-ok', _modal).click(function() {
          params.callback(true);
        });
        //Cancel
        $('.modal-footer button.mAlert-cancel', _modal).click(function() {
          params.callback(false);
        });
      }

    })
    .on('hide.bs.modal', function () {
      if ( timeoutID && !autoclose) {
        window.clearTimeout(timeoutID);
      }

      if(params.callback && typeof params.callback === 'function') {
        params.callback(confirm_result);
      }
    })
    .on('hidden.bs.modal', function () {
      $(this).remove();
    });
};
