export const date_utilities = {

  is_valid_date: d => {
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

  date_from_iso: iso_str => {
    // converte una stringa iso (con o senza ora) in un oggetto date
    // restituisce false nel caso la data non sia corretta
    try {
      let d = new Date(iso_str.replace(/ /, 'T'));
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
