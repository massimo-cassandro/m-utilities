const dt_config_bs5 = {
  dom:
    // controlli
    '<\'row justify-content-between d-print-none\'<\'col-sm-auto\'l><\'col-sm-auto\'f>>' +
    // table + processing
    //"<'position-relative'tr>" +
    // table + processing
    '<\'position-relative\'<\'table-responsive-md\'t>r>' +
    // info + paginazione
    '<\'row mt-2 d-print-none\'<\'col-sm-5 col-md-6 small\'i><\'col-sm-7 col-md-6\'p>>',

  renderer: 'bootstrap',

  stripeClasses: [], // disabilita stripe classes

  language              : {
    lengthMenu          : '<div class="d-sm-flex">' +
                            '<div>Mostra</div>' +
                            '<div class="dt-control mx-sm-2">_MENU_</div>' +
                            '<div>record per pagina</div>' +
                          '</div>',
    search              : '<div class="d-sm-flex">' +
                            '<div class="mr-sm-2">Filtra risultati:</div>' +
                            '<div class="dt-control">_INPUT_</div>' +
                          '</div>',
    processing:         '<div class="text-center">'+
                          '<div class="spinner-border text-primary" role="status">' +
                            '<span class="visually-hidden">Caricamento in corso...</span>' +
                            '</div>' +
                        '</div>'
  }
};
export default dt_config_bs5;
