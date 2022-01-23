// inizializza i parametri degli elementi su cui agire con il Drag&Drop
// da utilizzare nel caso si aggiungano elementi al set iniziale
// dopo aver avviato la funzione
export function initSortingElement(el) {
  el.setAttribute('draggable', 'true');
  el.classList.add('m-sorting-item');

  // imposta draggable=false su eventuali elementi <a> o <img> posti all'interno
  el.querySelectorAll('a, img').forEach(item => {
    item.draggable = false;
  });
}


export default function (m_sorting_container, m_sorting_elements_selector, callback)  {

  /*
    m_sorting_container: html dom element
    m_sorting_elements_selector: selettore degli elementi da ordinare
                        (se null, vengono presi i figli di m_sorting_container)
    callback  <== invocato con l'elemento target come argomento


    References:
    * https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js
    * https://www.html5rocks.com/en/tutorials/dnd/basics/
    * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
    * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types
    * https://codepen.io/dbrennan/pen/mXdvMe
    * https://www.nngroup.com/articles/drag-drop/
  */

  let dragged_element = null,
    m_sorting_elements = [];

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

  // m_sorting_container.classList.add('m-sorting-wrapper');

  m_sorting_elements.forEach((el) => {
    initSortingElement(el);
  });


  // recupera l'elemento a cui delegare l'handler
  const getSortingItem = eventTarget => {

    let target;

    if(eventTarget.classList.contains('m-sorting-item')) {
      target = eventTarget;

    } else {
      target = eventTarget.closest('.m-sorting-item'); // elemento o null
    }

    return target;
  };

  // trascinamento avviato
  m_sorting_container.addEventListener('dragstart', function(e) {

    resetAll();
    dragged_element = getSortingItem(e.target);

    e.dataTransfer.setData('text/plain', 'm-sorting');
    e.dataTransfer.effectAllowed = 'move';

    dragged_element.classList.add('m-sorting-sorting');

  }, false);

  // inizio posizionamento sopra un altro elemento
  m_sorting_container.addEventListener('dragenter', function(e) {
    e.preventDefault();

    const target_element = getSortingItem(e.target);

    m_sorting_container.querySelectorAll('.m-sorting-dragover').forEach(item => {
      item.classList.remove('m-sorting-dragover');
    });

    target_element.classList.add('m-sorting-dragover');

  }, false);

  // posizionamento sopra un altro elemento
  m_sorting_container.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const target_element = getSortingItem(e.target);

    if( target_element !== dragged_element ) {
      target_element.classList.add('m-sorting-dragover');
    }

  }, false);

  // uscita posizionamento sopra un altro elemento
  m_sorting_container.addEventListener('dragleave', function(e) {
    const target_element = getSortingItem(e.target);
    target_element.classList.remove('m-sorting-dragover');
  }, false);


  m_sorting_container.addEventListener('drop', function(e) {
    e.preventDefault();
    const target_element = getSortingItem(e.target);

    if(dragged_element) {

      if( target_element.nextElementSibling ) {
        m_sorting_container.insertBefore(dragged_element, target_element.nextElementSibling);

      // se si tratta dell'ultimo elemento si mette alla fine
      } else {
        m_sorting_container.insertAdjacentElement('beforeend', dragged_element);
      }

      /*
      // POSIZIONAMENTO SOPRA IL DROP ELEMENT
      // se si tratta dell'ultimo elemento si mette alla fine
      if (!target_element.nextElementSibling ) {
        m_sorting_container.insertAdjacentElement('beforeend', dragged_element);

      // altrimenti si mette sopra l'elemento selezionato
      } else {
        m_sorting_container.insertBefore(dragged_element, target_element); //this.nextElementSibling);

      }
      */
    }
    resetAll();

    return false;

  }, false);

  // trascinamento terminato
  m_sorting_container.addEventListener('dragend', function(e) {

    resetAll();
    const target_element = getSortingItem(e.target);

    if(callback && typeof callback === 'function') {
      callback(target_element);
    }

  }, false);

}
