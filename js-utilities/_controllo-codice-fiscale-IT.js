// basato sulla classe `CodiceFiscale` di Umberto Salsi <salsi@icosaedro.it>
// http://www.icosaedro.it/cf-pi/index.html

import {controllo_partita_iva} from './_controllo-partita-iva-IT';

export function controllo_codice_fiscale(cf) {

  cf = cf.replace(/\s/g, '').toUpperCase();


  const controllo_cf = cf => {
    if( ! /^[0-9A-Z]{16}$/.test(cf) )
      return false;

    var s = 0;
    var even_map = 'BAFHJNPRTVCESULDGIMOQKWZYX';
    for(var i = 0; i < 15; i++){
      var c = cf[i];
      var n = 0;
      if( '0' <= c && c <= '9' ) {
        n = c.charCodeAt(0) - '0'.charCodeAt(0);
      } else {
        n = c.charCodeAt(0) - 'A'.charCodeAt(0);
      }
      if( (i & 1) === 0 ) {
        n = even_map.charCodeAt(n) - 'A'.charCodeAt(0);
      }
      s += n;
    }
    if( s % 26 + 'A'.charCodeAt(0) !== cf.charCodeAt(15) ) {
      return false;
    }
    return true;
  };



  if( cf.length === 11 ) {
    return controllo_partita_iva(cf); // il codice fiscale può corrispondere alla partita IVA

  } else if( cf.length === 16 )
    return controllo_cf(cf);

  else {
    return false;
  }

}
