export  function mGallery () {
  'use strict';

  const active_element_class = 'mgallery-on',
    gotoItem = ( gallery, item, direction ) => {
      direction = direction || 'auto';

      // next e prev non sono riferiti all'elemento attivo ma a quello che ha richiamato l'evento
      let next = item.nextElementSibling,
        prev = item.previousElementSibling,

        active_item = gallery.querySelector('.' + active_element_class);

      if( direction === 'auto') {

        // selezionato l'elemento attivo
        if(item.classList.contains(active_element_class)) {
          if(next !== null ) {
            direction = 'next';
          } else {
            direction = null;
          }

        // selezionato elemento precedente
        } else if (next && next.classList.contains(active_element_class) ) {
          direction = 'prev';

        // selezionato elemento successivo
        } else if (prev && prev.classList.contains(active_element_class)) {
          direction = 'next';

        } else {
          direction = 'null';
        }

      // controllo esistenza elementi precedente o successivo se direction non è auto (swipe)
      } else {

        if((direction === 'next' && active_item.nextElementSibling === null) ||
          (direction === 'prev' && active_item.previousElementSibling === null)) {
          direction = null;
        }
      }

      if(direction !== null) {
        active_item.classList.remove(active_element_class);
      }
      if(direction === 'next') {
        active_item.nextElementSibling.classList.add(active_element_class);

      } else if (direction === 'prev') {
        active_item.previousElementSibling.classList.add(active_element_class);
      }
    };

  document.querySelectorAll('.mGallery').forEach(gallery => {

    try {
      Array.from(gallery.children).forEach(item => {

        item.addEventListener('click', () => {
          gotoItem(gallery, item);
        }, false);

        // let ts;
        // gallery.addEventListener('touchstart', e => {
        //   ts = e.changedTouches[0].screenY;
        // });

        // gallery.addEventListener('touchend', e => {
        //   console.log(ts);
        //   console.log(e);

        //   // var te = e.changedTouches[0].screenY;
        //   // if(ts > te+5){
        //   //   console.log('swipe down');

        //   // } else if(ts < te-5){
        //   //   console.log('swipe up');
        //   // }
        // });

      });

    } catch (e) {
      console.error(e); // eslint-disable-line
    }

  });
}
