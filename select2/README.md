#select2

[TOC]

Select 2 è utilizzato per produrre elementi autocomplete dinamici.

**Sito ufficiale:**
<https://select2.org/>
<https://github.com/select2/select2-bootstrap-theme>

## Installazione

### JS

Includere nel proprio progetti i file della distribuzione select 2 e il modulo di personalizzazione:

```javascript
@codekit-append '__path_to__/node_modules/m-utilities/select2/dist/js/select2.full.js';
#codekit-append '__path_to__/node_modules/m-utilities/select2/dist/js/i18n/it.js';
@codekit-append '__path_to__/node_modules/m-utilities/front-end-utilities/select2/_select2.js';
```

> NB: questa installazione utilizza ed estende il tema “Bootstrap” di select2

### CSS

Includere i file della distribuzione select2 e il file di personalizzazione per bootstrap 4 e impostare le variabili necessarie


```scss
// !select2
$s2bs-border-radius-base                : $border-radius;
$s2bs-border-radius-large               : $border-radius-lg;
$s2bs-border-radius-small               : $border-radius-sm;
$s2bs-btn-default-bg                    : map-get($theme-colors, secondary);
$s2bs-btn-default-border                : darken(map-get($theme-colors, secondary), 20);
$s2bs-btn-default-color                 : $black;
$s2bs-caret-width-base                  : .3rem; //$caret-width;
$s2bs-caret-width-large                 : .3rem; //$caret-width;
$s2bs-cursor-disabled                   : not-allowed; //$cursor-disabled;
$s2bs-dropdown-header-color             : $dropdown-header-color;
$s2bs-dropdown-link-active-bg           : map-get($theme-colors, primary); // $dropdown-link-active-bg;
$s2bs-dropdown-link-active-color        : $dropdown-link-active-color;
$s2bs-dropdown-link-disabled-color      : $dropdown-link-disabled-color;
$s2bs-dropdown-link-hover-bg            : $dropdown-link-hover-bg;
$s2bs-dropdown-link-hover-color         : $dropdown-link-hover-color;
$s2bs-font-size-base                    : $font-size-base;
$s2bs-font-size-large                   : $font-size-lg;
$s2bs-font-size-small                   : $font-size-sm;
$s2bs-padding-base-horizontal           : $btn-padding-x;
$s2bs-padding-large-horizontal          : $btn-padding-x-lg;
$s2bs-padding-small-horizontal          : $btn-padding-x-sm;
$s2bs-padding-base-vertical             : $btn-padding-y;
$s2bs-padding-large-vertical            : $btn-padding-y-lg;
$s2bs-padding-small-vertical            : $btn-padding-y-lg;
$s2bs-line-height-base                  : $line-height-base;
$s2bs-line-height-large                 : $line-height-lg;
$s2bs-line-height-small                 : $line-height-sm;
$s2bs-input-bg                          : $input-bg;
$s2bs-input-bg-disabled                 : $input-disabled-bg;
$s2bs-input-color                       : $input-color;
$s2bs-input-color-placeholder           : $input-placeholder-color;
$s2bs-input-border                      : $input-border-color;
$s2bs-input-border-focus                : $input-focus-border-color;
$s2bs-input-border-radius               : $input-border-radius;
$s2bs-input-height-base                 : $input-height;
$s2bs-input-height-large                : $input-height-lg;
$s2bs-input-height-small                : $input-height-sm;

// Theme-specific variables
// -------------------------

$s2bs-dropdown-arrow-color              : $s2bs-input-color-placeholder;
$s2bs-dropdown-box-shadow               : 0 6px 12px rgba(0,0,0,.175);
$s2bs-dropdown-box-shadow-above         : 0px -6px 12px rgba(0,0,0,.175);
$s2bs-clear-selection-color             : $s2bs-dropdown-arrow-color;
$s2bs-clear-selection-hover-color       : $s2bs-btn-default-color;
$s2bs-remove-choice-color               : $s2bs-input-color-placeholder;
$s2bs-remove-choice-hover-color         : $s2bs-btn-default-color;
$s2bs-selection-choice-border-radius    : $border-radius;
$s2bs-dropdown-header-padding-vertical  : $s2bs-padding-base-vertical;
$s2bs-dropdown-header-font-size         : $s2bs-font-size-small;

// conversione variabili bs3 → bs4
$screen-sm-min: map-get($grid-breakpoints, sm);
$state-warning-text: darken(map-get($theme-colors, warning), 10);
$state-danger-text: darken(map-get($theme-colors, danger), 10);
$state-success-text: darken(map-get($theme-colors, success), 10);

@import '__PATH_TO_BOWER_COMPONENTS__/select2/dist/css/select2';
@import '__PATH_TO_BOWER_COMPONENTS__/select2-bootstrap-theme/src/select2-bootstrap.scss';

// personalizzazioni:
$s2bs4-message-color: #666;
@import '__path_to__/node_modules/front-end-utilities/select2/_select2_bs4.scss';
```

## Utilizzo del componente select2

Scopo del componente select2 è quello di permettere la configurazione di un elemento di un form utilizzando solo attributi *data* senza la necessità di aggiungere codice JS specifico.

L'attivazione dell'autocomplete select2 viene applicato ai select tramite la classe `s2`.

All'elemento select vanno inoltre aggiunti questi attributi data:
* `s2_json`: url del controller che produce il json
* `s2_text`: array di nomi campo del file json da utilizzare come *text* degli options. Questo parametro può essere omesso nel caso si utilizzino funzioni `templateResult` e `templateSelection` personalizzate.
* `s2_id`: campo del json da utilizzare come value degli options (default `id`) (attualmente non attivo **DA IMPLEMENTARE**)

I json devono avere una struttura di questo tipo:

```json
[
	{
		"id"         : 123,
		"text_field" : "label"
	}
]
```

> NB: **per problemi di conflitto con select2 non utilizzare elementi con nome campo `text`** se sono presenti più campi testo da concatenare.

**Esempio di utilizzo**

```html
<div class="form-group">
	<label for="s2_test">Select2</label>
	<select id="s2_test" class="s2 form-control" 
   		data-s2_json="/path/to/json" 
   		data-s2_text="citta">
   	</select>
</div>
```

### Attributi `data`

Un elemento select2 può essere configurato utilizzato diversi attributo `data`:

* **s2\_json**: [obbligatorio] url del json sorgente dei dati
* **s2\_text**: [facoltativo, *può essere omesso solo se è presente il parametro `template-result`*] elemento del json da utilizzare come etichetta del record. Può essere una stringa (es.: `text_field`) o un array (`["text_field1", "text_field2", ...]`) in questo caso l'etichetta sraà costruita concatenando gli elementi con ` - `. Un'ulteriore opzione è offerta dalla possibilità di utilizzare un funzione di rendering ad hoc (vedi <https://select2.org/dropdown#templating>) da indicare nel parametro `template-result`.

### Parametri select2

Questi parametri sono specifici di select2 e possono essere inviati all'applicazione tramite attributi data o tranite script:

* **template-result**: [facoltativo] funzione da utilizzare per il rendering dei risultati della ricerca (vedi *s2_text*)
* **template-selection** [facoltativo] funzione da utilizzare per il rendering della selezione effettuata. Se non è presente viene impostato uguale al risultato della ricerca
* **escape-markup**: [facoltativo] funzione utilizzata per eliminare il markup dai risultati o dalla selezione, se necessario. L'impostazione di default non esegue alcuna modifica
* **minimum-input-length**: [facoltativo] lunghezza minima della stringa perché sia avviata la ricerca (default: `3`)
* **placeholder**: [facoltativo] stringa da utilizzare come placeholder dell'autocomplete (default: `Clic per selezionare`)

Per gli altri parametri select2, far riferimento alla documentazione ufficiale.

### Gestione dei parametri di ricerca

L'url del json sorgente dei dati viene costruito in base al parametro di ricerca inserito dall'utente e ad alcuni parametri:

* **s2\_query\_mode**: [facoltativo] `path` (default) o `query_string`. Nel primo caso, il termine di ricerca, preceduto da uno slash, viene aggiunto in coda all'url del json, nel secondo caso viene accodato come una query string classica:
	*  *path parameter* → `/path/to/json/stringa_ricerca`
	*  *query string* → `/path/to/json?q=stringa_ricerca `
* **s2\_query\_params**: [facoltativo] json di elementi *chiave=valore* da aggiungere all'url del json come query string.

Esempio dell'url ottenuto con *s2_query_mode='path'* e *s2_query_params ='{"var1": "val1", "var2": "val2"}'*: 

```
/path/to/json/stringa_ricerca?var1=val1&var2=val2
```
## JSON predefiniti

Per rendere ancora più rapido l'utilizzo di select2, è possibile impostare delle funzionalità standard tramite alcuni elementi chiave, che richiamano select2 assegnandogli alcuni parametri predefiniti.

In questo modo, è possibile limitare la configurazione degli elementi select ad un unico parametro `data`, permettendo così una più rapida implementazione e manutenzione.

È possibile, ad esempio, impostare una modalità *province* che predisponga tutti i parametri per la costruzione di un autocomplete delle province d'Italia.

**Esempio**

```html
<div class="form-group">
	<label for="s2_test">Province</label>
	<select id="s2_test" data-s2="province" class="form-control">
   	</select>
</div>
```
Notare come in questo caso non siano più necessari né la classe `s2` né i vari elementi `data`.

Nel javascript si utilizza la funzione globale `mUtilities.set_select2_options` definita in `__path_to__/node_modules/front-end-utilities/select2/_select2.js`:

```javascript
// impostazioni predefinite per select2
(function() {
	"use strict";
	
	$('[data-s2]').each( function() {

		var _this = $(this),
			s2_options = {};

		switch ( _this.data('s2') ) {
			case 'province':
            	s2_options = {
            		's2_json': '/url/controller/province',
            		's2_text': ['sigla', 'descrizione']
				};
				break;
			// ...
		}
		
    	_this.select2( mUtilities.set_select2_options( s2_opts ) );
	});

})();

```
