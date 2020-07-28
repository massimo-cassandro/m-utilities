/*
  toggle disabled attribute of given field according to `is_disabled` parameter
  toggle `disabled` class to closest `.form-group` parent
  and `disabled` attribute children buttons

  Works both with jquery and vanilla dom objects

*/
export default function (field, is_disabled) {
  'use strict';

  if(window.jQuery !== undefined && field instanceof window.jQuery) {
    field.prop('disabled', is_disabled)
      .closest('.form-group').toggleClass('disabled', is_disabled)
      .find('button').prop('disabled', is_disabled);

  } else {
    field.setAttribute('disabled', is_disabled);
    field.closest('.form-group').classList.toggle('disabled', is_disabled);
    field.closest('.form-group').querySelectorAll('button').forEach(item => {
      item.setAttribute('disabled', is_disabled);
    });
  }

}
