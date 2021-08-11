// datatable va importato nell'implementazione locale

export const datatable_selector = '.dt-container';

export function contenuti_elenco(datatable_instance) {

  document.querySelector('.contenuti-filter-reset').addEventListener('click', () => {
    document.getElementbyId('filtro-tipo').selectedIndex = 0;
    document.getElementbyId('filtro-sezione').selectedIndex = 0;
    document.getElementbyId('f_ricerca').submit();

    datatable_instance.search('').draw();
  });
}
