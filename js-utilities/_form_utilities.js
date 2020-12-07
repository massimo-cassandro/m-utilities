/*

  import {submitErr, disableSubmitBtns, throwErr} from '@massimo-cassandro/m-utilities/js-utilities/_submit-disable-btns';


  riattivazione submit:
  disableSubmitBtns();

*/
// submit err
// TODO gestione validityState
import {mAlert} from '../mAlert-bs4/_mAlert';
export  function submitErr(title, mes) {

  document.querySelectorAll('[type="submit"]').forEach(el => {
    el.disabled = false;
  });

  mAlert({
    type  : 'error',
    title : title,
    mes   : mes || null
  });
  return false;
}


// disable buttons on submit
export function disableSubmitBtns() {
  document.querySelectorAll('form:not([data-disable-submit=false])').forEach( el => {
    el.addEventListener('submit', () => {
      el.querySelectorAll('[type=submit], [type=button]').forEach(el => {
        el.disabled = true;
      });
    });
  });
}


// throw err
export function throwErr(field, mes) {

  field.classList.add('is-invalid');
  let form_group = field.closest('.form-group'),
    label = form_group.querySelector('label');
  if(form_group && label ) {
    form_group.classList.add('is-invalid');
    label.focus({preventScroll:false});

  } else {
    field.focus({preventScroll:false});
  }
  throw mes;
}

