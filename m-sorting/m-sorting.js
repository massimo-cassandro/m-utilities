export default function (m_sorting_container, m_sorting_elements_selector, callback)  {

  /*
    m_sorting_container: html dom element
    m_sorting_elements_selector: selettore degli elementi da ordinare
                        (se null, vengono presi i figli di m_sorting_container)
    callback


    References:
    * https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js
    * https://www.html5rocks.com/en/tutorials/dnd/basics/
    * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
    * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types
    * https://codepen.io/dbrennan/pen/mXdvMe
    * https://www.nngroup.com/articles/drag-drop/
  */



  let dragged_element = null, m_sorting_elements = [];

  if(m_sorting_container) {
    if(m_sorting_elements_selector) {
      m_sorting_elements = m_sorting_container.querySelectorAll(m_sorting_elements_selector);
    } else {
      let children_elements = m_sorting_container.children;
      if(children_elements) {
        m_sorting_elements = Array.from(children_elements);
      }
    }
  }


  // pulisce eventuali eventi non conclusi correttamente
  const resetAll = () => {
    if( dragged_element ) {
      dragged_element.classList.remove('m-sorting-sorting');

      dragged_element.parentNode.querySelectorAll('.m-sorting-dragover').forEach(item => {
        item.classList.remove('m-sorting-dragover');
      });
    }
    dragged_element = null;
    // e.dataTransfer.clearData();
  };

  m_sorting_elements.forEach(el => {
    el.setAttribute('draggable', 'true');
    el.classList.add('m-sorting-item');

    // imposta draggable=false su eventuali elementi <a> o <img> posti all'interno
    el.querySelectorAll('a, img').forEach(item => {
      item.draggable = false;
    });

    // trascinamento avviato
    el.addEventListener('dragstart', function(e) {
      resetAll();
      dragged_element = e.target; // === this


      e.dataTransfer.setData('text/plain', 'm-sorting');
      e.dataTransfer.effectAllowed = 'move';

      this.classList.add('m-sorting-sorting');

    }, false);

    // inizio posizionamento sopra un altro elemento
    el.addEventListener('dragenter', function(e) {
      e.preventDefault();

      dragged_element.parentNode.querySelectorAll('.m-sorting-dragover').forEach(item => {
        item.classList.remove('m-sorting-dragover');
      });

      if( this !== dragged_element ) {
        this.classList.add('m-sorting-dragover');
      }

    }, false);

    // posizionamento sopra un altro elemento
    // e.target è l'elemento
    el.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if( this !== dragged_element ) {
        this.classList.add('m-sorting-dragover');
      }

    }, false);

    // uscita posizionamento sopra un altro elemento
    // e.target è l'elemento
    el.addEventListener('dragleave', function() {
      this.classList.remove('m-sorting-dragover');
    }, false);

    // drop e.target è l'elemento
    el.addEventListener('drop', function(e) {
      e.preventDefault();

      if(dragged_element) {

        if( this.nextElementSibling ) {
          this.parentNode.insertBefore(dragged_element, this.nextElementSibling);

        // se si tratta dell'ultimo elemento si mette alla fine
        } else {
          this.parentNode.insertAdjacentElement('beforeend', dragged_element);
        }

        /* if(this.previousElementSibling === dragged_element && this.nextElementSibling ) {
          this.parentNode.insertBefore(dragged_element, this.nextElementSibling);

        } else if( this.nextElementSibling ) {
          this.parentNode.insertBefore(dragged_element, this);

        // se si tratta dell'ultimo elemento si mette alla fine
        } else {
          this.parentNode.insertAdjacentElement('beforeend', dragged_element);
        } */
      }
      resetAll();

      return false;

    }, false);

    // trascinamento terminato
    el.addEventListener('dragend', function() {

      resetAll();

      if(callback && typeof callback === 'function') {
        callback();
      }

    }, false);

  });
}
