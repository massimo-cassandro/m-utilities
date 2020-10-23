/* global ckeditor_instances */

/*
  Controlli campi ckeditor
*/


export default function () {

  if(typeof window.mUtilities === 'undefined') {
    window.mUtilities = {};
  }
  if(typeof window.mUtilities.ckeditor === 'undefined') {
    window.mUtilities.ckeditor = {};
  }
  if(typeof window.mUtilities.ckeditor.requiredErrorMes === 'undefined') {
    window.mUtilities.ckeditor.requiredErrorMes = requiredElement => {
      return `L'elemento ${requiredElement} è obbligatorio`;
    };
  }
  if(typeof window.mUtilities.ckeditor.alertUI === 'undefined') {
    window.mUtilities.ckeditor.alertUI = mes => {
      alert(mes);
    };
  }

  let editor_textareas = document.querySelectorAll('textarea.editor'),
    editors_required = document.querySelectorAll('textarea.editor[required]');


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
          cke_data = editor.getData();
        cke_data = cke_data
          .replace(/((<p>&nbsp;<\/p>)*)$/i, '') // righe vuote alla fine
          .replace(/( *(&nbsp;)*<\/p>)$/i, ''); // spazi vuoti alla fine dei tag p

        // https://ckeditor.com/docs/ckeditor5/latest/api/module_editor-classic_classiceditor-ClassicEditor.html#function-setData
        editor.setData( cke_data.trim() );
        editor.updateSourceElement();

      });

      // required
      editors_required.forEach(item => {
        if(!item.value) {
          window.mUtilities.ckeditor.alertUI(window.mUtilities.ckeditor.requiredErrorMes(item.id));
          e.preventDefault();
          return false;
        }
      });
    };

  });

}
