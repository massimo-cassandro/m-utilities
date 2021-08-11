// basato sulla classe `PartitaIVA` di Umberto Salsi <salsi@icosaedro.it>
// http://www.icosaedro.it/cf-pi/index.html

export function controllo_partita_iva(piva='') {

  piva = piva.replace(/\s/g, '');

  if( piva.length !== 11 ) {
    return false;
  }

  if( !/^[0-9]{11}$/.test(piva) ) {
    return false;
  }

  let s = 0;
  for(let i = 0; i < 11; i++ ){
    let n = piva.charCodeAt(i) - '0'.charCodeAt(0);

    if( (i & 1) === 1 ){
      n *= 2;
      if( n > 9 ) n -= 9;
    }
    s += n;
  }

  if( s % 10 !== 0 ) {
    return false;
  }

  return true;
}
