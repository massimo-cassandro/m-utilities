import $ from 'jquery';
import {_creaDataTable} from './creaDataTable-bs4';
import autoDT from './src/autoDataTable-src';

export  function _autoDataTable( $container = '.dt-container', cdt_options = {} ) {
  if(!window.jQuery) {
    window.jQuery = $;
  }
  if(!window.$) {
    window.$ = $;
  }
  return autoDT( $container, cdt_options, _creaDataTable );
}
