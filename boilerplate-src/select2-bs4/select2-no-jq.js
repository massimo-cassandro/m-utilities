import select2 from 'select2';
import jquery_loader from '../../js-utilities/jquery-ondemand-loader';

export const select2_defaults = {
  theme                : 'bootstrap4',
  width                : '100%',
  language             : {
    errorLoading: function () {
      return 'I risultati non possono essere caricati.';
    },
    inputTooLong: function (e) {
      var n = e.input.length - e.maximum,
        t = 'Devi rimuovere almeno ' + n + ' caratter';
      return t += 1 !== n ? 'i' : 'e';
    },
    inputTooShort: function (e) {
      return 'Inserisci ' + (e.minimum - e.input.length) + ' o più caratteri';
    },
    loadingMore: function () {
      return 'Sto caricando i risultati...';
    },
    maximumSelected: function (e) {
      var n = 'Puoi selezionare solo ' + e.maximum + ' element';
      return 1 !== e.maximum ? n += 'i' : n += 'o', n;
    },
    noResults: function () {
      return 'Nessun risultato per la ricerca inserita';
    },
    searching: function () {
      return 'Sto cercando...';
    },
    removeAllItems: function () {
      return 'Rimuovi tutto';
    }
  },
  debug: false,
  multiple: false,
  minimumInputLength   : 3,
  placeholder          : 'Clic per selezionare',
  allowClear           : true, // mostra il pulsante di deselezione
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

export function set_select2(field, options = {}, jquery_url='https://code.jquery.com/jquery-3.6.0.min.js', default_opts = select2_defaults) {

  /*
    funzione per inizializzare select2 su un campo
    può essere utilizzata anche come callback per un macro di aggiunta record

    field => elemento DOM (non jquery) su cui attuvare select2

    options:
    {
      // url dell'autocomplete (senza slash finale), a cui sarà aggiunto /{term}
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

  function run() {
    select2($); //Hook up select2 to jQuery
    // window.jQuery = $;
    // select2(jQuery);
    // import 'select2/dist/js/i18n/it.js';

    let select2_options = Object.assign({}, default_opts);

    select2_options.ajax.url = function (params) {
      return options.autocomplete_url + '/' + params.term;
    };

    if(options.templateResult) {
      select2_options.templateResult = options.templateResult;
    }
    if(options.templateSelection) {
      select2_options.templateSelection = options.templateSelection;
    }

    $(field).select2(select2_options);
  }

  jquery_loader(jquery_url, run);
}

