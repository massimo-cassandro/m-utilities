import m_cke_loader from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-loader';
import m_cke_form_check from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-form-check';
import app_data from './_get_app_data';

export function cke_loader() {
  m_cke_loader({
    cke_url: '/assets/ckeditor/m-ckeditor-min.js',
    upl_url: '/ckeditor/file-uploader',
    img_viewer: app_data.viewer + '/',

    link_auto_ext_target_blank: false,
    link_download: false,
    link_target_blank: false
  });

  m_cke_form_check({
    requiredErrorMes: requiredElement => {
      return `L'elemento ${requiredElement} è obbligatorio`;
    },

    alertUI: mes => {
      document.querySelectorAll('[type=submit]').forEach(item => { item.disabled=false; });
      mAlert({
        type           : 'error',
        title          : mes,
        mes            : null
      });
    }
  });
}
