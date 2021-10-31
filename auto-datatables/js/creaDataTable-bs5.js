import $ from 'jquery';
import dt_bs from 'datatables.net-bs5/js/dataTables.bootstrap5';
import dt_config_bs from './src/config-bs5';

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
