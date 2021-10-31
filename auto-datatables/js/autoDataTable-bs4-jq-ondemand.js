import {_creaDataTable} from './creaDataTable-bs4-jq-ondemand';
import autoDT from './src/autoDataTable-src';
import jquery_loader from '../../js-utilities/jquery-ondemand-loader';

export  function _autoDataTable( $container = '.dt-container', cdt_options = {}, jquery_url='https://code.jquery.com/jquery-3.6.0.min.js' ) {
  return jquery_loader(jquery_url, () => {
    return autoDT( $container, cdt_options, _creaDataTable );
  });
}
