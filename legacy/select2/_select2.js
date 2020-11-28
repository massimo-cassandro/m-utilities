
if(mUtilities === undefined) { var mUtilities = {}; }
mUtilities.set_select2_options = function( _options, _data ) {

  _options  = _options || {}; // opzioni passate direttamente come argomento della funzione
  _data     = _data || {};    // impostazioni dagli attributi `data-*`


  var s2_defaults = {
      's2_json'               : '',
      's2_text'               : '',
      's2_query_mode'         : 'path', // path || query_string
      's2_query_params'       : null    // {var1: val1, var2: val2, ...}
    },

    s2_params = $.extend({}, s2_defaults, _options, _data);

  if( typeof s2_params['s2_text'] === 'string' ) { s2_params['s2_text'] = [s2_params['s2_text']]; }

  var tpl_result = function (data) {

      if(data.text) {
        return data.text;

      } else {
        var _text = [];
        s2_params['s2_text'].forEach(function (item) {
          if(data[item]) { _text.push(data[item]); }
        });
        return _text.join(' - ');

      }
    },

    select2_defaults = {
      theme                : 'bootstrap4',
      width                : '100%',
      language             : 'it',
      debug                : false,
      minimumInputLength   : s2_params['minimum-input-length'] || 3,
      placeholder          : s2_params.placeholder || 'Clic per selezionare',
      allowClear           : true,
      ajax                 : {
        dataType  : 'json',
        delay     : 400,
        data      : function (params) {
          var data = {};
          if( s2_params['s2_query_mode'] === 'query_string') {
            data.q = params.term;
          }
          if( s2_params['s2_query_params']) {
            $.extend(data, s2_params['s2_query_params']);
          }
          return data;
        },
        url       : function (params) {
          if( s2_params['s2_query_mode'] === 'path') {
            if( !/\/$/.test( s2_params['s2_json'] ) ) { s2_params['s2_json'] += '/'; }
            return s2_params['s2_json'] + params.term;
          } else {
            return s2_params['s2_json'];
          }
        },
        cache            : true,
        processResults   : function (data) {
          return {
            results: data
          };
        }
      },
      escapeMarkup         : s2_params['escapeMarkup'] || function (markup) { return markup; },
      templateResult       : s2_params['templateResult'] || tpl_result,
      templateSelection    : s2_params['templateSelection'] || tpl_result

    };


  return $.extend({}, select2_defaults, s2_params);
};

/*
// ATTIVAZIONE DA GESTIRE NEL PROGETTO
(function() {
  "use strict";

  $('select.s2').each( function() {

    var _this = $(this),
      _data = _this.data() || {};

    //_this.css({width: '100%'});
    _this.select2( mUtilities.set_select2_options( {}, _data ) );
  });
})();
*/
