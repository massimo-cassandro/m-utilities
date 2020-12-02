/*
  autodatatable
  Crea un datatable leggendo gli attributi data assegnati ad un div

  il contenitore avrà la classe `dt_container` (assegnato dallo script)
  e deve avere gli attributi:

    * `data-dt_columns`   → definizione delle colonne datatable
                            (vedi di seguito per info sulla struttura)
    * `data-cdt_options`  → opzioni per _creaDataTable (vedi),
        comprende tra gli altri:

          - `dtRender`          : parametri per autodatatable
          - `datatable_options` : parametri specifici per datatable

  * `dtRender` contiene:
    - `bindToForm`         : (fac) id del form a cui collegare datatable per fornire
                             strumenti dio ricerca avanzati.
                             Se si utilizza un form di ricerca, l'eventuale parametro
                             `ajax` di `datatable_options` viene ignorato, e si utilizza
                             l'attributo `action` del form
    - `formSubmitButtonId` : (fac) id del pulsante submit del form di ricerca,
                             se non indicato viene utilizzato il selettore $(':submit')

  tipi e opzioni colonne: https://datatables.net/reference/option/columns.type


  PARAMETRI
  *  $container è il div entro cui generare il datatable (è un oggetto jQuery)
  * `options`: oggetto opzioni per _creaDataTable (vedi)
*/

import $ from 'jquery';
import {_creaDataTable} from './_creaDataTable';

import {mesi} from '../../js-utilities/_mesi_giorni_it';
import {number_format} from '../../js-utilities/_number_format';

import Mustache from 'mustache/mustache.mjs';
import moment from 'moment';

export  function _autoDataTable( $container = '.dt_container', cdt_options = {}, bs4 = true ) {

  if(!($container instanceof $)) {
    $container = $($container);
  }

  let _data = $container.data(),
    table_columns  = [],
    _form = null,
    formSubmitButton,
    this_datatable;

  // le opzioni assegnate tramite argomento della funzione vengono
  // unite con quelle ricavate dagli attributi data del container
  // (queste ultime hanno la precedenza)
  cdt_options = $.extend( true,
    cdt_options,
    _data.cdt_options
  );

  // collegamento a form con parametri di ricerca
  // cdt_options.dtRender.bindToForm corrisponde all'id del form
  if( cdt_options.dtRender && cdt_options.dtRender.bindToForm ) {
    _form = $('#' + cdt_options.dtRender.bindToForm );
    cdt_options.datatable_options.ajax = _form.attr('action') + '?' + _form.serialize();

    if(cdt_options.dtRender.formSubmitButtonId) {
      formSubmitButton = $('#' + cdt_options.dtRender.formSubmitButtonId );
    } else {
      formSubmitButton = $( ':submit', _form );
    }
  }

  // COLONNE
  _data.dt_columns = _data.dt_columns || [];

  // CICLO IMPOSTAZIONE COLONNE
  /*
    Ogni colonna è un oggetto con questa struttura:

    {
      title      : 'xxxxx',     -> titolo colonna
      data       : 'xxxxx',     -> chiave campo json (*)
      name       : 'xxxxx',     -> chiave campo json (*)
      className  : '__class__', -> fac.
      type       : '__type__',  -> fac., default string
      visible    : false,       -> fac.
      orderable  : false,       -> fac.
      searchable : false        -> fac.

      dtRender  : {             -> (**)
        field       : 'string', -> (***)
        type        : 'tpl',
        sf_base_url : path('__scheda__', { id: null }),
        tpl         : '<a href="[[sf_base_url]][[id]]">[[XXX]]</a>'
      }
    }

    (*) autoDataTable non fa differenza tra `data` e `name`,
        se ne può indicare uno solo e l'altro viene generato automaticamente

    (**) Le colonne con il campo `dtRender` vengono impostate in modo che utilizzano
         una delle funzione base preimpostate (vedi di seguito).
         L'elaborazione è guidata dal valore di `dtRender.type`

    (***) fac., campo su cui operare il parsing, se non è indicato un campo
          specifico, viene utilizzato quello indicato in `name` o `data`
  */
  _data.dt_columns.forEach( item => {

    let _default;

    if(item.dtRender !== undefined ) {

      item.dtRender.field = item.dtRender.field || item.name || item.data;

      switch (item.dtRender.type) {

        // campo id di u elenco di record
        case 'id':
          _default = {
            title       : '#',
            data        : 'id',
            name        : 'id',
            className   : 'text-right text-muted',
            type        : 'num',
            visible     : cdt_options.id_visible_default
          };
          item = $.extend({}, _default, item);
          break;

        // tpl: template mustache
        case 'tpl':
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

            //filter
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
                        row[i] = number_format(row[i],0);
                      }
                      break;

                    case 'num_format2':
                      if(!isNaN(row[i]) && row[i] !== null) {
                        row[i] = number_format(row[i],2);
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
                        row[i] = moment(row[i].date).format(cdt_options.formats.moment_date);
                      }
                      break;

                    case 'sf_datetime':
                      if(row[i] !== null) {
                        row[i] = moment(row[i].date).format(cdt_options.formats.moment_datetime);
                      } else {
                        row[i] = '&mdash;';
                      }
                      break;

                    case 'sf_time':
                      if(row[i] !== null) {
                        row[i] = moment(row[i].date).format('HH:mm');
                      } else {
                        row[i] = '';
                      }
                      break;

                    case 'date':
                      if(row[i] !== null) {
                        row[i] = moment(row[i]).format(cdt_options.formats.moment_date);
                      }
                      break;

                    case 'strips_truncate_100':
                      if(row[i]) {
                        row[i] = row[i].replace(/(<([^>]+)>)/ig, '');
                        row[i] = row[i].substring(0, 100) + (row[i].length > 100? '…' : '');
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

                    case 'mese':
                      if(row[i]) {
                        row[i] = +row[i];
                        row[i + '_parsed'] = mesi[row[i]];
                      }
                      break;

                    case 'annomese':
                      // stringa/numero anno mese nella forma `YYYY-MM` o `YYYYMM`
                      if(row[i]) {
                        let anno, mese;
                        if(row[i].indexOf('-') !== -1) {
                          [anno, mese] = row[i].split('-').map(i => i = +i);
                        } else {
                          anno = -row[i].substr(0,4);
                          mese = +row[i].substr(4);
                        }
                        row[i + '_parsed'] = mesi[mese] + ' ' + anno;
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
          // END case 'tpl'

        case 'sf_date':  // symfony date
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field].date).format(cdt_options.formats.moment_date) : '&mdash;';
          };
          item.type = 'date';
          item.render = function ( data, type, row ) {
            if(type === 'sort') {
              return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field].date).format('YYYY-MM-DD') : '';
            } else {
              return data;
            }
          };
          item.className = item.className || 'text-right';
          break;

        case 'sf_datetime':  // symfony datetime
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field].date).format(cdt_options.formats.moment_datetime) : '&mdash;';
          };
          item.type = 'date';
          item.render = function ( data, type, row ) {
            if(type === 'sort') {
              return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field].date).format('YYYY-MM-DD HH:mm') : '';
            } else {
              return data;
            }
          };
          item.className = item.className || 'text-right';
          break;

        case 'date':  // stringa data
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field]).format(cdt_options.formats.moment_date) : '&mdash;';
          };
          item.render = function ( data, type, row ) {
            if(type === 'sort') {
              return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field]).format('YYYY-MM-DD') : '';
            } else {
              return data;
            }
          };
          item.type = 'date';
          item.className = item.className || 'text-right';
          break;

        case 'datetime':  // stringa datetime
          item.data = function (row) {
            return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field]).format(cdt_options.formats.moment_datetime) : '&mdash;';
          };
          item.type = 'date';
          item.render = function ( data, type, row ) {
            if(type === 'sort') {
              return row[item.dtRender.field] !== null ? moment(row[item.dtRender.field]).format('YYYY-MM-DD HH:mm') : '';
            } else {
              return data;
            }
          };
          item.className = item.className || 'text-right';
          break;

        case 'num':
          item.dtRender.decimali = item.dtRender.decimali || 0;
          item.data = function (row) {
            return row[item.dtRender.field]?
              number_format( row[item.dtRender.field], +item.dtRender.decimali )
                .replace(/,(\d+)/, ',<span class="' + cdt_options.formats.decimals_class + '">$1</span>')
              : '';
          };
          item.type = 'num'; // 'num-fmt'
          item.render = function ( data, type, row ) {
            if(type === 'sort' || type === 'filter') {
              return row[item.dtRender.field];
            } else {
              return data;
            }
          };
          item.className = item.className || 'text-right';

          break;

        case 'euro':
          item.dtRender.decimali = item.dtRender.decimali !== undefined? item.dtRender.decimali : 2;
          item.raw = function (row) {
            return row[item.dtRender.field] ? row[item.dtRender.field] : '';
          };

          item.data = function (row) {
            return row[item.dtRender.field] ? '<span class="' + cdt_options.formats.euro_class + '">' +
                number_format( row[item.dtRender.field], +item.dtRender.decimali ).replace(/,(\d+)/, '.<span class="' + cdt_options.formats.decimals_class + '">$1</span>') +
                '</span>' : '&mdash;';
          };
          item.render = function ( data, type, row ) {
            if(type === 'sort' || type === 'filter') {
              return row[item.dtRender.field];
            } else {
              return data;
            }
          };
          item.className = item.className || 'text-right';
          item.type = 'num'; // 'num-fmt'
          break;

        case 'bool_icons':
          item.data = function (row) {
            var true_icon   = item.dtRender.true_icon ? item.dtRender.true_icon : cdt_options.icone.ok,
              false_icon  = item.dtRender.false_icon !== undefined ? item.dtRender.false_icon : cdt_options.icone.off,
              null_icon   = item.dtRender.null_icon !== undefined ? item.dtRender.null_icon : cdt_options.icone.off
              ;

            if(row[item.dtRender.field] === null) {
              return null_icon;
            } else {
              return (+row[item.dtRender.field] || Number.isNaN(Number(row[item.dtRender.field])) ) ?
                true_icon : false_icon;
            }
          };

          item.render = function ( data, type, row ) {
            if(type === 'sort' || type === 'filter') {
              return +row[item.dtRender.field];
            } else {
              return data;
            }
          };
          item.type = 'num';
          break;

      } // end switch (item.dtRender.type)

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
    table_columns.push(item);
    // console.log(item);

  }); // end _data.dt_columns.forEach


  cdt_options.datatable_options.columns = table_columns;

  this_datatable = _creaDataTable($container, cdt_options, bs4);

  if(_form !== null ) {

    _form.on('submit', function (event) {
      event.preventDefault();
      formSubmitButton.prop('disabled', false);

      this_datatable.ajax.url( _form.attr('action')+ '?' + _form.serialize() ).load();

      //console.log(formSubmitButton);

    }); // end submit

  }
  return this_datatable;

}
