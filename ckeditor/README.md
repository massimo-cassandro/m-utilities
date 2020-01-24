# Integrazione CKEditor 5

versione 2.0 - gen 2020

**Integrazione e configurazione di CKEditor.**

La build permette l'integrazione con il *viewer* per immagini e documenti e l'integrazione di alcuni segnaposti predefiniti.

Una volta attivato tramite il loader, ckeditor viene automaticamente attivato a tutti i textarea con classe `editor`.

## Utilizzo di questa distribuzione

Per utilizzare questa build, è sufficiente copiare la dir `ckeditor-dist` nel proprio progetto.
Oltre al file ckeditor, la dir contiene un file `.htaccess` per la gestione della cache.


## Implementazione di CKEditor

Il file ottenuto dalla build  può essere facilmente integrato in ogni progetto utilizzando `_m-ckeditor-loader.js`.

Scopo principale del loader, vista la grande dimensione della build CKE, è di caricarla solo quando necessario, analizzando gli elementi della pagina e caricando CKEditor solo se sono presenti elementi `textarea` con classe `editor`.

È necessario indicare alcuni parametri per il corretto funzionamento di CKEditor (o in alternativa, usare quelli di default):

* Url dello script ckeditor (default `/assets/ckeditor-dist/m-ckeditor-min.js`)
* Url dello script server side per l'upload delle immagini (default `/ckeditor/file-uploader`)
* Url del viewer per le immagini (default `/viewer/`)

Questi tre parametri possono essere definiti in due modi:

* globalmente, tramite la variabile `mUtilities.ckeditor`
* caso per caso, tramite alcuni attributi `data-` da aggiungere al tag script che richiama il loader

### Definizione dei parametri globali

Per la definizione dei parametri globale, è necessario impostarli nella variabile globale `mUtilities.ckeditor` **prima** dell'importazione del loader:

```javascript
window.mUtilities = window.mUtilities || {};
window.mUtilities.ckeditor: {
  cke_url: 'path/to/m-ckeditor-min.js',
  upl_url: 'path/to/uploader',
  img_viewer: `path/to/viewer/`
};
```

Per altre info su uploader e viewer, consultare il file `README-build-editor.md`.

### Definizione dei parametri tramite attributi `data-`

```html
<script src="path/to/_m-ckeditor-loader.js"
  data-cke="path/to/m-ckeditor-min.js"
  data-cke-upl="path/to/uploader"
  data-cke-img-viewer="path/to/viewer/"
></script>
```

Se definiti, gli attributi `data-` prevalgono sempre su quelli globali.

Per info sulla configurazione degli script server-side, il css richiesto ecc, consulta i commenti all'interno dei vari file di test.

## Altre funzionalità del loader

Oltre a caricare lo script ckeditor, il loader segue anche alcune altre operazioni:

### Lista degli editor

All'attivazione, tutte le istanze di ckeditor attivate vengono aggiunte all'oggetto `window.ckeditor_instances`, identificabili dall'id del textarea associato.

In questo modo è possibile eseguire operazioni su ogni editor facendo riferimento a `window.ckeditor_instances.id`, dove `id` è l'id del textarea su cui è stato attivato ckeditor.

### Controllo massima dimensione (KB) immagini

Il caricamento delle immagini all'interno di un elemento CKEditor è limitato di default a 4MB. 

Per variare quel valore, è sufficiente aggiungere al textarea l'attributo `data-cke-upl-max-size` che deve riportare il valore in byte della massima dimensione dell'immagine.

Esempio, per limitare le immagini a 1 MB:

```html
<textarea class="editor" id="textarea1" data-cke-upl-max-size="1048576"></textarea>
```

### Abilitazione textarea

Ad evitare che un textarea sia modificabile prima dell'attivazione di CKeditor (che su reti lente potrebbe avere un delay avvertibile), è sufficiente disabilitarlo e aggiungere l'attributo `data-enable="editor"`.

```html
<textarea class="editor" id="textarea1" data-enable="editor" disabled></textarea>
```

All'attivazione di CKEditor, il campo verrò automaticamente abilitato.


## Utilità

Oltre al loader, possono essere aggiunti al progetto:

* `_m-ckeditor-form-check.js` che aggiunge dei controlli non presenti nativamente in CKEditor: campi required e trimming delle righe vuote
* `_m-ckeditor.scss` supporto per le classi aggiunte da CKEditor (per la gestione di tabelle e immagini) con l'estensione di alcune classi di Bootstrap 4.

In caso di textarea required non compilati, `_m-ckeditor-form-check.js` produce un messaggio d'errore personalizzabile tramite i parametri `mUtilities.ckeditor.requiredErrorMes` e `typeof mUtilities.ckeditor.alertUI`, sostitueendo alle funzioni standard quelle più adatte al proprio progetto.


## Esempio di implementazione di ckeditor e delle utilità

```javascript
window.mUtilities = window.mUtilities || {};

window.mUtilities.ckeditor: {
  
  cke_url: 'path/to/m-ckeditor-min.js',
  upl_url: 'path/to/uploader',
  img_viewer: `path/to/viewer/`,

  requiredErrorMes: elementoRequired => {
    return `L'elemento ${elementoRequired} è obbligatorio`;
  },
  alertUI: mes => {
    myAlertUI(mes);
  }
};

/*
@codekit-append '__path_to_node_modules__/ckeditor/ckeditor-utilities/_m-ckeditor-loader.js'
@codekit-apppend '__path_to_node_modules__/ckeditor/ckeditor-utilities/_m-ckeditor-form-check.js'
*/
```

```scss
@import '__path_to_node_modules__/ckeditor/ckeditor-utilities/_m-ckeditor.scss';
```
