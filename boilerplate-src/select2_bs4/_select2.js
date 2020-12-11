import $ from 'jquery';
import 'select2/dist/js/select2.full.js';
import 'select2/dist/js/i18n/it.js';

export const select2_defaults = {
  theme                : 'bootstrap4',
  width                : '100%',
  language             : 'it',
  debug                : false,
  multiple: false,
  minimumInputLength   : 3,
  placeholder          : 'Clic per selezionare',
  allowClear           : false, // mostra il pulsante di deselezione
  //closeOnSelect        : false, // Force the dropdown to remain open after selection
  selectOnClose: true,
  ajax: {
    dataType  : 'json',
    delay     : 400,
    data: function (/* params */) {
      return {};
    },
    // url: function (params) {
    //   return '/autocomplete/xxxx/' + params.term;
    // },
    cache: true,

    // You can use the ajax.processResults option to transform the data
    // returned by your API into the format expected by Select2:
    processResults: function (data) {
      return { results: data };
    }
  },
  escapeMarkup: markup => markup,
  templateResult: function(data) { // lista risultati
    if (data.text) {
      return 'Sto cercando...'; // return data.text
    } else {
      // data.text = data.nome + data.cognome;
      return data.text;
    }
  },
  templateSelection: data => data.text // text option preregistrati
};

export function set_select2(field, options = {}, default_opts = select2_defaults) {

  /*

    funzione per inizializzare select2 su un campo
    può essere utilizzata anche come callback per un macro di aggiunta record

    field => elemento DOM (non jquery) su cui attuvare select2

    options:
    {
      // url dell'automplete (senza slash finale), a cui sarà aggiunto /{term}
      // obbligatorio
      autocomplete_url: '',

      // formattazione lista risultati
      templateResult: function(data) {
        if (data.text) {
          return 'Sto cercando xxxx ...'; // return data.text
        } else {
          data.text = data.nome  + data.cognome;
          return data.text;
        }
      }
    }
  */

  let select2_options = Object.assign({}, select2_defaults);

  select2_options.ajax.url = function (params) {
    return options.autocomplete_url + '/' + params.term;
  };

  if(options.templateResult) {
    select2_options.templateResult = options.templateResult;
  }

  $(field).select2(select2_options);
}

