import start from './src/start';
import {auto_datatable} from './src/datatable';
import {datatable_selector, contenuti_elenco} from '@massimo-cassandro/m-utilities/boilerplate-twig-src/contenuti/contenuti-elenco';

(() => {
  start();
  let dt = auto_datatable(datatable_selector);
  contenuti_elenco(dt);
})();

