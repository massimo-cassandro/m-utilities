import dt from 'datatables.net/js/jquery.dataTables';
import dt_bs5 from 'datatables.net-bs5/js/dataTables.bootstrap5';

import * as dt_config from './src/config-base';
import dt_config_bs5 from './src/config-bs5';
import creaDataTable_default_options from './src/creaDatatable-defaults';


/*
  creaDataTable
  Genera un datatable da un flusso JSON

  * $container è il div entro cui generare il datatable
    può essere un selettore, un elemento DOM o un oggetto jQuery
  * options è un oggetto che contiene i parametri necessari per la configurazione
      tra cui `datatable_options`, un oggetto con le impostazioni richieste da DataTable.
      Se non impostato, viene utilizzato il default incluso nel file `_config.js`

  Restituisce l'istanza del datatable generato
*/



function run_creaDataTable( $container, options) {

  if(!window.$) {
    window.$ = window.jQuery;
  }

  $.fn.dataTable = dt(window,$);
  $.fn.DataTable.ext = dt_bs5(window,$);

  if(!($container instanceof $)) {
    $container = $($container);
  }

  // configurazione default datatable
  $.extend( true, $.fn.dataTable.defaults,

    dt_config.dt_config_base,
    dt_config_bs5
  );
  $.extend( $.fn.DataTable.ext.classes, dt_config.dt_classes );


  options = $.extend(true, {}, creaDataTable_default_options, options);

  options.table_id = 'cdt_' + ( $container.attr('id') ? $container.attr('id') : 'dom_' + $container.index());
  $container.html('');

  // eliminazione parametri di ricerca salvati se la pagina di provenienza non
  // inclusa nel parametro options.dtRender.storageAllowedReferrers
  // NB: controllo eseguito solo se storageAllowedReferrers !== null e undefined (= tutte le pagine ammesse)
  // per disabilitare il salvataggio usare l'opzione `stateSave = false`,
  if(options.dtRender && options.dtRender.storageAllowedReferrers !== null &&
      options.dtRender.storageAllowedReferrers !== undefined && document.referrer) {
    let allowed_referrer = false;
    options.dtRender.storageAllowedReferrers.forEach(item => {
      if(new RegExp(item).test(document.referrer)) {
        allowed_referrer = true;
      }
    });

    if(!allowed_referrer) {

      if(options.datatable_options.stateDuration === -1) {
        sessionStorage.removeItem( 'DataTables_' + options.table_id);

      } else {
        localStorage.removeItem( 'DataTables_' + options.table_id );

      }
    }
  }


  // salvataggio parametri form ricerca
  if(options.datatable_options.stateSave && options.dtRender && options.dtRender.bindToForm) {

    options.datatable_options.stateSaveCallback = function(settings, data) {

      let search_form_data = Object.fromEntries(
        new FormData(document.getElementById(options.dtRender.bindToForm))
      );

      data.search_form_data = JSON.parse(JSON.stringify(search_form_data));

      if(options.datatable_options.stateDuration === -1) {
        sessionStorage.setItem( 'DataTables_' + settings.sInstance, JSON.stringify(data) );

      } else {
        localStorage.setItem( 'DataTables_' + settings.sInstance, JSON.stringify(data) );
      }

    };

    options.datatable_options.stateLoadCallback = function(settings) {
      let _storage;



      if(options.datatable_options.stateDuration === -1) {
        _storage = JSON.parse( sessionStorage.getItem( 'DataTables_' + settings.sInstance ) );

      } else {
        _storage = JSON.parse( localStorage.getItem( 'DataTables_' + settings.sInstance ) );
      }

      if(_storage && _storage.search_form_data) {
        let form = $('#' + options.dtRender.bindToForm);
        for( let i in _storage.search_form_data ) {
          $(`[name="${i}"]`, form).val(_storage.search_form_data[i]);
        }

        // form.submit();
        settings.ajax = form.attr('action') + '?' + form.serialize();

      }

      return _storage;
    };

  } // end salvataggio parametri form ricerca

  if(options.container_header) {
    $container.html('<h' + options.container_header_level + '>' + options.container_header + '</h' + options.container_header_level + '>');
  }

  let table_cells_length =
    (!options.datatable_options.columns && options.datatable_options.aoColumns) ?
      options.datatable_options.aoColumns.length : options.datatable_options.columns.length;


  $container.addClass((options.container_class + ' m-datatable').trim())
    .append(
      '<table id="' + options.table_id + '" class="' + options.table_class + '">' +
      (options.table_caption? '<caption>'+options.table_caption+'</caption>' : '') +
      '<thead><tr>' + new Array(table_cells_length + 1).join('<th scope="col"></th>') + '</tr></thead>'+
      (options.table_footer? '<tfoot><tr>' + new Array(table_cells_length + 1).join('<td></td>') + '</tr></tfoot>' : '') +
      '</table>' +
      (options.extra_info? '<p class="text-muted small">' + options.extra_info + '</p>': '')
    );

  if( options.legacy ) { $.fn.dataTable.ext.legacy.ajax = true; }

  $container.data('table_id', options.table_id);

  // let dt;
  // if(options.jQueryObj) {
  //   dt = $('#' + options.table_id ).dataTable(options.datatable_options);   // jQuery obj
  // } else {
  //   dt = $('#' + options.table_id ).DataTable(options.datatable_options);  // datatable istance
  // }
  // return dt;

  return $('#' + options.table_id ).DataTable(options.datatable_options);  // datatable istance
}

export function _creaDataTable( $container, options = {}, jquery_url='https://code.jquery.com/jquery-3.6.0.min.js') {

  if(window.jQuery === undefined && !document.head.querySelector(`script[src="${jquery_url}"]`)) {

    let script = document.createElement('script');
    script.onload = function() {
      run_creaDataTable($container, options);
    };
    script.src = jquery_url;
    script.async = false;
    document.head.appendChild(script);

  } else if(window.jQuery === undefined) { // script presente ma jquery ancora in caricamento

    const intervalID = setInterval(() => {
      if(window.jQuery !== undefined ) {
        clearInterval(intervalID);
        run_creaDataTable($container, options);
      }
    }, 200);

  } else {
    run_creaDataTable($container, options);
  }
}
