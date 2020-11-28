/* global mAlert */


/*
  inserire globalmente

  import disableSubmitBtns from '@massimo-cassandro/m-utilities/js-utilities/_submit-disable-btns';

  // disable btn on submit
  disableSubmitBtns();

  TODO gestione validityState

*/

export  function submit_err(title, mes) {

  document.querySelectorAll('[type="submit"]').forEach(el => {
    el.disabled = false;
    // el.closest('form').classList.add('is-invalid');
  });

  mAlert({
    type  : 'error',
    title : title,
    mes   : mes || null
  });
  return false;
}
