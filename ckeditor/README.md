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


Per altre info su uploader e viewer, consultare [ckeditor-utilities/README.md](../ckeditor-utilities/README.md).

Per info sulla compilazione di CKEditor: [README-build-editor.md](README-build-editor.md).
