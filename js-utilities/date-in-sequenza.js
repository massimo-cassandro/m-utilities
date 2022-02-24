export default function (context = document) {
  //date in sequenza
  /*
    l'attributo `data-min` in un campo data indica l'id del campo il cui valore
    imposta l'attributo `min` del campo corrente.
    Funzionamento analogo per l'attributo `data-max`

    Sulla data iniziale → data-max
    Sulla data finale   → data-min

    Se uno dei deu campi viene disabilitato, i vincoli vengono rimossi
  */

  // TODO riscrivere DRY

  // TODO possibilità di conservare eventuali attributi min/max di default,
  //      indipendenti dal campo correlato (es: min=now per campo iniziale)


 // data iniziale
 context.querySelectorAll('input[type="date"][data-max], input[type="datetime-local"][data-max]').forEach(el => {
   let campo_correlato = document.getElementById(el.dataset.max);

   if(campo_correlato) {
    el.setAttribute('max', campo_correlato.value);
    campo_correlato.addEventListener('change', () => {
      el.setAttribute('max', campo_correlato.value);
    });

    // l'attributo max viene rimosso se il campo correlato è disabilitato
    el.addEventListener('focus', () => {
      if(campo_correlato.disabled) {
        el.removeAttribute('max');
      } else {
        // ripristina max
        el.setAttribute('max', campo_correlato.value);
      }
    }, false);
   }
  });

  // data finale
  context.querySelectorAll('input[type="date"][data-min], input[type="datetime-local"][data-min]').forEach(el => {
    let campo_correlato = document.getElementById(el.dataset.min);

    if(campo_correlato) {

      // NON funziona => verificare
      // console.log(campo_correlato);
      // console.log(campo_correlato.value);

      // if(campo_correlato.value) { // nel caso fosse presente un'attributo min preimpostato e non fosse ancora impostato il valore iniziale
      //   el.setAttribute('min', campo_correlato.value);

      // } else if(campo_correlato.getAttribute('min')) {

      //   console.log(campo_correlato.getAttribute('min'));
      //   el.setAttribute('min', campo_correlato.getAttribute('min'));
      // }

      campo_correlato.addEventListener('change', () => {
        el.setAttribute('min', campo_correlato.value);
      });

      // l'attributo min viene rimosso se il campo correlato è disabilitato
      el.addEventListener('focus', () => {
        if(campo_correlato.disabled) {
          el.removeAttribute('min');
        } else {
          // ripristina max
          el.setAttribute('min', campo_correlato.value);
        }
      }, false);
    }
  });

}
