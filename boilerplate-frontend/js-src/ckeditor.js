import m_cke_loader from '@massimo-cassandro/m-utilities/ckeditor-utilities/m-ckeditor-loader';
import m_cke_form_check from '@massimo-cassandro/m-utilities/ckeditor-utilities/m-ckeditor-form-check';
import mAlert from '@massimo-cassandro/m-utilities/m-alert-bs5/m-alert';
import app_data from './get-app-data';

export default function() {
  m_cke_loader({
    cke_url: '/ckeditor/m-ckeditor-min.js',
    upl_url: '/ckeditor/file-uploader',
    img_viewer: app_data.viewer + '/',

    link_auto_ext_target_blank: false,
    link_download: false,
    link_target_blank: false
  });

  m_cke_form_check({
    requiredErrorMes: requiredElement => {
      const element_label = document.getElementById(requiredElement)
        .closest('.form-group')
        .querySelector('label').innerText;
      return `L'elemento “${element_label}” è obbligatorio`;
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
