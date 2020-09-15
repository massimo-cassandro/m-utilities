// from https://www.codegrepper.com/code-examples/javascript/javascript+truncate+string+full+word
export function truncate(str, max, suffix) {
  'use strict';
  suffix = suffix || '…';
  return str.length < max ? str :
    `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
}
