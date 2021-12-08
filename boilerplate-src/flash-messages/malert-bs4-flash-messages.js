// TODO multiple messages
import {mAlert} from '../../mAlert-bs4/_mAlert';

export default function () {

  let messages = JSON.parse(document.currentScript.dataset.m),
    type, title, text = [];

  messages.forEach(mes => {
    type = mes.t.toLowerCase(); // <== l'ultimo messaggio determina il tipo
    text.push(mes.m);

    // l'ultimo messaggio determina il titolo
    if(type === 'success') {
      title = 'Operazione completata'

    } else if(type === 'warning') {
      title = 'Attenzione!';

    } else {
      type = 'info';
      title = '';
    }
  });

  const params = {
    type        : type,
    title       : title,
    mes         : `<p>${text.join('</p><p>')}</p>`,
    timer       : type === 'success' ? 5000 : null,
    ok_btn_text : 'OK'
  };

  if(document.currentScript.dataset.dev) {
    /* eslint-disable */
    console.groupCollapsed('Flash message');
    console.table(params);
    console.groupEnd();
    /* eslint-enable */
  }

  mAlert(params);
}
