/*
  toggle required attribute of given field according to `is_required` parameter
  toggle `required` class to closest `.form-group` parent

  Works both with jquery and vanilla dom objects

*/
export default function (field, is_required) {

  if(window.jQuery !== undefined && field instanceof window.jQuery) {
    field.prop('required', is_required)
      .closest('.form-group').toggleClass('required', is_required);

  } else {
    if(is_required) {
      field.setAttribute('required', true);
    } else {
      field.removeAttribute('required');
    }
    let form_group = field.closest('.form-group');
    if(form_group) {
      form_group.classList.toggle('required', is_required);
    }
  }

}
