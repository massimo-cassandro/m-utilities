/* globals moment,  Mustache, JSutils, datatable_setup:true */
// exported

/*!@license
 * creaDatatable & autoDatatable
 * Massimo Cassandro 2016-2020
 */

//TODO ottimizzare valori di default differenziando creadt e autodt
//TODO riscrivere come unico plugin con due moduli

(function($){
  // costruttore datatable
  /*
  Il plugin va assegnato al div che conterrà la tabella
  è necessario che il valore datatable_options.columns sia impostato
  */
  $.fn.creaDataTable=function (options) {

    datatable_setup = datatable_setup || {};


    var _this=$(this), // il div contenitore
      opts = $.extend(true, {}, datatable_setup, options)
    ;

    opts.table_id = 'cdt_' + ( _this.attr('id') ? _this.attr('id') : Date.now());
    _this.html('');

    if(opts.container_header) {
      _this.html('<h' + opts.container_header_level + '>' + opts.container_header + '</h' + opts.container_header_level + '>');
    }

    var table_cells_length = (!opts.datatable_options.columns && opts.datatable_options.aoColumns) ? opts.datatable_options.aoColumns.length : opts.datatable_options.columns.length;

    _this.addClass(opts.container_class)
      .append(
        '<table id="' + opts.table_id + '" class="' + opts.table_class + '">' +
        (opts.table_caption? '<caption>'+opts.table_caption+'</caption>' : '') +
        '<thead><tr>' + new Array(table_cells_length + 1).join('<th scope="col"></th>') + '</tr></thead>'+
        (opts.table_footer? '<tfoot><tr>' + new Array(table_cells_length + 1).join('<td></td>') + '</tr></tfoot>' : '') +
        '</table>' +
        (opts.extra_info? '<p class="text-muted small">' + opts.extra_info + '</p>': '')
      );

    if( opts.legacy ) { $.fn.dataTable.ext.legacy.ajax = true; }

    _this.data('table_id', opts.table_id);

    var dt;

    if(opts.jQueryObj) {
      dt = $('#' + opts.table_id ).dataTable(opts.datatable_options);   // jQuery obj
    } else {
      dt = $('#' + opts.table_id ).DataTable(opts.datatable_options);  // datatable istance
    }

    if( opts.chainable ) {
      return this;
    } else {
      return dt;
    }

  }; // end creaDataTable

  /*
  autodatatable
  Crea un datatable leggendo gli attributi data assegnati ad un div

  il contenitore deve avere la classe `dt_container` (assegnato dallo script) e gli attributi:
     `data-dt_columns`  definizione delle colonne datatable
     `data-cdt_options`   permette di modificare le altre opzioni di creaDataTable
  i valori di default delle opzioni creaDataTable vanno definite estendendo il default

  tipi e opzioni colonne: https://datatables.net/reference/option/columns.type
  */

  $.fn.dt = function (cdt_extra_options) {

    var _this   = $(this),
      _data   = _this.data(),
      _columns  = [],

      _form = null,
      _formSubmitButton,
      _this_datatable,

      defaults = {
        icone: {
          ok  : '&#10003;',
          off : '&#10060;'
        },

        id_visible_default: true, // paramentro `visibile` del campo `type: id`

        formats: {
          moment_datetime : 'D[&nbsp;]MMM[&nbsp;]YYYY[&nbsp;<small>]HH:mm[</small>]',
          moment_date     : 'D[&nbsp;]MMM[&nbsp;]YYYY',
          euro_class      : 'euro',
          decimals_class  : 'decimali'
        },

        //debug                   : false,
        container_class           : 'dt_container', // classe che viene assegnata al div che contiene la tabella
        container_header          : '', // se presente aggiunge un header prima della tabella
        container_header_level    : 2, // livello gerarchico dell'header (h2, h3, ecc...)
        table_class               : 'table table-striped table-bordered table-hover',
        table_caption             : '',
        table_footer              : false,  // se true aggiunge una riga tfoot alla tabella, da popolare con un callback
        extra_info                : '',
        legacy                    : false,  // se true, i parametri inviati al server utilizzano il naming della versione 1.9 di datatable
        jQueryObj                 : false,  // se true le API restituiscono un oggetto jQuery, in caso contrario un'istanza DataTable
        chainable                 : false,  // se true restituisce il div contenitore invece dell'istanza datatable

        datatable_options: { // impostazioni datatable
          columns          : []
        }
      }
    ;

    // cdt_extra_options: eventuali opzioni aggiuntive da passare a creaDataTable in aggiunta
    // a quelle di default
    cdt_extra_options = cdt_extra_options || {};

    datatable_setup = datatable_setup || {}; // variabili di configirazione //TODO sistemare ed eliminare

    _data.cdt_options = _data.cdt_options || {};
    var dt_options = $.extend( true,
      defaults,
      datatable_setup,
      _data.cdt_options, // tramite attributo data dell'elemento a cui è assegnato il datatable
      cdt_extra_options
    );

    // collegamento a form con parametri di ricerca
    // dt_options.dtRender.bindToForm corrisponde all'id del form
    if( dt_options.dtRender && dt_options.dtRender.bindToForm ) {
      _form = $('#' + dt_options.dtRender.bindToForm );
      dt_options.datatable_options.ajax = _form.attr('action') + '?' + _form.serialize();

      if(!dt_options.dtRender.formSubmitButton) {
        // id del pulsante submit di default
        dt_options.dtRender.formSubmitButton = 'submitButton';
      }
      _formSubmitButton = $('#' + dt_options.dtRender.formSubmitButton );
    }

    // COLONNE
    _data.dt_columns = _data.dt_columns || [];

    // ciclo impostazione colonne
    // quelle con il campo `renderAs` vengono impostate in modo che utilizzano una delle funzione base
    // preimpostate
    _data.dt_columns.forEach(function (item) {

      var _default;

      if(item.dtRender !== undefined ) {

        item.dtRender.field = item.dtRender.field || item.name; // se non è presente un campo specifico, viene utilizzato quello indicato in `name`

        switch (item.dtRender.type) {

        case 'id':
          _default = {
            title       : '#',
            data        : 'id',
            name        : 'id',
            className   : 'text-right text-muted',
            type        : 'num',
            visible     : dt_options.id_visible_default
          };
          item = $.extend({}, _default, item);
          break;

          // !tpl
        case 'tpl':  // mustache template
          if(item.dtRender.sf_base_url !== undefined && !/\/$/.test( item.dtRender.sf_base_url ) ) {
            item.dtRender.sf_base_url += '/';
          }

          item.data = function (row) {
            // conditional template: template differenziato in base ad un valore (`dtRender.key`)
            // il valore della chiave è confrontato con l'oggetto `dtRender.cond_tpl`
            // dtRender.tpl, se presente, è considerato come valore di default
            if(item.dtRender.key !== undefined  && item.dtRender.cond_tpl !== undefined &&
                item.dtRender.cond_tpl[row[item.dtRender.key]] !== undefined
            ) {
              item.dtRender.tpl = item.dtRender.cond_tpl[row[item.dtRender.key]];
            }

            //!filter
            /*
                filter è un oggetto nella forma

                {
                  nome_campo: __filter__
                }
                oppure.nel caso di filtri con parametri
                {
                  nome_campo: {filter: __filter__, params...}
                }

                dove `__filter__` è uno tra striptags, nl2br ecc...

              */
            if(item.dtRender.filter !== undefined) {

              for(var i in item.dtRender.filter) {
                let filter = item.dtRender.filter[i],
                  filter_params = null;

                if(typeof item.dtRender.filter[i] === 'object') {
                  filter_params = item.dtRender.filter[i];
                  filter = item.dtRender.filter[i].filter;
                }
                if(row[i]) {
                  switch (filter) {
                  case 'nl2br':
                    row[i] = row[i].replace(/\r\n|\n\r|\r|\n/g, '<br>\n');
                    /*
                        // autoescape
                        var regex = new RegExp('\\[\\[\\[' + i + '\\]\\]\\]|\\[\\[&' + i +'\\]\\]|\\[\\[' + i + '\\]\\]', 'g'); // eliminazione eventuali escape già presenti
                        item.dtRender.tpl = item.dtRender.tpl.replace(regex, '[[&' + i +']]');
                    */
                    break;

                  case 'striptags':
                    row[i] = row[i].replace(/(<([^>]+)>)/ig, '');
                    break;

                  case 'bool':
                    row[i] = Boolean(+row[i]);
                    break;

                  case 'num_format0':
                    if(!isNaN(row[i]) && row[i] !== null) {
                      row[i] = JSutils.number_format(row[i],0);
                    }
                    break;

                  case 'num_format2':
                    if(!isNaN(row[i]) && row[i] !== null) {
                      row[i] = JSutils.number_format(row[i],2);
                    }
                    break;

                  case 'sf_date_isSameOrBeforeNow':
                    if(row[i] !== null) {
                      row[i] = moment(row[i].date).isSameOrBefore(moment(),'day');
                    } else {
                      row[i] = false;
                    }
                    break;

                  case 'sf_date_isSameOrAfterNow':
                    if(row[i] !== null) {
                      row[i] = moment(row[i].date).isSameOrAfter(moment(),'day');
                    } else {
                      row[i] = false;
                    }
                    break;

                  case 'sf_date':
                    if(row[i] !== null) {
                      row[i] = moment(row[i].date).format(dt_options.formats.moment_date);
                    }
                    break;

                  case 'sf_datetime':
                    if(row[i] !== null) {
                      row[i] = moment(row[i].date).format(dt_options.formats.moment_datetime);
                    } else {
                      row[i] = '&mdash;';
                    }
                    break;

                  case 'date':
                    if(row[i] !== null) {
                      row[i] = moment(row[i]).format(dt_options.formats.moment_date);
                    }
                    break;

                  /*
                    elabora la stringa fornita, separandola usando la stringa `separator`
                    crea per ogni elemento una stringa definita dal
                    template Mustache `tpl`
                    e restituisce una stringa concantenata secondo il parametro `glue`
                    richiede la definizione dei parametri dt_render:
                      - separator
                      - tpl
                      - glue

                    Nel tpl, il singolo elemento dell'array ottenuto dalla
                    separazione della stringa va indicato con `split_item`
                    Su ogni elemento `split_item` viene eseguito il trim

                    =======================
                    esempio:
                    (field1 senza elaborazione extra, field2 con filtro `split`):

                    {
                      title     : 'XXX',
                      name      : 'XXX',
                      dtRender  : {
                        type: 'tpl',
                        filter: {
                          '__field2__': {
                            filter: 'split',
                            separator: ',',
                            tpl: '<span class="badge badge-primary">[[split_item]]</span>',
                            glue: ' '
                          }
                        },
                        tpl: '[[__field1__]]<br>[[& __field2__]]'
                      }
                    },

                  */
                  case 'split':
                    if(row[i]) {
                      Mustache.parse(filter_params.tpl);
                      row[i] = row[i].split(filter_params.separator).map(item => {
                        item = item.trim();
                        return Mustache.render(filter_params.tpl, {'split_item': item}, {}, ['[[', ']]']);
                      })
                        .join(filter_params.glue);
                    }
                    break;

                  /*
                    replace
                    elabora la stringa fornita, eseguendo un replace:
                      - regexp: espressione regolare ricerca (stringa)
                      - flag: regexp flag
                      - replace: stringa da sostituire

                    =======================
                    esempio:

                    {
                      title     : 'XXX',
                      name      : 'XXX',
                      dtRender  : {
                        type: 'tpl',
                        filter: {
                          '__field2__': {
                            filter: 'replace',
                            flag: 'g',
                            regexp: '\\.|@',
                            replace: '<wbr>$&'
                          }
                        }
                      }
                    },

                  */
                  case 'replace':
                    if(row[i]) {
                      row[i] = row[i].replace(
                        new RegExp( filter_params.regexp, filter_params.flag? filter_params.flag : null),
                        filter_params.replace
                      );
                    }
                    break;

                  } // end switch filter
                }
              }
            } // end if item.dtRender.filter

            Mustache.parse(item.dtRender.tpl);
            row.sf_base_url = item.dtRender.sf_base_url || null;
            return Mustache.render(item.dtRender.tpl, row, {}, ['[[', ']]']);
          };
          break;

          //TODO unificare sf_date e date e sf_datetime e datetime (controllando l'esistenza di date)
        case 'sf_date':  // symfony date
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field].date).format(dt_options.formats.moment_date) : '&mdash;';
          };
          item.type = 'date';
          item.className = item.className || 'text-right';
          break;

        case 'sf_datetime':  // symfony datetime
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field].date).format(dt_options.formats.moment_datetime) : '&mdash;';
          };
          item.type = 'date';
          item.className = item.className || 'text-right';
          break;

        case 'date':  // stringa data
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field]).format(dt_options.formats.moment_date) : '&mdash;';
          };
          item.type = 'date';
          item.className = item.className || 'text-right';
          break;

        case 'datetime':  // stringa datetime
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field]).format(dt_options.formats.moment_datetime) : '&mdash;';
          };
          item.type = 'date';
          item.className = item.className || 'text-right';
          break;

        case 'num':
          item.dtRender.decimali = item.dtRender.decimali || 0;
          item.data = function (row) {
            return JSutils.number_format( row[item.dtRender.field], +item.dtRender.decimali ).replace(/,(\d+)/, '.<span class="' + dt_options.formats.decimals_class + '">$1</span>');
          };
          item.type = 'num'; // 'num-fmt'
          item.className = item.className || 'text-right';

          break;


        case 'euro':
          item.dtRender.decimali = item.dtRender.decimali !== undefined? item.dtRender.decimali : 2;
          item.raw = function (row) {
            return row[item.dtRender.field] ? row[item.dtRender.field] : '';
          };

          item.data = function (row) {
            return row[item.dtRender.field] ? '<span class="' + dt_options.formats.euro_class + '">' +
                JSutils.number_format( row[item.dtRender.field], +item.dtRender.decimali ).replace(/,(\d+)/, '.<span class="' + dt_options.formats.decimals_class + '">$1</span>') +
                '</span>' : '&mdash;';
          };
          item.className = item.className || 'text-right';
          item.type = 'num'; // 'num-fmt'

          break;

        case 'bool_icons':
          item.data = function (row) {
            var true_icon   = item.dtRender.true_icon ? item.dtRender.true_icon : dt_options.icone.ok,
              false_icon  = item.dtRender.false_icon !== undefined ? item.dtRender.false_icon : dt_options.icone.off,
              null_icon   = item.dtRender.null_icon !== undefined ? item.dtRender.null_icon : dt_options.icone.off
              ;

            if(row[item.dtRender.field] === null) {
              return null_icon;
            } else {
              return (+row[item.dtRender.field] || Number.isNaN(Number(row[item.dtRender.field])) ) ?
                true_icon : false_icon;
            }
          };
          item.type = 'num';
          break;

//TODO far diventare striptags un filtro
/*
  DEPRECATO
          case 'striptags':
          item.data = function (row) {
            return row[item.dtRender.field] ? row[item.dtRender.field].replace(/(<([^>]+)>)/ig, "") : '';
          };
*/
        }

        //delete item.dtRender;

      } else { // datatable std items

        if(item.data && !item.name) {
          item.name = item.data;
        }
        if(item.name && !item.data) {
          item.data = item.name;
        }

        if( item.type === undefined) {
          item.type = 'string';
        }


      } // end if(item.dtRender !== undefined )
      _columns.push(item);

    });

    dt_options.datatable_options.columns = _columns;

    _this_datatable = _this.creaDataTable(dt_options);

    if(_form !== null ) {
      /*
      _form.cf().submit(function (event) {

        event.preventDefault();

        if(_form.data('cf_valid')) {

          _formSubmitButton.prop('disabled', false).html(_formSubmitButton.data('original_label'));

          //datatable_element.ajax.reload();
          _this_datatable.ajax.url( _form.attr('action')+ '?' + _form.serialize() ).load();

        } // end if cf_valid

        return false;
*/
      _form.submit(function (event) {
        event.preventDefault();
        _formSubmitButton.prop('disabled', false);

        _this_datatable.ajax.url( _form.attr('action')+ '?' + _form.serialize() ).load();

        //console.log(_formSubmitButton);


      }); // end submit

    }

    return _this_datatable;

  }; // end $.fn.dt

  /*
  $.fn.dt.defaults = {
    icone: {
      ok  : '&#10003;',
      off : '&#10060;'
    },
    formats: {
      moment_datetime : 'D[&nbsp;]MMM[&nbsp;]YYYY[&nbsp;<small>]HH:mm[</small>]',
      moment_date     : 'D[&nbsp;]MMM[&nbsp;]YYYY',
      euro_class      : 'euro',
      decimals_class  : 'decimali'
    },

    //debug                   : false,
    container_class           : 'dt_container', // classe che viene assegnata al div che contiene la tabella
    container_header          : '', // se presente aggiunge un header prima della tabella
    container_header_level    : 2, // livello gerarchico dell'header (h2, h3, ecc...)
    table_class               : 'table table-striped table-bordered table-hover',
    table_caption             : '',
    table_footer              : false,  // se true aggiunge una riga tfoot alla tabella, da popolare con un callback
    extra_info                : '',
    legacy                    : false,  // se true, i parametri inviati al server utilizzano il naming della versione 1.9 di datatable
    jQueryObj                 : false,  // se true le API restituiscono un oggetto jQuery, in caso contrario un'istanza DataTable
    chainable                 : false,  // se true restituisce il div contenitore invece dell'istanza datatable

    datatable_options: { // impostazioni datatable
      columns          : []
    }
  };
*/

})(jQuery);


// datatable automatica
// imposta automaticamente il datatable a tutti i div con classe `auto_dt`
$('.auto_dt').each( function() {
  $(this).dt();
});
