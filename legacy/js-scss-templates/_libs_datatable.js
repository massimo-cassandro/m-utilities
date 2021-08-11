/* exported datatable_setup */

// CONFIGURAZIONE DATATABLE

/*
@codekit-append quiet '__path_to_node_modules__/datatables.net/js/jquery.dataTables.js'
@codekit-append quiet '__path_to_node_modules__/datatables.net-bs4/js/dataTables.bootstrap4.js'

// extensions
@codekit-append quiet '__path_to_node_modules__/datatables.net-responsive/js/dataTables.responsive.js';
--codekit-append quiet '__path_to_node_modules__/datatables.net-responsive-bs4/js/responsive.bootstrap4.js'

--codekit-append quiet '__path_to_node_modules__/datatables.net-fixedheader/js/dataTables.fixedHeader.js'
--codekit-append quiet '__path_to_node_modules__/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.js'

@codekit-append quiet '__path_to_node_modules__/datatables.net-rowreorder/js/dataTables.rowReorder.js'
--codekit-append '__path_to_node_modules__/datatables.net-rowreorder-bs4/js/rowReorder.bootstrap4.js'

//config
@codekit-append '__path_to_node_modules__/auto-datatables/_js/_datatables_config_base.js'
@codekit-append '__path_to_node_modules__/auto-datatables/_js/_datatables_config_bs4.js'
@codekit-append '__path_to_node_modules__/auto-datatables/_js/_datatable_crea_dt.js'
*/

var datatable_setup = {

  datatable_options: {

    serverSide     : true,
    paging         : true,
    pageLength     : 25,
    language: {
      processing: '<div class="spinner-border text-primary" role="status">' +
      '<span class="sr-only">Caricamento in corso...</span>' +
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
    responsive       : true,
    stateSave        : true,
    stateDuration    : -1, //sessionStorage
    columnDefs       : [{
      orderable      : true,
      targets        : ['_all']
    }],
    ajax             : null,
    order            : null,
    columns          : []
  },

  icone: {
    ok  : '<span class="icona icona-ok"></span>',
    off : '<span class="icona icona-off"></span>'
  },

  id_visible_default: __isStaff? true : false,

  formats: {
    moment_datetime : 'D[&nbsp;]MMM[&nbsp;]YYYY[&nbsp;<small>]HH:mm[</small>]',
    moment_date     : 'D[&nbsp;]MMM[&nbsp;]YYYY'
  },


  //container_header: 'Risultato della ricerca', // se presente aggiunge un header prima della tabella

  //container_class: 'dt-container', // classe che viene assegnata al div che contiene la tabella
  //container_header_level: 2, // livello gerarchico dell'header (h2, h3, ecc...)
  // table_id: 'table_result',
  table_class: 'table table-striped table-bordered table-hover'
  //table_caption: '',
  //table_footer: false, // se true aggiunge una riga tfoot alla tabella, da popolare con un callback
  //extra_info:''
};
