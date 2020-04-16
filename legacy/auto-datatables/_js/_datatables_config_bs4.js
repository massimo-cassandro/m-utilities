/*
  estende e ottimizza per bootstrap 4 la configurazione contenuta in
  _datatables_config_base.js
*/

//* eslint no-console: 1 */

$.extend( true, $.fn.dataTable.defaults, {
  dom:
    "<'row d-print-none'<'col-sm-6'l><'col-sm-6'f>>" +      // controlli
    //"<'position-relative'tr>" +                // table + processing
    "<'row'<'col-sm-12 position-relative'tr>>" +   // table + processing
    "<'row mt-2 d-print-none'<'col-sm-5 col-md-6 small'i><'col-sm-7 col-md-6'p>>", // info + paginazione
  renderer: 'bootstrap',

  stripeClasses: [], // disabilita stripe classes

  language              : {
    lengthMenu          : '<div>Mostra</div><div class="dt-control">_MENU_</div><div>record per pagina</div>',
    search              : '<div>Filtra risultati:</div><div class="dt-control">_INPUT_</div>'
  }
});

// Default class modification
$.extend( $.fn.dataTable.ext.classes, {
  sWrapper          : "datatable-wrapper",

  //CONTROLS
  sLength           : "datatable-length",
  sLengthSelect     : "form-control form-control-sm",
  sFilter           : "datatable-filter",
  sFilterInput      : "form-control form-control-sm",

  //PROCESSING
  sProcessing       : "dataTables_processing"

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
});

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
