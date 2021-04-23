import {inputDateSupport, inputTimeSupport} from '@massimo-cassandro/m-utilities/js-utilities/_input_date_support';
import {isIE} from '@massimo-cassandro/m-utilities/js-utilities/_ie_check';

import {mAlert} from '@massimo-cassandro/m-utilities/mAlert-bs4/_mAlert';

export default function () {

  let jsapp = {};

  window.mAlert = mAlert; // necessario per i flash messages

  // browser check
  if(!inputDateSupport() || !inputTimeSupport() || isIE() ) {
    document.querySelector('body').insertAdjacentHTML('afterbegin',
      `<div class="bg-danger p-3 browser-alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      	<div class="container">
          <div class="m-0 alert alert-icon alert-danger" role="alert">
            <h1 class="h2 mb-2">Stai utilizzando un browser non adatto</h1>
            <p>Stai utilizzando un browser che non supporta tutte le tecnologie utilizzate in questo sito
            e qualcosa potrebbe non funzionare correttamente.<br>
            È consigliabile utilizzare l'ultima versione di
            <a href="https://www.mozilla.org/it/firefox/new/">Firefox</a>,
            <a href="https://www.google.com/intl/it_it/chrome/">Chrome</a>,
            <a href="https://www.microsoft.com/it-it/edge">Edge</a> o
            <a href="https://www.opera.com/it">Opera</a></p>
          </div>
        </div>
      </div>`
    );
    let alert = document.querySelector('.browser-alert');
    alert.querySelector('.close').addEventListener('click', () => {
      alert.remove();
    }, false);
  }


  // menu
  // document.querySelector('#main-menu .selected')
  //   .closest('.menu-title').classList.add('selected');

  // menu selected
  document.querySelectorAll('span.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if(e.target &&  e.target !== item ) {
        let old_item = document.querySelector('.menu-wrapper>ul>li.selected');
        old_item.classList.remove('selected');
        old_item.querySelector('.menu-item').removeAttribute('aria-expanded');

        item.closest('li').classList.toggle('selected');
        item.setAttribute('aria-expanded', true);
      }
    });
  });

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
        rootMargin: '200px 0px'
      });

      scrollObserver.observe(observer_element);
    }
  }

  document.querySelector('.go2top').addEventListener('click', () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, false);

  // navigazione scheda / elenco
  let nav_main = document.querySelector('.inner-nav-main');
  if(nav_main) {
    nav_main.classList.add('text-right', 'd-print-none');
    let nav = nav_main.innerHTML;

    document.querySelectorAll('.inner-nav').forEach(item => {
      item.innerHTML=nav;
      item.classList.add('text-right', 'd-print-none');
    });
  }

  //page is loaded
  // document.documentElement.classList.add('page-is-loaded');

  return jsapp;
}
