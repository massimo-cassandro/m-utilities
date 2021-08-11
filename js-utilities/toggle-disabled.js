/*
  toggle disabled attribute of given element according to `is_disabled` parameter
  toggle `disabled` class to closest `.form-group` parent
  and `disabled` attribute children buttons

  element may be a .form-group container (a fieldset that contains radios or checkboxes)

  Works both with jquery and vanilla dom objects

*/
export default function (element, is_disabled) {

  if(window.jQuery !== undefined && element instanceof window.jQuery) {
    element.prop('disabled', is_disabled).toggleClass('disabled', is_disabled);

    if(!element.hasClass('form-group')) {
      element.closest('.form-group').toggleClass('disabled', is_disabled)
        .find('button').prop('disabled', is_disabled);
    }

  } else {

    if(is_disabled) {
      element.setAttribute('disabled', true);
    } else {
      element.removeAttribute('disabled');
    }

    element.classList.toggle('disabled', is_disabled);

    if(!element.classList.contains('form-group')) {
      let form_group = element.closest('.form-group');
      if(form_group) {
        form_group.classList.toggle('disabled', is_disabled);
        form_group.querySelectorAll('button').forEach(item => {
          if(is_disabled) {
            item.setAttribute('disabled', is_disabled);
          } else {
            item.removeAttribute('disabled');
          }
        });
      }
    } // if(element.classList.contains('form-group'))
  } // if jQuery
}
