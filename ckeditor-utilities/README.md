# CKEditor utilities

Utilità per l'implementazione di CKEditor

NB: dalla versione 1.25 di *m-utilities* i parametri per loader e form checker impostati tramite attributi *data-* non sono più supportati.


## Loader

`_m-ckeditor-form-check.js` facilita l'attivazione di CKEditor su un textarea.

Includere lo script e impostare le opzioni:

```js
import CKEloader from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-loader.js'

 CKEloader({
  cke_url: '../ckeditor-dist/m-ckeditor-min.js',
  upl_url: 'test_files/test_server_upload_response.php',
  img_viewer: '/viewer/'
});
```

In cui:

* `cke_url` è l'url dello script CKEditor
* `upl_url` è l'url dello script lato server per l'upload delle immagini (se richiesto)
* `img_viewer` è l'url dell'applicazione per la visualizzazione delle immagini caricate (se richiesto)

Il loader attiva automaticamente CKEditor a tutti i textarea con classe `editor`, applicando la toolbar definita nello script loader.

È inoltre possibile attivare l'editor in forma ridotta, eliminando alcune opzioni non richieste, semplicemente aggiungendo altre classi al textarea:

* la classe `editor` da sola attiva l'editor in forma standard (completa)
* le classi `editor editor-lite` attivano l'editor senza possibilità di inserimento delle immagini
* le classi `editor editor-xlite` attivano l'editor eliminando, oltre alle immagini, le tabelle
* la classe `editor-no-headings`, se aggiunta ad una qualsiasi delle impostazioni precedenti, elimina la gestione degli headings.


## Form checker

`_m-ckeditor-form-check.js` permette di ottimizzare il contenuto di un textarea CKEditor eseguendo il trimming delle righe vuote e controllando eventuali editor con attributo `required`.

Implementazione:

```js
import CKEFormChecker from '@massimo-cassandro/m-utilities/ckeditor-utilities/_m-ckeditor-form-check.js'

 CKEFormChecker({
    requiredErrorMes: requiredElement => {
        return `L'elemento ${requiredElement} è obbligatorio`;
    },
    alertUI: mes => {
        alert(mes);
    }
});
```

In cui: 

* `requiredErrorMes` è la funzione che restituisce la stringa del messaggio d'errore per i campi required. L'argomento è una stringa che permetta all'autente l'identificazione del campo (il contenuto del tag `label`, ad esempio)
* `alertUI` è la funzione che richiama l'interfaccia di visualizzazione dell'errore (default `window.alert`)

`_m-ckeditor-form-check.js` inoltre, elimina le righe vuote (`<p>&nsbp;</p>`) all'inizio e alla fine del blocco di testo.
