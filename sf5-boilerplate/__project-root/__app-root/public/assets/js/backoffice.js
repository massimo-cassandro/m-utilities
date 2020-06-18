import m_cke_loader from './node_modules/m-utilities/ckeditor-utilities/_m-ckeditor-loader';
import m_cke_form_check from './node_modules/m-utilities/ckeditor-utilities/_m-ckeditor-form-check';
import textarea_autosize from './node_modules/m-utilities/js-utilities/_textarea-autosize';
// import ffo_loader from 'm-utilities/js-utilities/_fontfaceobserver_loader';
import file_upl from './src-backoffice/_file_uploader';
import {inputDateSupport, inputTimeSupport} from './node_modules/m-utilities/js-utilities/_input_date_support';
import {datetimeModalFallback} from './node_modules/m-utilities/js-utilities/_input_datetime-bs4-modal-fallback';
import {inputDateRawFallback} from './node_modules/m-utilities/js-utilities/_input_date_raw_fallback';
import {isIE} from './node_modules/m-utilities/js-utilities/_ie_check';


import utenti_scheda from './src-backoffice/_utenti_scheda';
import contenuti_elenco from './node_modules/m-utilities/sf5-boilerplate/contenuti/_contenuti_elenco';
import contenuti_scheda from './node_modules/m-utilities/sf5-boilerplate/contenuti/_contenuti_scheda';
import news_scheda from './src-backoffice/_news_scheda';

let jsapp = {
  maindata: $('.appdata').data('d'),
  submit_err: (title, mes) => {
    'use strict';
    $(':submit').prop('disabled', false);
    mAlert({
      type  : 'error',
      title : title,
      mes   : mes || null
    });
    return false;
  },

  utenti_scheda: utenti_scheda,
  contenuti_elenco: contenuti_elenco,
  contenuti_scheda: contenuti_scheda,
  news_scheda: news_scheda
};

(() => {
  'use strict';


  // standard modules
  textarea_autosize();
  file_upl();

  //date fallback
  inputDateRawFallback();

  // datetime fallback
  new datetimeModalFallback( {
    container_class: '',
    date_display_class: 'form-control text-truncate font-weight-normal',
    btn_class: 'btn btn-secondary'
  });

  // // fonts
  // //'Work+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700', 'Zilla+Slab:wght@300'
  // ffo_loader([
  //   ['Work Sans', { weight: 300, style: 'normal'}],
  //   ['Work Sans', { weight: 300, style: 'italic'}],
  //   ['Work Sans', { weight: 400, style: 'normal'}],
  //   ['Work Sans', { weight: 400, style: 'italic'}],
  //   ['Work Sans', { weight: 500, style: 'normal'}],
  //   //['Work Sans', { weight: 500, style: 'italic'}],
  //   ['Work Sans', { weight: 700, style: 'normal'}],
  //   ['Work Sans', { weight: 700, style: 'italic'}],
  //   ['Zilla Slab', { weight: 300, style: 'normal'}]
  // ]);


  // disabilita pulsante submit al momento della registrazione
  $('form:not([data-disable-submit="false"])').submit(function () {
    $(this).find(':submit').prop('disabled', true);
  });

  // browser check
  if(!inputDateSupport() || !inputTimeSupport() || isIE()) {
    $('.outer-content').prepend(
      '<div class="alert alert-icon alert-danger" role="alert">'+
        '<h1 class="h2 mb-2">Stai utilizzando un browser non adatto</h1>'+
        '<p>Stai utilizzando un browser che non supporta tutte le tecnologie utilizzate in questo sito, '+
        'e qualcosa potrebbe non funzionare correttamente.<br>' +
        'È consigliabile utilizzarne uno più moderno.</p>' +
      '</div>'
    );
  }


  // menu (mobile)
  //-------------------------
  // altezza menu
  let menu = document.getElementById('main-menu');
  if(menu) {
    let altezza_menu = menu.querySelector('ul').offsetHeight;
    // trigger menu
    document.getElementsByClassName('menu-trigger')[0].addEventListener('click', function () {
      this.classList.toggle('expanded');
      document.documentElement.classList.toggle('menu-is-open');

      menu.style.height = document.documentElement.classList.contains('menu-is-open')?
        `${altezza_menu}px` : '0px';
    }, false);
  }


  // go2top
  const go2top = document.querySelector('.go2top'),
    observer_element = document.querySelector('.main-header');

  if(go2top && observer_element && // in modo fancy observer_element non è presente
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    const scrollObserver = new IntersectionObserver( (entries) => {
      document.documentElement.classList.toggle('scrolling-on', !entries[0].isIntersecting);
    },{
      rootMargin: '100px 0px'
    });
    scrollObserver.observe(observer_element);

    go2top.addEventListener('click', () => {
      $('html, body').animate({ scrollTop: 0 }, 400);
    }, false);
  }


  // alert autoclose
  window.setTimeout(function () {
    $('.alert-autoclose').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove();
    });
  }, 4000);

  // std macro
  // $(document).on('click', '.macro-riga-add', function () {
  //   let _this = $(this),
  //     macro_container  = $('.macro-container', _this.parents('.macro-wrapper')).eq(0),
  //     macro_template     = macro_container.data('template'),
  //     indice_righe       = macro_container.find('.macro-riga').length,
  //     callback           = _this.data('callback');

  //   macro_container.append(macro_template.replace(/__indice\d?__/g, indice_righe++));
  //   if(callback && esa[callback]) {
  //     esa[callback](macro_container);
  //   }
  //   esa.avvio(macro_container.find('.macro-riga:last'));
  // });

  // $(document).on('click', '.macro-riga-del', function () {
  //   let _this = $(this),
  //     callback = _this.data('callback'),
  //     container = _this.parents('.macro-container').eq(0);

  //   _this.parents('.macro-riga').eq(0).remove();

  //   if(callback && esa[callback]) {
  //     esa[callback]( container );
  //   }
  // });


  // required file-uploader
  $('form').submit(function(){
    if($('.fupl-wrapper:not([disabled])[data-required="true"][data-has-values="false"]').length > 0) {
      mAlert({
        type  : 'error',
        title : 'È necessario caricare le immagini obbligatorie'
      });
      $(':submit').disabled(false);
      return false;
    }
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

