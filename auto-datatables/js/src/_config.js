// configurazione base
export const dt_config_base = {

  //dom                 : "<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>",
  paging                : true,
  //pagingType          : "bootstrap",
  processing            : true,
  serverSide            : true,
  autoWidth             : false,

  stateSave           : true,
  stateDuration       : -1, // = sessionStorage, // 3600 -> se val. in secondi, localstorage

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

    decimal             : ',',
    thousands           : '.',
    aria                : {
      sortAscending     : ' - Click o invio per ordinare in senso ascendente',
      sortDescending    : ' - Click o invio per ordinare in senso discendente'
    }
  }
};


/*
  ottimizzazione per bootstrap 4 la configurazione contenuta in
  estende `dt_config_base`
*/

export const dt_config_bs4 = {
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
  }
};

// Default class modification
export const dt_classes = {
  sWrapper          : 'datatable-wrapper',

  //CONTROLS
  sLength           : 'datatable-length',
  sLengthSelect     : 'form-control form-control-sm',
  sFilter           : 'datatable-filter',
  sFilterInput      : 'form-control form-control-sm',

  //PROCESSING
  sProcessing       : 'dataTables_processing'

  // INFO
  //sInfo           : "dataTables_info",

  // PAGINAZIONE
  //sPageButton     : "paginate_button page-item",
  //sPaging         : "dataTables_paginate paging_" // Note that the type is postfixed

  // SORTING
  //sSortAsc        : "sorting_asc",
  //sSortDesc       : "sorting_desc",
  //sSortable       : "sorting", // Sortable in both directions
  //sSortableAsc    : "sorting_asc_disabled",
  //sSortableDesc   : "sorting_desc_disabled",
  //sSortableNone   : "sorting_disabled",
  //sSortColumn     : "sorting_", // Note that an int is postfixed for the sorting order
};

/*
classi default (1.10)

$.extend( DataTable.ext.classes, {
	"sTable": "dataTable",
	"sNoFooter": "no-footer",

	// Paging buttons
	"sPageButton": "paginate_button",
	"sPageButtonActive": "current",
	"sPageButtonDisabled": "disabled",

	// Striping classes
	"sStripeOdd": "odd",
	"sStripeEven": "even",

	// Empty row
	"sRowEmpty": "dataTables_empty",

	// Features
	"sWrapper": "dataTables_wrapper",
	"sFilter": "dataTables_filter",
	"sInfo": "dataTables_info",
	"sPaging": "dataTables_paginate paging_", // Note that the type is postfixed
	"sLength": "dataTables_length",
	"sProcessing": "dataTables_processing",

	// Sorting
	"sSortAsc": "sorting_asc",
	"sSortDesc": "sorting_desc",
	"sSortable": "sorting", // Sortable in both directions
	"sSortableAsc": "sorting_asc_disabled",
	"sSortableDesc": "sorting_desc_disabled",
	"sSortableNone": "sorting_disabled",
	"sSortColumn": "sorting_", // Note that an int is postfixed for the sorting order

	// Filtering
	"sFilterInput": "",

	// Page length
	"sLengthSelect": "",

	// Scrolling
	"sScrollWrapper": "dataTables_scroll",
	"sScrollHead": "dataTables_scrollHead",
	"sScrollHeadInner": "dataTables_scrollHeadInner",
	"sScrollBody": "dataTables_scrollBody",
	"sScrollFoot": "dataTables_scrollFoot",
	"sScrollFootInner": "dataTables_scrollFootInner",

	// Misc
	"sHeaderTH": "",
	"sFooterTH": "",
} );
*/


export const creaDataTable_default_options = {

  dtRender: null, // utilizzato da autoDataTable

  icone: {
    ok  : '<span class="icona icona-ok">&#10003;</span>',
    off : '<span class="icona icona-off">&#10060;</span>'
  },

  id_visible_default: true,


  formats: {
    decimals_class: '',
    euro_class: '',
    // moment_datetime : 'D[&nbsp;]MMM[&nbsp;]YY[ <small>]HH:mm[</small>]',
    // moment_date     : 'D[&nbsp;]MMM[&nbsp;]YY'

    // opzioni per le funzione di formattazione data di _date_utilities.js
    date: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    time: {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    },
    datetime: {
      date: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      time: {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      },
      separator: ' ',  // date-time separator
      date_wrapper: '<span class="text-nowrap"></span>', // HTML string or null or ''
      time_wrapper: '<small></small>' // HTML string or null or ''
    }
  },


  debug: false,

  container_header: 'Risultato della ricerca', // se presente aggiunge un header prima della tabella
  container_class: 'dt_container', // classe che viene assegnata al div che contiene la tabella
  container_header_level: 2, // livello gerarchico dell'header (h2, h3, ecc...)
  table_id: 'table_result',
  table_class: 'table table-striped table-bordered table-hover',
  table_caption: '',
  table_footer: false, // se true aggiunge una riga tfoot alla tabella, da popolare con un callback
  extra_info:'',


  // parametri specifici per datatable
  datatable_options: {

    serverSide     : true,
    paging         : true,
    pageLength     : 25,
    language: {
      processing: '<div class="text-center">'+
        '<div class="spinner-border text-primary" role="status">' +
          '<span class="sr-only">Caricamento in corso...</span>' +
          '</div>' +
      '</div>'
    },

    // $grid-breakpoints: (
    //   xs: 0,
    //   sm: 576px,
    //   md: 768px,
    //   lg: 992px,
    //   xl: 1200px
    // );
    /*
    responsive       : {
      breakpoints: [
        { name: 'desktop', width: Infinity },
        { name: 'tablet',  width: 1024 },
        { name: 'phone',   width: 480 }
      ]
    },
    */
    // responsive       : true,
    // fixedHeader      : true,
    stateSave        : true,
    stateDuration    : -1, //sessionStorage
    columnDefs       : [{
      orderable      : true,
      targets        : ['_all']
    }],
    ajax             : null,
    order            : null,
    columns          : []

  } // end datatable_options
};
