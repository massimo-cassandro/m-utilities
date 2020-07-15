export  function number_format (number, decimals) {
  'use strict';

  if(decimals === undefined) decimals=0;
  number = Number( number);

  if(decimals) {
    number = Math.round((number + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
  } else {
    number = Math.round(number);
  }
  return number.toLocaleString('it-IT', { minimumFractionDigits: decimals });

  // function toLocaleStringSupportsLocales() {
  //   var nn = 0;
  //   try {
  //     nn.toLocaleString('i');
  //   } catch (e) {
  //     return e.name === 'RangeError';
  //   }
  //   return false;
  // }

  // if(toLocaleStringSupportsLocales()) {
  //   // Math.round((delta + Number.EPSILON) * 100) / 100;
  //   number = Number(number.toFixed(decimals));
  //   return number.toLocaleString('it-IT', { minimumFractionDigits: decimals });

  // } else {

  //   // http://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript
  //   number = number.toFixed( decimals );
  //   var number_parts = String(number).split('.');

  //   return number_parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ( decimals ? ',' + number_parts[1] : '');
  // }
}

