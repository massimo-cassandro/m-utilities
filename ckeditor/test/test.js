/* global CKEditorInspector, ckeditor_instances */

(() => {

  //UTILITÀ PER IL TEST
  document.querySelectorAll('.get-data-btn').forEach(item => {
    item.addEventListener('click', () => {

      let textarea_id = item.closest('.demo_wrapper').querySelector('textarea').id,
        cke_data = ckeditor_instances[textarea_id].getData();
      item.nextElementSibling.innerHTML = cke_data
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      console.log(cke_data); // eslint-disable-line
    }, false);
  });

  document.getElementById('start-inspector').addEventListener('click', function () {
    document.querySelectorAll('textarea.editor').forEach(item => {
      CKEditorInspector.attach( ckeditor_instances[item.id] );
    });
    this.remove();
  }, false);

})();
