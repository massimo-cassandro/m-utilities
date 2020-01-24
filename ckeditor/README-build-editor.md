# Integrazione CKEditor 5

versione gen 2020

**Integrazione e configurazione di CKEditor.**

La build permette l'integrazione con il *viewer* per immagini e documenti e l'integrazione di alcuni segnaposti predefiniti.


**Documentazione e riferimenti:**

* Documentazione CKEditor 5 (classic build) 
	* <https://docs.ckeditor.com/ckeditor5/latest/builds/>
	* <https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html>
	* <https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html>
	* <https://ckeditor.com/docs/ckeditor5/latest/features/image.html>
* Repository: <https://github.com/ckeditor/ckeditor5-build-classic>
* Altre info utili: <https://ckeditor.com/docs/ckeditor5/latest/builds/guides/faq.html>

## Utilizzo di questa distribuzione

vedi il file README.md.


## Installazione CKEditor

Per personalizzare CKEditor (ad esempio per cambiare la lingua dell'interfaccia o per costruire un uploader personalizzato), è necessario realizzare una *custom build*.

Per costruire la build la via più facile è partire da una distribuzione ufficiale (in questo caso la *Classic Build*), modificare la configurazione e creare una nuova build.

> NB: è necessario aggiungere le cartella `/**/ckeditor` all'elenco delle *skipped folders* di Codekit.


### Scaricare il repository tramite npm

Scaricare i moduli necessari per la compilazione di CKEditor come indicato in <https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html#scenario-2-building-from-source>, è consigliabile consultare il [file package.json originale](https://github.com/ckeditor/ckeditor5-build-classic/blob/stable/package.json) per verificare la presenza di eventuali nuovi moduli.

> NB: far sempre riferimento al branch `stable`

I moduli presenti nella versione attuale (16.0.0/gen 2020) sono:

```json
"dependencies": {
    
    "@ckeditor/ckeditor5-adapter-ckfinder": "^16.0.0",
    "@ckeditor/ckeditor5-autoformat": "^16.0.0",
    "@ckeditor/ckeditor5-basic-styles": "^16.0.0",
    "@ckeditor/ckeditor5-block-quote": "^16.0.0",
    "@ckeditor/ckeditor5-ckfinder": "^16.0.0",
    "@ckeditor/ckeditor5-core": "^16.0.0",
    "@ckeditor/ckeditor5-dev-utils": "^12.0.0",
    "@ckeditor/ckeditor5-dev-webpack-plugin": "^8.0.0",
    "@ckeditor/ckeditor5-easy-image": "^16.0.0",
    "@ckeditor/ckeditor5-editor-classic": "^16.0.0",
    "@ckeditor/ckeditor5-essentials": "^16.0.0",
    "@ckeditor/ckeditor5-heading": "^16.0.0",
    "@ckeditor/ckeditor5-image": "^16.0.0",
    "@ckeditor/ckeditor5-indent": "^16.0.0",
    "@ckeditor/ckeditor5-link": "^16.0.0",
    "@ckeditor/ckeditor5-list": "^16.0.0",
    "@ckeditor/ckeditor5-media-embed": "^16.0.0",
    "@ckeditor/ckeditor5-paragraph": "^16.0.0",
    "@ckeditor/ckeditor5-paste-from-office": "^16.0.0",
    "@ckeditor/ckeditor5-table": "^16.0.0",
    "@ckeditor/ckeditor5-theme-lark": "^16.0.0",
    "eslint": "^5.5.0",
    "eslint-config-ckeditor5": "^2.0.0",
    "husky": "^1.3.1",
    "lint-staged": "^7.0.0",
    "stylelint": "^11.1.1",
    "stylelint-config-ckeditor5": "^1.0.0",
    "postcss-loader": "^3.0.0",
    "raw-loader": "^3.1.0",
    "style-loader": "^1.0.0",
    "terser-webpack-plugin": "^2.2.1",
    "webpack": "^4.39.1",
    "webpack-cli": "^3.3.6"
}
```

A questi moduli sono stati aggiunti: 

* `ckeditor5-alignment` (vedi <https://ckeditor.com/docs/ckeditor5/latest/features/text-alignment.html>)

```bash
npm install --save @ckeditor/ckeditor5-alignment
```

Opzionali:

* `CKEditor 5 highlight` (vedi <https://ckeditor.com/docs/ckeditor5/latest/api/highlight.html>) 

```bash
npm install --save @ckeditor/ckeditor5-highlight
```

Per esiguire i test, installare anche l'inspector ckeditor (vedi <https://ckeditor.com/docs/ckeditor5/latest/framework/guides/development-tools.html#ckeditor-5-inspector>).

```javascript
"devDependencies": {
  "@ckeditor/ckeditor5-inspector": "^1.3.0"
}
```

---

Una volta verificata la presenza di tutti i moduli, procedere con la configurazione e installare il package.

> NB: specialmente nel caso di aggiornamento a nuove versioni, è altamente consigliabile rimuovere totalmente la vecchia cartella `node_modules` e il file `package-lock.json` prima di procedere con l'installazione. **È inoltre essenziale che le versioni delle varie dipendenze siano aggiornate, è consigliabile copiare per intero la lista delle dipendenze dal file `package.json` originale**

> Verificare anche che il file `webpack.config.js` sia allineato con la versione della build a cui si fa riferimento

## Creazione della build

CKEDitor utilizza webpack per la creazione della distribuzione. È quindi necessario creare e configurare i file 

* `m-ckeditor.js`
* `webpack.config.js` 


Vedi 

* <https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html> 
* <https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html#scenario-2-building-from-source>.

È consigliabile effettuare un *diff* tra i file presenti nel progetto e quelli nel repo ufficiale (<https://github.com/ckeditor/ckeditor5-build-classic/tree/stable>) per verificare eventuali nuove funzionalità non presenti nei file della release *m-ckeditor* attuale.




### `ckeditor.js`

Modifiche principali:

* L'inclusione dell'uploader basato su CKFinder è commentata, al suo posto è stato inserito un *adapter* personalizzato per le immagini (vedi più avanti)
* Il linguaggio dell'interfaccia è cambiato in `it`
* Altre modifiche ai plugins di default, alla toolbar ecc.
* Il plugin oEmbed (media) è disattivato


### `webpack.config.js` 

Modifiche principali:

* modifiche a `module.exports`:
  * aggiunto `mode: 'production'`
  * `entry: './src/ckeditor.js'`
  * `output`:
      * `path: path.resolve(__dirname, 'ckeditor-dist')`
      * `filename: 'm-ckeditor-min.js'`
* Il linguaggio dell'interfaccia è cambiato in `it` (in `plugins.language`)
* l'elemento `additionalLanguages: 'all'` (in `plugins.language`) è commentato

### Compilare la distribuzione

Una volta completata la configurazione, compilare l'applicazione con webpack (dalla root del progetto):

```shell
npx webpack
```

Sono richiesti:

* Node.js 6.9.0+
* npm 4+ (note: some npm 5+ versions were known to cause problems, especially with deduplicating packages; upgrade npm when in doubt)



## Viewer Adapter per CKEditor

Questo progetto implementa una build personalizzata di [CKEditor 5 Classic](https://docs.ckeditor.com/ckeditor5/latest/examples/builds/classic-editor.html), nella quale è implementato un Adapter  per le immagini che utilizza un viewer condiviso da tutto l'ambiente.

Vedi:

* <https://ckeditor.com/docs/ckeditor5/latest/framework/guides/creating-simple-plugin.html>
* <https://ckeditor.com/docs/ckeditor5/latest/features/image.html>
* <https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/image-upload.html>
* <https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html>
* <https://ckeditor.com/docs/ckeditor5/latest/api/module_upload_filerepository-FileRepository.html>


Ogni volta che un'immagine viene aggiunta in un textarea CKEditor, la stessa viene inviata in POST (tramite chiamata ajax) a `/ckeditor/file-uploader`:

```php
$_FILES = Array 
(
  [upload] => Array
    (
      [name]  => img.jpg
      [type]  => image/jpeg
      [error] => 0
      [size]  => 123456
    )
)
```

L'uploader provvede alla registrazione dell'immagine, alla scrittura del relativo record nella tabella `files` e quindi restituisce un json di questo tipo:

```json
{
	"id"    : 123,
	"width" : 456
}
```

in cui `id` corrisponde al campo della tabella `files` e `width` alla larghezza (in pixel) dell'immagine.

L'adapter provvede quindi a costruire una serie di url viewer per i vari breakpoint del progetto (compatibilmente con la larghezza massima dell'immagine) e ad invocare l'*imageEngine* che crea il tag `img` e lo inserisce nell'editor.

In aggiunta, per ridurre (nei limiti del possibile) lo storage di immagini inutilizzare, l'adapter aggiunge al form corrente uno o più hidden `hidden` (con `name="ckeditor_imgs[]"` con l'id dell'immagine aggiunta. In questo modo, qualora il form non venisse registrato, diventa possibile eseguire operazioni periodiche di *garbage collection* (vedi il controller dell'uploader) ed eliminare  dal server le immagini caricate e non utilizzate.

Questo non risolve completamente il problema, ma permette almeno di eliminare una parte delle immagini inserite e non utilizzate.

Vedi gli script php di test per altre info.