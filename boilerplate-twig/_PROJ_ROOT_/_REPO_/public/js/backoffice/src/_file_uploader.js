import fileUploader from '@massimo-cassandro/js-file-uploader/src/file_uploader';
import check_uncompleted_uploads from '@massimo-cassandro/js-file-uploader/src-utilities/check_uncompleted_uploads';
import check_required_uploader from '@massimo-cassandro/js-file-uploader/src-utilities/check_required_uploader';
import app_data from './_get_app_data';

// toast notification
import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/toast';

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
      input_label_class: 'btn btn-outline-secondary btn-sm',

      alert_api      : function (message, fupl, error_type='error') {
        let alert_class= error_type === 'error' ? 'danger' : error_type, // per allineamento alle classi di bs4

          toast_notification = `<div class="toast fupl-alert flex-0" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                <strong class="mr-auto lead text-${alert_class}">Attenzione!</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="toast-body">${message}</div>
            </div>`,

          alert_wrapper = '<div class="fupl-alert-wrapper"></div>';

        if(!$('.fupl-alert-wrapper', fupl.opts.wrapper).length) {
          $(alert_wrapper).appendTo(fupl.opts.wrapper);
        }

        $(toast_notification).appendTo($('.fupl-alert-wrapper', fupl.opts.wrapper));

        $('.fupl-alert:last').toast({
          animation: true,
          autohide: true,
          delay: 10000
        }).on('hidden.bs.toast', function () {
          $(this).remove();
          if( !$('.fupl-alert-wrapper .fupl-alert', fupl.opts.wrapper).length ) {
            $('.fupl-alert-wrapper', fupl.opts.wrapper).remove();
          }
        }).toast('show');
      }// end alert_api
    } // end options
  });

  // controllo caricamento non completati on submit
  check_uncompleted_uploads({
    alert_api: message => {
      mAlert({
        type           : 'error',
        title          : message,
        mes            : null
      });
    },
    // message: 'Devi attendere che il caricamento delle immagini sia completato',
    fupl_selector: fupl_selector
  });

  // controllo required uploader
  check_required_uploader({
    alert_api: message => {
      mAlert({
        type           : 'error',
        title          : message,
        mes            : null
      });
    },
    // message: 'È necessario caricare le immagini obbligatorie',
    fupl_selector: fupl_selector
  });
}
