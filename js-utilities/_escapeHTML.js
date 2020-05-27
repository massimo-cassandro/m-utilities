/*
  escapeHTML
*/

export  function escapeHTML(str) {
  'use strict';

  let characters = {
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#039;',
    '<': '&lt;',
    '>': '&gt;'
  };

  return (str + '').replace(/[<>&"']/g, function(m){
    return characters[m];
  });
}
