import {lt} from './settings.js';
/*
  caricamento indicatori breakpoint e dimensioni viewport

  Se lo script è definito  il parametro `fw: __framework__`, viene visualizzato un div informativo
  con breakpoint attivo, dimensioni della pagina ecc.
  e caricato un css di formattazione

  __framework__ corrisponde alla sigla del fw: bootstrap3, bootstrap4, foundation6, ecc.

*/

export default function () {

  const fw_breakpoints_map= {

    bootstrap3  : '<span class="visible-xs-inline">xs</span>' +
        '<span class="visible-sm-inline">sm</span>' +
        '<span class="visible-md-inline">md</span>' +
        '<span class="visible-lg-inline">lg</span>',

    bootstrap4  : '<span class="d-sm-none">xs</span>' +
        '<span class="d-none d-sm-inline d-md-none">sm</span>' +
        '<span class="d-none d-md-inline d-lg-none">md</span>' +
        '<span class="d-none d-lg-inline d-xl-none">lg</span>' +
        '<span class="d-none d-xl-inline">xl</span>',

    bs5  : '<span class="d-sm-none">xs</span>' +
        '<span class="d-none d-sm-inline d-md-none">sm</span>' +
        '<span class="d-none d-md-inline d-lg-none">md</span>' +
        '<span class="d-none d-lg-inline d-xl-none">lg</span>' +
        '<span class="d-none d-xl-inline d-xxl-none">xl</span>' +
        '<span class="d-none d-xxl-inline">xxl</span>',

    foundation6 : '<span class="show-for-small-only">small</span>' +
        '<span class="show-for-medium-only">medium</span>' +
        '<span class="show-for-large-only">large</span>' +
        '<span class="show-for-xlarge">xlarge</span>'
  };


  if(lt.framework) {
    lt.brkpt_wrapper.innerHTML = fw_breakpoints_map[lt.framework];
  }

}
