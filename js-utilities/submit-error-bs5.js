/*

  import submitErr from '@massimo-cassandro/m-utilities/js-utilities/submit-error-bs5';

*/
// submit err
// TODO gestione validityState
import mAlert from '../m-alert-bs5/m-alert';
export default function submitErr(title, mes) {

  document.querySelectorAll('[type="submit"], [type=button]').forEach(el => {
    el.disabled = false;
  });

  mAlert({
    type  : 'error',
    title : title,
    mes   : mes || null
  });
  return false;
}
