# mAlert

Sistema di alert simile a [Sweetalert](https://sweetalert.js.org/) ma basato sul componente [Modal di Boostrap](https://getbootstrap.com/docs/4.0/components/modal/).


## Uso

```javascript
mAlert({
    type              : 'success', // success (default), error, info, warning, confirm  
    title             : 'Operazione completata',
    title_class       : 'text-success',
    mes               : null,
    ok_btn_text       : 'OK',
    ok_btn_class      : 'btn-success',
    cancel_btn_text   : 'Annulla',
    cancel_btn_class  : 'btn-outline-warning',
    callback          : null,
    timer             : 4000, // ms
    modal_keyboard    : true,
    modal_backdrop    : true
});
```

In cui:

* **type**: Tipo di alert, obbligatorio. Uno tra success (default), error, info, warning, confirm  
* **title**: titolo dell'alert, facoltativo. Default impostato in base al tipo di alert, ma eliminabile impostandolo a null
* **title_class**: facoltativo, classe applicata al div del titolo, default variabile in base al tipo
* **mes**: testo dell'alert, facoltativo, default null.
* **ok\_btn\_text**: testo del pulsante di conferma, obbligatorio, default 'OK' o stringa random per error e warning
* **ok\_btn\_class**: facoltativo, classe applicata al pulsante OK; default variabile in base al tipo, forzato su `btn-outline-primary` se null
* **timer**: facoltativo, default null, Delay in ms oltre il quale l'alert si chiude automaticamente. Non applicabile al tipo confirm
* **modal\_keyboard**: Obbligatorio, true (default) o false, parametro *keyboard* del componente modal di Bootstrap
* **modal\_backdrop**: Obbligatorio, true (default per info e success), false o static (defauilt per tutti gli altri), parametro *backdrop* del componente modal di Bootstrap
* **callback**: obbligatorio solo per confirm, default null. Funzione richiamata quando la finestra modale viene chiusa. Viene invocata con un unico parametro uguale a `null` (per tutti i tipi di alert eccetto confirm) oppure, solo nel caso di **confirm**,  a `true` (conferma) o `false` (annullamento)

Solo per *confirm*:

* **cancel\_btn\_text**: testo del pulsante di annullamento, obbligatorio (solo per confirm), default 'Annulla'
* **cancel\_btn\_class**: obbl. solo per confirm, default `btn-outline-primary`


Esempio callback confirm:

```javascript
mAlert({
    type: 'confirm',
    [...],
    callback: function(esito) {
        console.log( esito? 'Confermato' : 'Annullato');
    }
});
```
