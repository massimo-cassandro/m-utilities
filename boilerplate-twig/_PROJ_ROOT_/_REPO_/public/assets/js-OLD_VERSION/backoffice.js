import m_cke_loader from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-loader';
import m_cke_form_check from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-form-check';
import textarea_autosize from '@massimo-cassandro/m-utilities/js-utilities/_textarea-autosize';
import date_in_sequenza from '@massimo-cassandro/m-utilities/js-utilities/_date_in_sequenza';
import {inputDateSupport, inputTimeSupport} from '@massimo-cassandro/m-utilities/js-utilities/_input_date_support';
import {datetimeModalFallback} from '@massimo-cassandro/m-utilities/js-utilities/_input_datetime-bs4-modal-fallback';
import {inputDateRawFallback} from '@massimo-cassandro/m-utilities/js-utilities/_input_date_raw_fallback';
import {isIE} from '@massimo-cassandro/m-utilities/js-utilities/_ie_check';
import contenuti_elenco from '@massimo-cassandro/m-utilities/boilerplate/_contenuti_elenco';
import contenuti_scheda from '@massimo-cassandro/m-utilities/boilerplate/_contenuti_scheda';
import {form_multiselect} from '@massimo-cassandro/symfony-bootstrap-form-theme/dist/js/_form-multiselect';
import {check_required_uploader} from '@massimo-cassandro/js-file-uploader/utilities/_check_required_uploader';
// import {submit_err} from '@massimo-cassandro/m-utilities/js-utilities/_submit_err';

import file_uploader from './src-backoffice/_file_uploader';


let jsapp = {
  // maindata: $('.appdata').data('d'),

  contenuti_elenco: contenuti_elenco,
  contenuti_scheda


};

(() => {
  'use strict';

  // std init
  file_uploader();
  form_multiselect();

  // browser check
  if(!inputDateSupport() || !inputTimeSupport() || isIE()) {
    $('.outer-content').prepend(
      '<div class="alert alert-icon alert-danger" role="alert">'+
        '<h1 class="h2 mb-2">Stai utilizzando un browser non adatto</h1>'+
        '<p>Stai utilizzando un browser che non supporta tutte le tecnologie utilizzate in questo sito '+
        'e qualcosa potrebbe non funzionare correttamente.<br>' +
        'È consigliabile utilizzarne uno più moderno.</p>' +
      '</div>'
    );
  }

  //date fallback
  inputDateRawFallback();

  // datetime fallback
  new datetimeModalFallback( {
    container_class: '',
    date_display_class: 'form-control text-truncate font-weight-normal',
    btn_class: 'btn btn-secondary'
  });

  // disabilita pulsante submit al momento della registrazione
  $('form:not([data-disable-submit="false"])').submit(function () {
    $(this).find(':submit').prop('disabled', true);
  });

  // menu
  $('#main-menu .selected').parents('ul')
    .prev('.menu-title').addClass('selected');

  //menu (mobile)
  document.querySelector('.menu-trigger').addEventListener('click', () => {
    document.documentElement.classList.toggle('menu-is-open');
  }, false);

  // scroll observer (mobile)
  if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {

    const observer_element = document.querySelector('.main-header');
    // in modo fancy non è presente
    if(observer_element) {
      const scrollObserver = new IntersectionObserver( (entries) => {
        document.documentElement.classList.toggle('scrolling-on', !entries[0].isIntersecting);
      },{
        rootMargin: '100px 0px'
      });

      scrollObserver.observe(observer_element);
    }
  }

  document.querySelector('.go2top').addEventListener('click', () => {
    $('html, body').animate({ scrollTop: 0 }, 600);
  }, false);

  // alert autoclose
  window.setTimeout(function () {
    $('.alert-success.alert-flash').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove();
    });
  }, 4000);

  // std avvio
  jsapp.avvio = () => {
    // _context = _context || $(document);
    textarea_autosize();
    date_in_sequenza();
  };

  // std macro
  $(document).on('click', '.macro-riga-add', function () {
    let _this = $(this),
      macro_container  = $('.macro-container', _this.parents('.macro-wrapper')).eq(0),
      macro_template     = macro_container.data('template'),
      indice_righe       = macro_container.find('.macro-riga').length,
      callback           = _this.data('callback');

    macro_container.append(macro_template.replace(/__indice\d?__/g, indice_righe++));
    if(callback && jsapp[callback]) {
      jsapp[callback](macro_container);
    }
    jsapp.avvio(macro_container.find('.macro-riga:last'));
  });

  $(document).on('click', '.macro-riga-del', function () {
    let _this = $(this),
      callback = _this.data('callback'),
      container = _this.parents('.macro-container').eq(0);

    _this.parents('.macro-riga').eq(0).remove();

    if(callback && jsapp[callback]) {
      jsapp[callback]( container );
    }
  });

  jsapp.avvio();


  // uploader required
  check_required_uploader({
    alert_api: message => {
      mAlert({
        type  : 'error',
        title : message
      });
    },
    message: 'È necessario caricare le immagini obbligatorie'
  });


  // ckeditor
  window.mUtilities = window.mUtilities || {};
  window.mUtilities.ckeditor = {

    cke_url: '/assets/ckeditor/m-ckeditor-min.js?v=' + jsapp.maindata.v,
    upl_url: '/ckeditor/file-uploader',
    img_viewer: '/viewer/',

    requiredErrorMes: elementoRequired => {
      return `Il campo ${elementoRequired} è obbligatorio`;
    },
    alertUI: mes => {
      $(':submit').disabled(false);
      mAlert({
        type           : 'error',
        title          : mes,
        mes            : null
      });
    }
  };
  m_cke_loader();
  m_cke_form_check();

  // page specific controller
  const controller = document.body.dataset.controller;
  if(controller) {
    controller.split(',').forEach(action => {
      if ( action && jsapp[action] && typeof jsapp[action] === 'function' ) {
        jsapp[action]();
      }
    });
  }

  //page is loaded
  document.documentElement.classList.add('page-is-loaded');

})();
