import {cke_test_utilities} from './src/test_utilities.js';
import m_cke_loader from '../../../ckeditor-utilities/_m-ckeditor-loader.js';
import m_cke_form_check from '../../../ckeditor-utilities/_m-ckeditor-form-check.js';

(() => {

  m_cke_loader({
    cke_url: '../ckeditor-dist/m-ckeditor-min.js', // relative to html file
    upl_url: 'test_files/test_server_upload_response.php', // relative to html file
    img_viewer: ''
  });

  m_cke_form_check({
    requiredErrorMes: requiredElement => {
      return `L'elemento ${requiredElement} è obbligatorio`;
    },

    alertUI: mes => {
      // document.querySelectorAll('[type=submit]').forEach(item => { item.disabled=false; });
      alert(mes);
    }
  });


  // ClassicEditor
  //   .create( document.querySelector( '#editor1' ), {
  //     toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
  //   } )
  //   .then( editor => {
  //     window.editor = editor;
  //   } )
  //   .catch( err => {
  //     console.error( err.stack );
  //   } );

  cke_test_utilities();
})();
