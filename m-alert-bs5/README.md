# mAlert

Sistema di alert simile a [Sweetalert](https://sweetalert.js.org/) ma basato sul componente [Modal di Boostrap](https://getbootstrap.com/docs/4.5/components/modal/).

Oltre a Bootstrap, richiede jQuery (richiesto da Modal).

## Uso

```javascript
import $ from 'jquery'; // non necessario se non utilizzato nello script che utilizza mAlert
import {mAlert} from '@massimo.cassandro/m-utilities/_mAlert';

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

* **`type`**: Tipo di alert, obbligatorio. Uno tra `success` (default), `error`, `info`, `warning`, `confirm`  
* **`title`**: titolo dell'alert, facoltativo. Default impostato in base al tipo di alert, ma eliminabile impostandolo a null
* **`title_class`**: facoltativo, classe applicata al div del titolo, default variabile in base al tipo
* **`mes`**: testo dell'alert, facoltativo, default null.
* **`ok_btn_text`**: testo del pulsante di conferma, obbligatorio, default 'OK' o stringa random per error e warning
* **`ok_btn_class`**: facoltativo, classe applicata al pulsante OK; default variabile in base al tipo, forzato su `btn-outline-primary` se null
* **`timer`**: facoltativo, default null, Delay in ms oltre il quale l'alert si chiude automaticamente. Non applicabile al tipo confirm
* **`modal_keyboard`**: Obbligatorio, true (default) o false, parametro *keyboard* del componente modal di Bootstrap
* **`modal_backdrop`**: Obbligatorio, true (default per info e success), false o static (defauilt per tutti gli altri), parametro *backdrop* del componente modal di Bootstrap
* **`callback`**: default null. Funzione richiamata quando la finestra modale viene chiusa. Viene invocata con un unico parametro uguale a `null` (per tutti i tipi di alert eccetto confirm) oppure, solo nel caso di `confirm`,  a `true` (conferma) o `false` (annullamento)

Solo per *confirm*:

* **`cancel_btn_text`**: testo del pulsante di annullamento, obbligatorio (solo per confirm), default 'Annulla'
* **`cancel_btn_class`**: obbl. solo per confirm, default `btn-outline-primary`


`mAlert` imposta una promessa che restituisce `true` se viene premuto il pulsante di conferma (o se la finestra si chiude automaticamente se è stato impostato un `timer`), o `false` se viene premuto il tasto di annullamento (solo confirm);


## Esempi

Vedi anche [demo/index.html](./demo/index.html).

### Success

```js
mAlert({
    type: 'success',
    title: 'Custom title',
    mes: demo_mes
});
```

### Confirm con callback:

```javascript
mAlert({
    type: 'confirm',
    [...],
    callback: function(esito) {
        console.log( esito? 'Confermato' : 'Annullato');
    }
});
```

### Confirm su form submit


```js
form.addEventListener('submit', e => {
    e.preventDefault();

    mAlert({
        type           : 'confirm',
        title          : 'Confirm submit?',
        mes            : null,
        callback       : function(result) {
            return result;
        }
    })
    .then(function(result) {
        if(result) {
            form.submit();
        } else {
            ...
        }
    });
});

```


Con jQuery:

```js
$('form').on('submit', function(e) {
    e.preventDefault();

    mAlert({
        type           : 'confirm',
        title          : 'Confirm submit?',
        mes            : null,
        callback       : function(result) {
        return result;
        }
    })
        .then(function(result) {
            if(result) {
                $('form').unbind('submit').submit();
            } else {
                // ?
            }
        });
});

```
