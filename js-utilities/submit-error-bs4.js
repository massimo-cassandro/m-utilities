/*

  import submitErr from '@massimo-cassandro/m-utilities/js-utilities/submit-error-bs4';

*/
// submit err
// TODO gestione validityState
import {mAlert} from '../mAlert-bs4/mAlert';
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
