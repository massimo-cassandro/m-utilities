/* global FileUploader */

export default function () {
  'use strict';

  let maindata =  $('.appdata').data('d');

  // controllo caricamento non completati on submit
  $('form').each(function() {
    $(this).submit(function() {

      if($(this).hasClass('unsuitable_browser')) {
        mAlert({
          type           : 'error',
          title          : 'Stai utilizzando un browser non adatto. Impossibile procedere',
          mes            : null
        });
        return false;
      }

      if($('.fupl-is-uploading', this).length) {
        mAlert({
          type           : 'error',
          title          : 'Devi attendere che il caricamento delle immagini sia completato',
          mes            : null
        });
        return false;
      }
    });
  });


  FileUploader.init({
    uploader_url   : maindata.baseUrl + '/file-uploader',
    max_filesize   : '8MB',
    varname        : 'uploader_file',
    delete_varname : 'elimina_file[]',
    debug          : (maindata !== undefined && maindata.test),
    css            : null,
    disable_submit : true,
    fancybox       : false,
    input_label_class: 'btn btn-secondary btn-sm',

    unsuitable_browser_callback: function () {
      $('[data-file-uploader]')
        .closest('form')
        .addClass('unsuitable_browser')
        .find(':submit').each( function() {
          $(this).replaceWith( '<div class="alert alert-icon alert-danger my-4">Stai usando un browser non compatibile</div>' );
        });
    },

    alert_api      : function (message, fupl_options, error_type='error') {
      let alert_class= error_type === 'error' ? 'danger' : error_type, // per allineamento alle classi di bs4

        toast_notification = `<div class="toast fupl-alert" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="mr-auto lead text-${alert_class}">Attenzione!</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">${message}</div>
      </div>`,

        alert_wrapper = '<div aria-live="polite" aria-atomic="true" class="fupl-alert-wrapper"></div>';

      if(!$('.fupl-alert-wrapper', fupl_options.wrapper).length) {
        $(alert_wrapper).appendTo(fupl_options.wrapper);
      }

      $(toast_notification).appendTo($('.fupl-alert-wrapper', fupl_options.wrapper));

      $('.fupl-alert:last').toast({
        animation: true,
        autohide: true,
        delay: 10000
      }).on('hidden.bs.toast', function () {
        $(this).remove();
        if( !$('.fupl-alert-wrapper .fupl-alert', fupl_options.wrapper).length ) {
          $('.fupl-alert-wrapper', fupl_options.wrapper).remove();
        }
      }).toast('show');
    }

  });

}
