/* global mAlert */


/*
  inserire globalmente

  // disable btn on submit
  $('form').submit(function(){
    $(':submit').prop('disabled', true);
  });

  TODO gestione validityState

*/

export  function submit_err(title, mes) {
  'use strict';

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
