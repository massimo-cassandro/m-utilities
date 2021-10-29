import {_creaDataTable} from '@massimo-cassandro/m-utilities/auto-datatables/js/creaDataTable-bs5-no-jq';
import {_autoDataTable} from '@massimo-cassandro/m-utilities/auto-datatables/js/autoDataTable-bs5-no-jq';
import app_data from '../../globali/get-app-data';

const datatable_setup = {

    datatable_options: {

      serverSide     : true,
      paging         : true,
      pageLength     : 25,
      language: {
        processing: '<div class="text-center">'+
          '<div class="spinner-border text-primary" role="status">' +
            '<span class="visually-hidden">Caricamento in corso...</span>' +
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
    }, // end datatable_options

    icone: {
      ok  : '<span class="icona icona-ok"></span>',
      off : '<span class="icona icona-off"></span>'
    },

    id_visible_default: app_data.superAdmin,

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

    container_header: '', //'Risultato della ricerca', // se presente aggiunge un header prima della tabella

    //container_class: 'dt-container', // classe che viene assegnata al div che contiene la tabella
    //container_header_level: 2, // livello gerarchico dell'header (h2, h3, ecc...)
    // table_id: 'table_result',
    table_class: 'table table-striped table-bordered table-hover'
    //table_caption: '',
    //table_footer: false, // se true aggiunge una riga tfoot alla tabella, da popolare con un callback
    //extra_info:''
  },

  jq = '/libs/jquery.min.js';

// container: oggetto DOM o stringa selettore
export function crea_datatable(container, dt_columns) {
  let dt_opts = Object.assign({}, datatable_setup.datatable_options, {columns: dt_columns});
  return _creaDataTable( container,
    Object.assign({}, datatable_setup, {datatable_options: dt_opts}),
    jq
  );
}

export function auto_datatable(container) {
  return _autoDataTable( container, datatable_setup, jq);
}

export function dt_reload(dt_element) {
  $(dt_element).DataTable().ajax.reload();
}
