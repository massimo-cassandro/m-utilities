/*
  rilevazione breakpoint bootstrap 4
  utilizza il css _checkmq.scss

  ispirato da https://github.com/maciej-gurban/responsive-bootstrap-toolkit

*/

my_app.mq = {

  init: function () {
    'use strict';

    // costruisce la struttura per il rilevamento del breakpoint
    $(document.body).append(
      '<div class="ada_checkmq">' +
        '<span class="d-sm-none" data-mq="xs"></span>' +
        '<span class="d-none d-sm-inline d-md-none" data-mq="sm"></span>' +
        '<span class="d-none d-md-inline d-lg-none" data-mq="md"></span>' +
        '<span class="d-none d-lg-inline d-xl-none" data-mq="lg"></span>' +
        '<span class="d-none d-xl-inline" data-mq="xl"></span>' +
      '</div>'
    );

    my_app.current_mq = my_app.mq.check(); // restituisce la strinmga del breakpoint

    // listener sul resize della finestra, per il monitoraggio della media query
    // my_app.mq.check() aggiunge al tag body la classe 'gte_md' se il breakpoint
    // è >=md
    var resizeTimer;
    $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        my_app.current_mq = my_app.mq.check();
      }, 250);
    });

    // ResizeObserver nn supportato da edge e safari
    // const ro = new ResizeObserver( () => {
    //   my_app.current_mq = my_app.mq.check();
    // });
    // ro.observe(document.body);

  },

  // restituisce il breakpoint corrente
  check : function () {
    'use strict';
    var currentmq = $('.ada_checkmq span').filter(':visible').data('mq');

    my_app.gte_md = this.match(currentmq, '>=md');
    $(document.documentElement).toggleClass('gte_md', my_app.gte_md );

    return currentmq;
  },

  match: function (breakpoint, expression) {

    // restituisce true o false in base al confronto tra breakpoint ed expression
    // breakpoint è una stringa tra xs, sm, md...
    // expression è un stringa di questo tipo: '==xs', '>md', '<=sm', ecc...

    expression = expression.trim().toLowerCase();

    var breakpoints_idxs = {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5
      },

      breakpoint_operatore = breakpoints_idxs[expression.substr(-2)],
      breakpoint_idx = breakpoints_idxs[breakpoint.trim()],
      operatore = expression.substring(0, expression.length -2).trim(),

      operazioni = {
        '==' : function (a,b) { return a === b;},
        '!=' : function (a,b) { return a !== b;},
        '>'  : function (a,b) { return a > b;},
        '<'  : function (a,b) { return a < b;},
        '>=' : function (a,b) { return a >= b;},
        '<=' : function (a,b) { return a <= b;}
      };

    return operazioni[operatore](breakpoint_idx, breakpoint_operatore);
  }

};

my_app.mq.init();
