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
