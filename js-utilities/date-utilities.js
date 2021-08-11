// test: test/date_utilities.html

export function isValidDate( date ) {

  // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
  try {

    if(typeof date === 'string') {
      date = new Date (date);
    }

    if (Object.prototype.toString.call(date) === '[object Date]') {
      // it is a date
      if (isNaN(date.getTime())) {  // date.valueOf() could also work
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    console.error(e); // eslint-disable-line
    return false;
  }
}

export function minutesToHour(minutes) {
  // converte un valore in minuti una stringa nella forma hh:mm
  minutes = +minutes || 0;

  return ('00' + String(Math.floor(minutes/60))).slice(-2) + ':' +
    ('00' + String(Math.ceil(minutes % 60))).slice(-2);
}

export function dateFromISO(iso_str) {
  // converte una stringa iso (con o senza ora) in un oggetto date
  // restituisce false nel caso la data non sia corretta
  // alla data viene aggiunto il valore del fuso
  // (che non deve quindi essere presente nella stringa)

  try {
    iso_str = iso_str.trim();
    let now = new Date(),
      timeOffset = now.getTimezoneOffset();

    if(iso_str.length < 10) { // data probabilmente con numeri a una cifra
      let tmp = iso_str.split('-');
      iso_str = tmp[0] + '-' +
        ('00' + tmp[1]).slice(-2) + '-' +
        ('00' + tmp[2]).slice(-2);
    }

    if(iso_str.length <= 10) { // data yyyy-mm-dd
      iso_str += 'T00:00:00';
    }

    iso_str = iso_str.replace(/ /, 'T') +
      (timeOffset > 0? '-' : '+') +
      minutesToHour(Math.abs(timeOffset));

    let d = new Date(iso_str);
    if(isValidDate(d)) {
      return d;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e); // eslint-disable-line
    return false;
  }
}

export function dateStringToISO(dateString = '', consider_time = false) {
  // restituisce la porzione della data da una stringa datetime ISO
  // aggiunge 'Z' alla stringa, se necessario, per evitare modifiche dovute alla timezone
  try {

    if(dateString && dateString.length > 10 && !/Z$/.test(dateString)) {
      dateString += 'Z';
    }

    if(!isValidDate( dateString )) {
      throw new Error( 'Invalid Date' );
    }

    let d = dateString? new Date(dateString) : new Date();
    return d.toISOString().substr(0, consider_time? 16 : 10); // i secondi sono sempre ignorati

  } catch (e) {
    console.error(e); // eslint-disable-line
    return false;
  }
}


export function formatDate(d = '', format_options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}) {
  try {
    if(typeof d === 'string') {
      d = d? new Date(d) : new Date();
    }
    if(!isValidDate( d )) {
      throw new Error( 'Invalid Date' );
    }
    return d.toLocaleDateString('it-IT', format_options);

  } catch (e) {
    console.error(e); // eslint-disable-line
    return false;
  }
}

export function formatTime(d = '', format_options = {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit'
}) {
  try {
    if(typeof d === 'string') {
      d = d? new Date(d) : new Date();
    }
    if(!isValidDate( d )) {
      throw new Error( 'Invalid Date' );
    }
    return d.toLocaleTimeString('it-IT', format_options);

  } catch (e) {
    console.error(e); // eslint-disable-line
    return false;
  }
}

export function formatDateTime(d = '', format_options) {
  const default_options = {
    date: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    time: {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    },
    separator: ' ',  // date-time separator
    date_wrapper: '<span class="text-nowrap"></span>', // HTML string or null or ''
    time_wrapper: '<small></small>' // HTML string or null or ''
  };

  format_options = Object.assign({}, default_options, format_options);

  try {
    if(typeof d === 'string') {
      d = d? new Date(d) : new Date();
    }
    if(!isValidDate( d )) {
      throw new Error( 'Invalid Date' );
    }
    let str = '', w;

    if(format_options.date_wrapper) {
      w = document.createElement('div');
      w.innerHTML = format_options.date_wrapper;
      w.lastChild.innerHTML = formatDate(d, format_options.date);
      str += w.innerHTML;

    } else {
      str += formatDate(d, format_options.date);
    }

    str += format_options.separator;

    if(format_options.time_wrapper) {
      w = document.createElement('div');
      w.innerHTML = format_options.time_wrapper;
      w.lastChild.innerHTML = formatTime(d, format_options.time);
      str += w.innerHTML;

    } else {
      str += formatTime(d, format_options.time);
    }

    return str;

  } catch (e) {
    console.error(e); // eslint-disable-line
    return false;
  }
}

