export default function (context = document) {
  //date in sequenza
  /*
    l'attributo `data-min` in un campo data indica l'id del campo il cui valore
    imposta l'attributo `min` del campo corrente.
    Funzionamento analogo per l'attributo `data-max`

    Sulla data iniziale → data-max
    Sulla data finale   → data-min
  */

 // data iniziale
 context.querySelectorAll('input[type="date"][data-max], input[type="datetime-local"][data-max]').forEach(el => {
   let campo_correlato = document.querySelector('#' + el.dataset.max);
   el.setAttribute('max', campo_correlato.value);
   campo_correlato.addEventListener('change', () => {
     el.setAttribute('max', campo_correlato.value);
    });
  });

  // data finale
  context.querySelectorAll('input[type="date"][data-min], input[type="datetime-local"][data-min]').forEach(el => {
    let campo_correlato = document.querySelector('#' + el.dataset.min);

    if(campo_correlato.value) { // nel caso fosse presente un'attributo min preimpostato e non fosse ancora impostato il valore iniziale
      el.setAttribute('min', campo_correlato.value);
    }
    campo_correlato.addEventListener('change', () => {
      el.setAttribute('min', campo_correlato.value);
    });
  });

  // $('input[type="date"][data-min]').each(function () {
  //   var _this = $(this),
  //     campo_correlato = $('#' + _this.data('min'));
  //   campo_correlato.change(function () {
  //     _this.attr('min', $(this).val());
  //   });
  // });

  // $('input[type="date"][data-max]').each(function () {
  //   var _this = $(this),
  //     campo_correlato = $('#' + _this.data('max'));
  //   campo_correlato.change(function () {
  //     _this.attr('max', $(this).val());
  //   });
  // });
}
