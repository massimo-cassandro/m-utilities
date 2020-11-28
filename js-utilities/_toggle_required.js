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
    field.setAttribute('required', is_required);
    field.closest('.form-group').classList.toggle('required', is_required);
  }

}
