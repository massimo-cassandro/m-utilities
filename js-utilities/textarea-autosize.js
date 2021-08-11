/*
  textarea autosize

  si applica agli elementi textarea con classe 'autosize'
  consigliabile aggiungere una proprietà min-height ai textarea

  per ridimensionare un elemento textarea in seguito all'aggiunta di un testo
  dinamico, effettuare il trigger dell'evento input:

    target_textarea.dispatchEvent(new Event('input'));


  Credits:
  https://github.com/javierjulio/textarea-autosize/
*/
export default function () {

  // select interested textareas
  let textareas = document.querySelectorAll('textarea.autosize');
  textareas.forEach(el => {
    let cstyle = window.getComputedStyle(el, null),
      v_borders  = parseInt(cstyle.getPropertyValue('border-top-width')) +
        parseInt(cstyle.getPropertyValue('border-bottom-width')) || 0;

    el.style.height = (el.scrollHeight - v_borders) + 'px';

    el.addEventListener('input', () => {
      el.style.height = 0;
      el.style.height = (el.scrollHeight - v_borders) + 'px';
    }, false);
  });
}
