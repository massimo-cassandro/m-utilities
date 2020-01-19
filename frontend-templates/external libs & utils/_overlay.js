// appende al body un overlay che agisce su tutta la pagina
// se l'opzione full_page è false, resituisce la stringa
/*
  ESEMPI UTILIZZO:

  my_app.overlay({bg: 'bianco', full_page : false}); // genera un overlay bianco 70% (da appendere ad un elemento posizionato)
*/
my_app.overlay = function (options) {
  'use strict';

  var default_options = {
      full_page : true,
      content   : '',
      bg        : 'std', // std (nero 80%), chiaro (nero 40%), bianco (bianco 70%)
      blur      : false   // applica il blur al contentuo (solo full-page)
    },

    opts = $.extend({}, default_options, options),
    _class = 'overlay';

  if(opts.bg.toLowerCase() !== 'std') {
    _class += ' overlay-' + opts.bg.toLowerCase();
  }

  if(opts.full_page) {
    $(document.body).append('<div class="' + _class + '">' + opts.content + '</div>')
      .addClass('has-overlay');

    if( opts.blur ) {
      $(document.body).addClass('has-blur');
    }

    return;

  } else {
    return '<div class="' + _class + '">' + opts.content + '</div>';
  }
};
my_app.overlay_remove = function (_context) {
  'use strict';
  _context = _context || $(document);

  $('.ada_overlay', _context).remove();
  $(document.body).removeClass('has-overlay has-blur');
};
