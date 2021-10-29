import {slideToggle} from '../js-utilities/slide-up-down-toggle';

export default function (callback, content_minHeigth = null) {

  // elementi chiusi
  document.querySelectorAll('.accordion-wrapper:not(.open)').forEach(item => {
    item.querySelector('.accordion-content').style.display = 'none';
  });

  // listener
  document.querySelectorAll('.accordion-title').forEach(item => {
    const accordion_wrapper = item.closest('.accordion-wrapper'),
      accordion_content = accordion_wrapper.querySelector('.accordion-content');

    item.addEventListener('click', () => {
      // la classe open è aggiunta prima dell'effetto se l'accordion è chiuso,
      // o rimossa dopo l'effetto se l'accordion era aperto
      // in questo modo le regole css sono applicate compatibilmente con la visibilità
      // degli elementi

      let originally_open = accordion_wrapper.classList.contains('open');

      if(!originally_open) {
        accordion_wrapper.classList.add('open');
      }
      slideToggle(accordion_content, 400, () => {

        if(originally_open) {
          accordion_wrapper.classList.remove('open');
        }
        if(callback) {
          callback(accordion_wrapper);
        }
      });
    }, false);
  });

}
