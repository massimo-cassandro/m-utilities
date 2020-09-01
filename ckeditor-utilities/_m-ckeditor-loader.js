/* globals ClassicEditor */

/*
  FILE DA INCLUDERE per l'utilizzo di ckeditor
*/

export default function () {
  'use strict';

  if(typeof window.mUtilities === 'undefined') {
    window.mUtilities = {};
  }
  if(typeof window.mUtilities.ckeditor === 'undefined') {
    window.mUtilities.ckeditor = {};
  }

  const script_data = document.currentScript.dataset,
    editor_list = document.querySelectorAll('textarea.editor');

  window.mUtilities.ckeditor.cke_url = window.mUtilities.ckeditor.cke_url || (script_data.cke || '/assets/ckeditor-dist/m-ckeditor-min.js');
  window.mUtilities.ckeditor.upl_url = window.mUtilities.ckeditor.upl_url || (script_data.ckeUpl || '/ckeditor/file-uploader');
  window.mUtilities.ckeditor.img_viewer = window.mUtilities.ckeditor.img_viewer || (script_data.ckeImgViewer || '/viewer/');  // (NB: con slash finale)


  if (editor_list.length) {

    // Istanza ckeditor.
    // L'istanza è raggiungibile tramite il suo id (se esiste)
    // o, in sua mancanza, tramite l'indice dell'elemento
    // es: ckeditor_instances.__textarea_id__
    window.ckeditor_instances = {};

    const std_toolbar = [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        '|',
        'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
        '|',
        'outdent', 'indent',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'undo',
        'redo'
      ],

      lite_toolbar = [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        '|',
        'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
        '|',
        'outdent', 'indent',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        //'imageUpload',
        'blockQuote',
        'insertTable',
        'undo',
        'redo'
      ],

      xlite_toolbar = [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        '|',
        'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
        '|',
        'outdent', 'indent',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        //'imageUpload',
        'blockQuote',
        //'insertTable',
        'undo',
        'redo'
      ];

    let script = document.createElement('script');
    script.onload =  () => {

      editor_list.forEach(function (item, idx) {

        let options = {
          uploaderUrl: window.mUtilities.ckeditor.upl_url,
          uploadMaxSize : 4 * 1024 * 1024,
          imgViewer: window.mUtilities.ckeditor.img_viewer,
          toolbar: std_toolbar
        };

        // max size da attributo data
        if(item.dataset.ckeUplMaxSize) { // in bytes
          options.uploadMaxSize = item.dataset.ckeUplMaxSize;
        }

        // https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html#removing-features
        if (item.classList.contains('editor-lite')) {
          options = {
            toolbar: lite_toolbar,
            removePlugins: [ 'mUploadAdapter', 'ImageUpload' ],
          };
        } else if(item.classList.contains('editor-xlite')) {
          options = {
            toolbar: xlite_toolbar,
            removePlugins: [ 'mUploadAdapter', 'ImageUpload', 'insertTable' ],
          };
        }

        if(item.classList.contains('editor-no-headings')) {
          options.toolbar = options.toolbar.filter(item => item !== 'heading');
        }

        // rimozione eventuali separatori all'inizio e alla fine
        if(options.toolbar[0] === '|') {
          options.toolbar = options.toolbar.slice(1);
        }
        if(options.toolbar.slice(-1) === '|') {
          options.toolbar = options.toolbar.slice(0, -1);
        }

        ClassicEditor.create(item, options)


        // .then( editor => {
        //   /* eslint-disable */
        //   console.groupCollapsed();
        //   console.log('textarea',  item );
        //   console.log('editor',  editor );
        //   console.log('toolbar elements',Array.from( editor.ui.componentFactory.names() ));
        //   console.log('plugins', ClassicEditor.build.plugins.map( plugin => plugin.pluginName ));
        //   console.groupEnd();
        //   /* eslint-enable */
        // })

          .then( editor => {
            if(item.disabled) {
              editor.isReadOnly = true;
            }
            window.ckeditor_instances[item.id ? item.id : idx] = editor;

            // abilita eventuali elementi disabilitati con attributo `data-enable="editor"`
            document.querySelectorAll('[data-enable="editor"]:disabled').forEach( el => {
              el.disabled = false;
              el.closest('.form-group').classList.remove('disabled');
            });
          })
          .catch( error => {
            /* eslint-disable */
            console.group('textarea ' + idx);
            console.error(error);
            console.log('textarea',  item );
            console.groupEnd();
            /* eslint-enable */
          });

      }); // end forEach

    }; // end onload

    script.src = window.mUtilities.ckeditor.cke_url;
    script.type = 'text/javascript';
    document.head.appendChild(script);

  } // end if( editor_list.length

}
