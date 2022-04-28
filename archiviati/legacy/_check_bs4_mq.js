/*
  rilevazione breakpoint bootstrap 4

  ispirato da https://github.com/maciej-gurban/responsive-bootstrap-toolkit

*/

if(typeof mUtilities === 'undefined') {
  var mUtilities = {};
}

mUtilities.check_bs4_mq = (callback) => {

  // costruisce la struttura per il rilevamento del breakpoint
  document.body.insertAdjacentHTML("beforeend",
    '<div class="m-checkmq d-block" style="height:1px;width:1px;overflow:hidden">' +
      '<span class="d-sm-none" data-mq="xs"></span>' +
      '<span class="d-none d-sm-inline d-md-none" data-mq="sm"></span>' +
      '<span class="d-none d-md-inline d-lg-none" data-mq="md"></span>' +
      '<span class="d-none d-lg-inline d-xl-none" data-mq="lg"></span>' +
      '<span class="d-none d-xl-inline" data-mq="xl"></span>' +
    '</div>'
  );

  const checkmq_elements = document.querySelectorAll('.m-checkmq span');

  // restituisce il breakpoint corrente
  const checkmq = () => {

    const brtkpts = ['xs', 'sm', 'md', 'lg', 'xl'];

    // https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom/21696585#21696585
    // Where el is the DOM element you'd like to test for visibility
    const isHidden = el => {
      return el.offsetParent === null;
    };
    let this_brkpt_idx;
    checkmq_elements.forEach(el => {
      if( !isHidden(el)) {
        this_brkpt_idx = brtkpts.indexOf(el.dataset.mq);
      }
    });

    document.documentElement.dataset.mq = JSON.stringify(brtkpts.slice(0, this_brkpt_idx+1));

    if(callback && typeof callback === 'function') {
      callback();
    }

  };

  // listener sul resize della finestra, per il monitoraggio della media query
  if('ResizeObserver' in window ) {
    //ResizeObserver nn supportato da edge e safari
    const ro = new ResizeObserver( () => {
      checkmq();
    });
    ro.observe(document.body);

  } else {

    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        checkmq();
      }, 250);
    });

  }

  checkmq();

};
