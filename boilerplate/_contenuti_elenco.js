export default function () {

  $('.contenuti-filter-reset').click(function(){
    $('#filtro-tipo').val('');
    $('#filtro-sezione').val('');
    $('#f_ricerca').submit();
    let dt = $('.dt_container .table').DataTable();
    dt.search('').draw();

  });
}
