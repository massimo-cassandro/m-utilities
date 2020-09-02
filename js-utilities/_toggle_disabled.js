/*
  toggle disabled attribute of given element according to `is_disabled` parameter
  toggle `disabled` class to closest `.form-group` parent
  and `disabled` attribute children buttons

  Works both with jquery and vanilla dom objects

*/
export default function (element, is_disabled) {
  'use strict';

  if(window.jQuery !== undefined && element instanceof window.jQuery) {
    element.prop('disabled', is_disabled).toggleClass('disabled', is_disabled)
      .closest('.form-group').toggleClass('disabled', is_disabled)
      .find('button').prop('disabled', is_disabled);

  } else {
    element.setAttribute('disabled', is_disabled);
    element.classList.toggle('disabled', is_disabled);
    element.closest('.form-group').classList.toggle('disabled', is_disabled);
    element.closest('.form-group').querySelectorAll('button').forEach(item => {
      item.setAttribute('disabled', is_disabled);
    });
  }

}
