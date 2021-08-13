import fileUploader from '@massimo-cassandro/js-file-uploader/js/file-uploader';
import check_uncompleted_uploads from '@massimo-cassandro/js-file-uploader/js-utilities/check-uncompleted-uploads';
import check_required_uploader from '@massimo-cassandro/js-file-uploader/js-utilities/check-required-uploader';
import app_data from './get-app-data';


export default function () {
  const fupl_selector = '[data-file-uploader]';

  fileUploader({
    selector: fupl_selector,
    // css: url,
    options: {
      uploader_url   : app_data.baseUrl + '/file-uploader',
      max_filesize   : '8MB',
      varname        : 'uploader_file',
      delete_varname : 'elimina_file[]',
      debug          : app_data.dev,
      disable_submit : true,
      fancybox       : false,
      input_label_class: 'btn btn-outline-primary btn-sm',
      template_remove_btn: '<button type="button" class="btn-close fupl-remove-trigger" ' +
        'aria-label="{{remove_btn_text}}" title="{{remove_btn_text}}"></button>'

    } // end options
  });

  // controllo caricamento non completati on submit
  check_uncompleted_uploads({
    alert_api: message => {
      alert(message);
    },
    // message: 'Devi attendere che il caricamento delle immagini sia completato',
    fupl_selector: fupl_selector
  });

  // controllo required uploader
  check_required_uploader({
    alert_api: message => {
      alert(message);
    },
    // message: 'È necessario caricare le immagini obbligatorie',
    fupl_selector: fupl_selector
  });
}
