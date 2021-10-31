import $ from 'jquery';
import dt_bs from 'datatables.net-bs4/js/dataTables.bootstrap4';
import dt_config_bs from './src/config-bs4';

import cdt from './src/creaDatatTable-src';

export function _creaDataTable( $container, options = {}) {
  if(!window.jQuery) {
    window.jQuery = $;
  }
  if(!window.$) {
    window.$ = $;
  }
  return cdt($container, options, dt_bs, dt_config_bs);
}
