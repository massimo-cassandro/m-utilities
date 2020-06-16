export default function (min_length) {
  'use strict';

  let chars='ABCDEFGHJKLMNPQRSTUVWXYZ123456789',
    charsNum = chars.length,
    min_lenght = min_length || 8,
    pwd = '', i, x;

  for( x = 0; x < min_lenght; x++ ) {
    i = Math.floor(Math.random() * charsNum);
    pwd += chars.charAt(i);
  }

  return pwd;

}
