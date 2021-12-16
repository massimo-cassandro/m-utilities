import start from './src/start';
// import app_data from '../globali/get-app-data';
// import mAlert from '@massimo-cassandro/m-utilities/m-alert-bs5/m-alert';
// import {set_macro_listeners} from '@massimo-cassandro/m-utilities/boilerplate-twig-src/std-macro/sf-macro';
// import textarea_autosize from '@massimo-cassandro/m-utilities/js-utilities/textarea-autosize';
// import submit_err from '@massimo-cassandro/m-utilities/js-utilities/submit-error-bs5';
// import {disableBtnsOnSubmit, throwErr} from '@massimo-cassandro/m-utilities/js-utilities/form-utilities';
// import {disableBtnsOnSubmit} from '@massimo-cassandro/m-utilities/js-utilities/form-utilities';
// import toggle_disabled from '@massimo-cassandro/m-utilities/js-utilities/toggle-disabled';
import ckeditor from '../globali/ckeditor';
import file_uploader from '../globali/file-uploader';
import contenuti_scheda from '@massimo-cassandro/m-utilities/boilerplate-twig-src/contenuti/contenuti-scheda-bs5';

start();
contenuti_scheda();
ckeditor();
file_uploader();
