/* global ckeditor_instances */

/*
  Controlli campi ckeditor
*/


export default function (options) {

  const default_options = {
    selector: 'editor',
    requiredErrorMes: requiredElement => {
      return `L'elemento ${requiredElement} è obbligatorio`;
    },
    alertUI: mes => {
      alert(mes);
    }
  };

  let cke_opts = Object.assign({}, default_options, options || {}),

    editor_textareas = document.querySelectorAll(`textarea.${cke_opts.selector}`),
    editors_required = document.querySelectorAll(`textarea.${cke_opts.selector}[required]`);


  // CAMPI REQUIRED
  //=========================
  /*
    metodo per il controllo dei textarea required.
    Il controllo va eseguito in due step:
    - censimento dei campi required ed eliminazione dell'attributo
      relativo per evitare errori al submit del form
    - Al momento del submit, i campi required sono controllati
      perché non siano vuoti (necessario farlo dopo il trim)

    È necessario che ogni textarea abbia un id
  */
  editors_required.forEach(item => {
    item.required = false;
    item.parentNode.querySelector('label').classList.add('required');
  });

  document.querySelectorAll('form').forEach(_form => {

    _form.onsubmit = (e) => {
      // trimming
      editor_textareas.forEach(item => {
        let editor = ckeditor_instances[item.id],
          cke_data = editor.getData(),
          extra_cleaning = item.classList.contains('editor-cleaner');

        cke_data = cke_data.trim();

        if(extra_cleaning) {
          cke_data = cke_data
            .replace(/<p( (.*?))?>(\s|&nbsp;)<\/p>/igm, '') // righe vuote
            // .replace(/((\s|&nbsp;)+<\/p>)$/igm, '</p>') // spazi vuoti alla fine dei tag p
            .replace(/(<h\d>)<strong>(.*?)<\/strong>(<\/h\d>) /igm, '$1$2$3'); // strong dentro gli header
        }
        // https://ckeditor.com/docs/ckeditor5/latest/api/module_editor-classic_classiceditor-ClassicEditor.html#function-setData
        editor.setData( cke_data.trim() );
        editor.updateSourceElement();

      });

      // required
      editors_required.forEach(item => {
        if(!item.value) {
          cke_opts.alertUI(cke_opts.requiredErrorMes(item.id));
          e.preventDefault();
          return false;
        }
      });
    };

  });

}
