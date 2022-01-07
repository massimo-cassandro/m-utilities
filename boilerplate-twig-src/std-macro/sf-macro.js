// std sƒ macro per tabelle molti a uno

/*
  markup richiesto

  <fieldset class="sf-macro-wrapper"> {# opzionale: data-close-btn="false" #}
    <legend>__legend__</legend>

    {% macro _MACRO_NAME_(row[, globals]) %}
      {# {% set __valore_campo__ = row.vars.value.__field__ %} #}
      <div class="sf-macro-riga"> {# opzionali: show-label-down-sm|md|lg|xl sf-macro-riga-border #}

        [ __MARKUP_RIGA__ ]

      </div> {# end .riga-macro #}
    {% endmacro %}
    {% import _self as m %}

    <div class="my-3 sf-macro-container" data-template="{{
      m._MACRO_NAME_(form.__form_var__.vars.prototype)|e('html_attr')
    }}">
      {% for row in form.__form_var__ %}
        {{ m._MACRO_NAME_(row) }}
      {% endfor %}
    </div>
    {#
    <div class="my-3 sf-macro-container" data-template="{{
      m._MACRO_NAME_(form.__form_var__.vars.prototype, _context)|e('html_attr')
    }}">
      {% for row in form.__form_var__ %}
        {{ m._MACRO_NAME_(row, _context) }}
      {% endfor %}
    </div>
    #}

    <div class="form-group mt-3 text-right">
      <button type="button" class="btn btn-outline-secondary sf-macro-riga-add">Aggiungi xxxx</button>
    </div>
  </fieldset>

  ===============
  JS
  ===============
  set_macro_listeners({
    macro_wrapper:   document.querySelectorAll('.sf-macro-wrapper'),
    add_callback:    null,
    remove_callback: null,
    add_del_btn:     true,
    custom_del_btn:  null,
    fw:              app_data.fw
  });

*/

export  function set_macro_listeners ( options ) {

  const default_options = {
    macro_wrapper:  document.querySelector('.sf-macro-wrapper'),
    add_callback:    null,
    remove_callback: null,
    add_del_btn:     true,
    custom_del_btn:  null,
    fw:              'bs4'
  };

  let opts = Object.assign( {}, default_options, options );

  /*
    macro_wrapper   : fieldset contenitore del markup della macro

    add_callback    : eventuale callback eseguito all'aggiunta di una riga
                      (riceve come argomenti l'elemento '.sf-macro-container'
                      e la riga aggiunta)

    remove_callback : eventuale callback eseguito all'eliminazione di una riga
                      (riceve come argomento l'elemento '.sf-macro-container')

    add_del_btn     : opzionale, se true aggiunge un bottone per la rimozione della riga
                      può essere anche impostato anche aggiunge al fieldset wrapper
                      l'attributo `data-no-close-btn="true"`

    custom_del_btn  : opzionale, markup personalizzato pulsante rimozione riga.
                      Deve avere la classe 'sf-macro-riga-del'

    fw              : framework in uso, bs4 (default) o bs5
  */


  const macro_container = opts.macro_wrapper.querySelector('.sf-macro-container'),
    std_del_btn = {
      bs4: `<div class="sf-macro-close-btn">
          <button type="button" class="close sf-macro-riga-del" aria-label="Elimina riga">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Elimina</span>
          </button>
        </div>`,

      bs5: `<div class="sf-macro-close-btn">
        <button type="button" class="btn-close sf-macro-riga-del" aria-label="Elimina riga">
          <span class="visually-hidden">Elimina</span>
        </button>
      </div>`,
    },
    add_del_btn = (riga) => {
      if(opts.add_del_btn && opts.macro_wrapper.dataset.noCloseBtn === undefined) {
        riga.insertAdjacentHTML('beforeend',
        opts.custom_del_btn? opts.custom_del_btn : std_del_btn[opts.fw]
        );
      }
    };

    // listener rimozione riga
    opts.macro_wrapper.addEventListener('click', (e) => {

    if(e.target.classList.contains('sf-macro-riga-del') ||
      (e.target.closest('button') && e.target.closest('button').classList.contains('sf-macro-riga-del'))
    ) {
      e.target.closest('.sf-macro-riga').remove();
    }
    if(opts.remove_callback && typeof opts.remove_callback === 'function' ) {
      opts.remove_callback( macro_container );
    }
  }, true);

  // aggiunta nuove righe
  opts.macro_wrapper.querySelector('.sf-macro-riga-add').addEventListener('click', () => {

    let macro_template   = macro_container.dataset.template,
      indice_righe       = macro_container.querySelectorAll('.sf-macro-riga').length;

    macro_container.insertAdjacentHTML('beforeend',
      macro_template.replace(/__indice\d?__/g, indice_righe++));

    let nuova_riga = macro_container.querySelector('.sf-macro-riga:last-child');
    add_del_btn(nuova_riga);

    if(opts.add_callback && typeof opts.add_callback === 'function' ) {
      opts.add_callback( macro_container, nuova_riga);
    }
  }, false);

  // righe preregistrate
  macro_container.querySelectorAll('.sf-macro-riga').forEach(riga => {

    // aggiunta callback
    if(opts.add_callback && typeof opts.add_callback === 'function' ) {
      opts.add_callback( macro_container, riga );
    }

    // aggiunta pulsante rimozione riga
    add_del_btn(riga);

  });

}
