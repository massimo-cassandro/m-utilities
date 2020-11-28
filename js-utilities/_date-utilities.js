export const date_utilities = {

  is_valid_date: function(d) {
    // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    try {
      if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d.getTime())) {  // d.valueOf() could also work
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
  },

  minutesToHour: function(minutes) {
    // converte un valore in minuti una stringa nella forma hh:mm
    minutes = +minutes || 0;

    return ('00' + String(Math.floor(minutes/60))).slice(-2) + ':' +
      ('00' + String(Math.ceil(minutes % 60))).slice(-2);

  },

  date_from_iso: function(iso_str) {
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
        this.minutesToHour(Math.abs(timeOffset));

      let d = new Date(iso_str);
      if(this.is_valid_date(d)) {
        return d;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e); // eslint-disable-line
      return false;
    }
  }

};
