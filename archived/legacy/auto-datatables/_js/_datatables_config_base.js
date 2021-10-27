$.extend( true, $.fn.dataTable.defaults, {

  //dom                 : "<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>",
  paging                : true,
  //pagingType          : "bootstrap",
  processing            : true,
  serverSide            : true,
  autoWidth             : false,

  stateSave           : true,
  stateDuration       : 3600, //-1 = sessionStorage,

  //caseInsensitive     : true, // default true

  language              : {
    emptyTable          : 'Nessun record trovato',
    processing          : '<div class="classic_spinner"><div><div>Caricamento in corso&hellip;</div></div></div>', //'Attendi...',
    info                : 'Stai visualizzando le righe da _START_ a _END_ su un totale di <strong>_TOTAL_</strong> record trovati',
    infoEmpty           : '<strong>Nessun record trovato</strong>',
    infoFiltered        : '(filtrati da <strong>_MAX_</strong> record)',
    infoPostFix         : '',
    lengthMenu          : '<span>Mostra</span> _MENU_ <span>record per pagina</span>',
    loadingRecords      : '<em class="small">Attendi&hellip;</em>',
    search              : '<span>Filtra risultati</span>',
    zeroRecords         : '<strong>Nessun record trovato</strong>',
    url                 : '',

    paginate            : {
      first             : '',
      previous          : '',
      next              : '',
      last              : ''
    },

    decimal             : ",",
    thousands           : ".",
    aria                : {
      sortAscending     : ' - Click o invio per ordinare in senso ascendente',
      sortDescending    : ' - Click o invio per ordinare in senso discendente'
    }
  }
});
