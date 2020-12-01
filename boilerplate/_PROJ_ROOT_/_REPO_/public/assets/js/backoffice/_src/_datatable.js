import {creaDataTable} from '@massimo-cassandro/m-utilities/auto-datatables/js/_creaDataTable';
// creaDataTable( $container, options = {}, bs4 = true )

import {autoDataTable} from '@massimo-cassandro/m-utilities/auto-datatables/js/_autoDataTable';
// autoDataTable( $container, cdt_options = {}, bs4 = true )

// // CONFIGURAZIONE DATATABLE
// // eslint-disable-next-line no-unused-vars
// var datatable_setup = {

//   datatable_options: {

//     serverSide     : true,
//     paging         : true,
//     pageLength     : 25,
//     language: {
//       processing: '<div class="text-center">'+
//         '<div class="spinner-border text-primary" role="status">' +
//           '<span class="sr-only">Caricamento in corso...</span>' +
//           '</div>' +
//       '</div>'
//     },

//     // $grid-breakpoints: (
//     //   xs: 0,
//     //   sm: 576px,
//     //   md: 768px,
//     //   lg: 992px,
//     //   xl: 1200px
//     // );
//     /*
//     responsive       : {
//       breakpoints: [
//         { name: 'desktop', width: Infinity },
//         { name: 'tablet',  width: 1024 },
//         { name: 'phone',   width: 480 }
//       ]
//     },
// */
//     responsive       : true,
//     stateSave        : true,
//     stateDuration    : -1, //sessionStorage
//     columnDefs       : [{
//       orderable      : true,
//       targets        : ['_all']
//     }],
//     ajax             : null,
//     order            : null,
//     columns          : []
//   },

//   icone: {
//     ok  : '<span class="icona icona-ok"></span>',
//     off : '<span class="icona icona-off"></span>'
//   },

//   id_visible_default: true,

//   formats: {
//     moment_datetime : 'D[&nbsp;]MMM[&nbsp;]YY[ <small>]HH:mm[</small>]',
//     moment_date     : 'D[&nbsp;]MMM[&nbsp;]YY'
//   },


//   //container_header: 'Risultato della ricerca', // se presente aggiunge un header prima della tabella

//   //container_class: 'dt_container', // classe che viene assegnata al div che contiene la tabella
//   //container_header_level: 2, // livello gerarchico dell'header (h2, h3, ecc...)
//   // table_id: 'table_result',
//   table_class: 'table table-striped table-bordered table-hover'
//   //table_caption: '',
//   //table_footer: false, // se true aggiunge una riga tfoot alla tabella, da popolare con un callback
//   //extra_info:''
// };
