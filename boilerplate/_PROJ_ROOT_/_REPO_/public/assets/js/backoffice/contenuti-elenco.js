import start from './_src/_start';
import {auto_datatable} from './_src/_datatable';
import {datatable_selector, contenuti_elenco} from '@massimo-cassandro/m-utilities/boilerplate-src/contenuti/_contenuti_elenco';

(() => {
  start();
  let dt = auto_datatable(datatable_selector);
  contenuti_elenco(dt);
})();

