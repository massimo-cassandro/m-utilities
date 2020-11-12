import $ from 'jquery';
import {autoDataTable} from '@massimo-cassandro/m-utilities/auto-datatables/_autoDataTable';


export default function () {


  let dt = autoDataTable( $('.dt_container') );

  $('.contenuti-filter-reset').click(function(){
    $('#filtro-tipo').val('');
    $('#filtro-sezione').val('');
    $('#f_ricerca').submit();
    dt.search('').draw();

  });
}
