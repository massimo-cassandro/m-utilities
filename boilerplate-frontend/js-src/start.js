import {isIE} from '@massimo-cassandro/m-utilities/js-utilities/_ie_check';
import {inputDateSupport, inputTimeSupport} from '@massimo-cassandro/m-utilities/js-utilities/_input_date_support';
import { slideUp } from '@massimo-cassandro/m-utilities/js-utilities/_slide-up-down-toggle';

export default function start() {

  // browser check
  if(!inputDateSupport() || !inputTimeSupport() || isIE()) {
    document.getElementById('content').insertAdjacentHTML('beforebegin',
      `<div class="alert alert-icon alert-danger" role="alert">
        <h1 class="h2 mb-2">Stai utilizzando un browser non adatto</h1>
        <p>Stai utilizzando un browser che non supporta tutte le tecnologie utilizzate in questo sito
        e qualcosa potrebbe non funzionare correttamente.<br>
        È consigliabile utilizzarne uno più moderno.</p>
      </div>`
    );
  }


  // aggiunta classe selected al titolino del menu
  document.querySelector('#main-menu .selected').closest('ul')
    // .previousElementSibling
    ?.closest('li')?.querySelector('.menu-title')
    ?.classList.add('selected');

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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, false);

  // dismiss alert
  document.querySelectorAll('[data-bs-dismiss]').forEach(item => {
    item.addEventListener('click', () => {
      item.closest('.' + item.dataset.dismiss).remove();
    }, false);
  });

  // alert autoclose
  let flash_alert = document.querySelector('.alert-success.alert-flash');
  if(flash_alert) {
    window.setTimeout(function () {
      slideUp(flash_alert, 500, () => {
        flash_alert.remove();
      });
    }, 4000);
  }

  //page is loaded
  document.documentElement.classList.add('page-is-loaded');
}
