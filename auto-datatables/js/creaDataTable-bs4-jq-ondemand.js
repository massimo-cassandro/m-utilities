import dt_bs from 'datatables.net-bs4/js/dataTables.bootstrap4';
import dt_config_bs from './src/config-bs4';

import cdt from './src/creaDataTable-src';

import jquery_loader from '../../js-utilities/jquery-ondemand-loader';


export function _creaDataTable( $container, options = {}, jquery_url='https://code.jquery.com/jquery-3.6.0.min.js') {

  return jquery_loader(jquery_url, () => {
    return cdt($container, options, dt_bs, dt_config_bs);
  });
}
