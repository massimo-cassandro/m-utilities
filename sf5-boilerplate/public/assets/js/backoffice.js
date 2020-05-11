import m_cke_loader from 'm-utilities/ckeditor-utilities/_m-ckeditor-loader';
import m_cke_form_check from 'm-utilities/ckeditor-utilities/_m-ckeditor-form-check';
import textarea_autosize from 'm-utilities/js-utilities/_textarea-autosize';
import ffo_loader from 'm-utilities/js-utilities/_fontfaceobserver-gfonts-v2-auto-loader';
import file_upl from './src-backoffice/_file_uploader';
import {inputDateSupport, inputTimeSupport} from 'm-utilities/js-utilities/_input_date_support';
import {isIE} from 'm-utilities/js-utilities/_ie_check';

let jsapp = {
  maindata: $('.appdata').data('d'),
};

(() => {
  'use strict';

  // standard modules
  textarea_autosize();
  ffo_loader();
  file_upl();


  //page is loaded
  document.documentElement.classList.add('page-is-loaded');


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


  // // scroll observer (mobile)
  // if ('IntersectionObserver' in window &&
  //   'IntersectionObserverEntry' in window &&
  //   'intersectionRatio' in window.IntersectionObserverEntry.prototype
  // ) {

  //   const observer_element = document.querySelector('.main-header');
  //   // in modo fancy non è presente
  //   if(observer_element) {
  //     const scrollObserver = new IntersectionObserver( (entries) => {
  //       document.documentElement.classList.toggle('scrolling-on', !entries[0].isIntersecting);
  //     },{
  //       rootMargin: '100px 0px'
  //     });

  //     scrollObserver.observe(observer_element);
  //   }
  // }

  // document.querySelector('.go2top').addEventListener('click', () => {
  //   $('html, body').animate({ scrollTop: 0 }, 600);
  // }, false);

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

})();

