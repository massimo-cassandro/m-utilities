/**
 * email_antispam
 * Nasconde le email agli spammer
 * sostituire i tag mailto con
 *
 *    <span data-as-e="xxxx" data-as-d="xxxx/it">__argument__</span>
 *
 * dove:
 *  - `e` è la porzione utente dell'indirizzo email (prima della chiocciola)
 *  - `d` è il dominio (dopo la chiocciola). Se è indicato un dominio di default
 *        può essere omesso. È possibile sostituire i punti con lo slash ('/')
 *        per rendere meno riconoscibile il dominio
 * - `__argument__` è il testo (opzionale) da mostrare. Se non è presente viene
 *                  mostrato l'indirizzo email (offuscato)
 */

export  function obfuscate_email (email) {

  const rand_string = () => {
    const chars='abcedefghjilmnopqestuvwxyz ABCEDEFGHJILMNOPQESTUVWXYZ 0123456789' +
      '\n\t“”"«»%$£&/()=?^*é§°çòàù+èùàò-_.:,;',
      lunghezza = 4;

    let str = '', i, pos;

    for( i = 0; i < lunghezza; i++ ) {
      pos = Math.floor(Math.random() * chars.length);
      str += chars.charAt(pos);
    }
    return str;
  };

  let encoded_email = '';
  email.split('').forEach((char, idx) => {
    if([2,5,6,79,10,13,15,20,22].indexOf(idx) !== -1) {
      encoded_email += `<span style="display:none" aria-hidden="true">${rand_string()}</span>`;
    }
    if( char === '@') {
      encoded_email += '<span>&commat;</span><wbr>';

    } else if (char === '.') {
      encoded_email += '<span>&#x0002E;</span>';

    } else if (char === '-') {
      encoded_email += '<span>&#x02010;</span><span></span>';

    } else if (char === '_') {
      encoded_email += '<span>&lowbar;</span><span></span>';

    } else if(idx % 2 == 0) {
      encoded_email += `&#${email.charCodeAt(idx)};`;

    } else {
      encoded_email += char;
    }

  });
  return encoded_email;

}

export function email_antispam (options) {

  const default_options = {
    default_domain: null
  };

  options = Object.assign(default_options, options);

  if( Object.assign && typeof Object.assign === 'function') {
    options = Object.assign(default_options, options);

  } else { // IE
    let opts = {};
    for(let i in default_options) {
      opts[i] = options[i] ? options[i] : default_options[i];
    }
    options = opts;
  }

  document.querySelectorAll('[data-as-e]').forEach(el => {
    let domain = el.dataset.asD || options.default_domain;
    if(domain) {
      domain = domain.replace(/\//g, '.');
      let email = el.dataset.asE + '@' + domain,
        content = el.innerHTML || obfuscate_email(email);

      // el.innerHTML = `<a href="mailto:${email}" target="_blank" rel="noopener noreferrer">${content}</a>`;

      el.innerHTML = `<a href="#" target="_blank" rel="noopener noreferrer">${content}</a>`;
      el.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `mailto:${email}`;
      }, false);
    }
  });
}


