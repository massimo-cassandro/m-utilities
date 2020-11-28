// import date_in_sequenza from '@massimo-cassandro/m-utilities/js-utilities/_date_in_sequenza';
// import {inputDateSupport, inputDatetimeSupport, inputTimeSupport} from '@massimo-cassandro/m-utilities/js-utilities/_input_date_support';
// import {isIE} from '@massimo-cassandro/m-utilities/js-utilities/_ie_check';
import {cookie_consent} from '@massimo-cassandro/cookie-consent/cookie-consent';
import sharing_links from '@massimo-cassandro/sharing-links/sharing-links';
import {email_antispam} from '@massimo-cassandro/m-utilities/js-utilities/_email-antispam';
import m_cke_loader from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-loader';
import m_cke_form_check from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-form-check';

// import {submit_err} from '@massimo-cassandro/m-utilities/js-utilities/_submit_err';

import menu_trigger from './src/_menu_trigger';

import LazyLoad from 'vanilla-lazyload';

//pagine
import home from './src/_home';

let jsapp = {
  // maindata: $('.appdata').data('d'),
  domain: 'xxxx.it',

  // inputDateSupport: inputDateSupport,
  // inputDatetimeSupport: inputDatetimeSupport,
  // inputTimeSupport: inputTimeSupport,
  // date_in_sequenza: date_in_sequenza,
  // isIE: isIE,
  home: home,

};



(() => {
  'use strict';
  window.mUtilities = window.mUtilities || {};
  window.mUtilities.viewer = '/viewer';

  jsapp.maindata.baseUrl = jsapp.maindata.baseUrl || '';
  // jsapp.submit_err = submit_err; // per compatibilità con precedenti script

  // cookie consent
  cookie_consent({
    message: `Questo sito utilizza cookie, anche di terze parti, anonimizzati
    per garantirti la migliore esperienza di navigazione.
    Continuando a navigare su questo sito, si acconsente al loro utilizzo<br>
      Consulta la pagina della
      <a href="/privacy" rel="noopener noreferrer nofollow">
      Privacy&nbsp;Policy</a> per maggiori informazioni.`,
    btn_text: 'Ho capito',
    banner_aria_label: 'Consenso Cookie',
    btn_aria_label: 'Dai il consenso per l\'utilizzo dei cookie'
  });

  sharing_links({
    sharing: ['fb', 'twt', 'wa'],
    size: 'std',
    title: 'Condividi con [[NAME]]',
    share_icon: false
  });

  menu_trigger();
  menu_utente_trigger();

  // tooltips
  $('.has-tooltip').tooltip();

  // hidden emails
  email_antispam({default_domain: jsapp.domain});

  // lazyload
  jsapp.pageLazyLoad = new LazyLoad({
    elements_selector: '[loading=lazy]',
    use_native: true // ← enables hybrid lazy loading
  });

  // // go2top
  // const go2top = document.querySelector('.go2top'),
  //   observer_element = document.querySelector('.main-header');

  // if(go2top && observer_element &&
  //   'IntersectionObserver' in window &&
  //   'IntersectionObserverEntry' in window &&
  //   'intersectionRatio' in window.IntersectionObserverEntry.prototype
  // ) {
  //   const scrollObserver = new IntersectionObserver( (entries) => {
  //     if(go2top.offsetParent) { // visibile
  //       document.documentElement.classList.toggle('scrolling-on', !entries[0].isIntersecting);
  //     }
  //   },{
  //     rootMargin: '100px 0px'
  //   });
  //   scrollObserver.observe(observer_element);

  //   go2top.addEventListener('click', () => {
  //     $('html, body').animate({ scrollTop: 0 }, 400);
  //   }, false);
  // }



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

  // // disable btn on submit
  // $('form').submit(function(){
  //   $(':submit').prop('disabled', true);
  // });

  //page is loaded
  document.documentElement.classList.add('page-is-loaded');

})();
