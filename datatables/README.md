# Datatables config & creaDatatable

[TOC]

Configurazione per [jQuery Datatable](https://datatables.net/) e del plugin jQuery **creaDatatable** per la costruzione dinamica delle tabelle partendo da un file JSON.

Le tabelle datatable possono quindi essere create seguendo le istruzioni ufficiali oppure impostando un div richiedono un div contenitore con le classi `dt_container` e `auto_dt` e  con alcuni attributi `data-`:

```html
<div class="dt_container auto_dt" data-dt_columns="..." data-cdt_options="..."></div>
```

Negli attributi *data* andranno inserite le informazioni relative al JSON sorgente dei dati e ai parametri di configiurazione della tabella.


## Installazione

Includere nell'ordine:

* datatables          → `jquery.dataTables.js`
* datatables          → `dataTables.bootstrap4.js` (o altro framework)
* front-end-utilities → `_datatables_config_base.js` (riscrittura defaults)
* front-end-utilities → `_datatables_config_bs4` (personalizzazione config bootstrap 4)
* front-end-utilities → `_datatable_crea_dt.js` (plugin creaDatatable)


L'implementazione datatable richiede la configurazione della variabile globale `datatable_setup`.

In questo modo è possibile definire le icone utilizzate per i valori booleani, definire lo spinner di caricamento (vedi **Esempio di installazione**), ecc...

Alcuni parametri datatable possono essere definiti anche tramite `$.fn.dataTable.defaults`:

```js
$.extend( true, $.fn.dataTable.defaults, {
	language: {
		processing: '__spinner_markup__',
	}
});
```

Lo spinner di default per l'opzione processing è `.basic_spinner.big`.

Per *creaDatatable* e *autoDatatable* è inoltre necessario che siano presenti:

* [Mustache.js](http://github.com/janl/mustache.js)
* [Moment.js](https://momentjs.com/)
* Lo script `JSutils.number_format`

### Esempio di installazione:

#### JS
```javascript

@codekit-append quiet '../../node_modules/datatables.net/js/jquery.dataTables.js'
@codekit-append quiet '../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js'

// estensioni (facoltative)
--codekit-append quiet '../../node_modules/datatables.net-responsive/js/dataTables.responsive.js';
--codekit-append quiet '../../node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.js'

--codekit-append quiet '../../node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.js'
--codekit-append quiet '../../node_modules/datatables.net-fixedheader-bs4/js/fixedHeader.bootstrap4.js'

--codekit-append quiet '../../node_modules/datatables.net-rowreorder/js/dataTables.rowReorder.js'
--codekit-append '../../node_modules/datatables.net-rowreorder-bs4/js/rowReorder.bootstrap4.js'

//config
@codekit-append '../../node_modules/front-end-utilities/datatables/_js/_datatables_config_base.js'
@codekit-append '../../node_modules/front-end-utilities/datatables/_js/_datatables_config_bs4.js'
@codekit-append '../../node_modules/front-end-utilities/datatables/_js/_datatable_crea_dt.js'



var datatable_setup = {

  datatable_options: {

    serverSide     : true,
    paging         : true,
    pageLength     : 25,
    language: {
      processing: myapp.spinner({overlay:false})
    },
    responsive       : {
      breakpoints: [
        { name: 'desktop', width: Infinity },
        { name: 'tablet',  width: 1024 },
        { name: 'fablet',  width: 768 },
        { name: 'phone',   width: 480 }
      ]
    },
    stateSave        : true,
    stateDuration    : -1, //sessionStorage
    columnDefs       : [{
      orderable      : true,
      targets        : ['_all']
    }],
    ajax             : null,
    order            : null,
    columns          : []
  },

  icone: {
    ok  : myapp.icone.ok,
    off : myapp.icone.off
  },

  formats: {
    moment_datetime : myapp.formats.moment_datetime,
    moment_date     : myapp.formats.moment_date
  },

  //container_header: 'Risultato della ricerca', // se presente aggiunge un header prima della tabella

  //container_class: 'dt_container', // classe che viene assegnata al div che contiene la tabella
  //container_header_level: 2, // livello gerarchico dell'header (h2, h3, ecc...)
  // table_id: 'table_result',
  table_class: 'table table-striped table-bordered table-hover'
  //table_caption: '',
  //table_footer: false, // se true aggiunge una riga tfoot alla tabella, da popolare con un callback
  //extra_info:''
};

```

#### SCSS (bs4)

Configurazione scss:

```scss

$datatable_responsive_border_color  : #ccc;
$datatable_head_border_color        : #000; //colore del bordo inferiore degli elementi th
$datatable_active_sorting_color     : #000  // colore della freccia che mostra l'ordinamento nella colonna selezionata


@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatable_vars.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatable_vars.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_creaDatatable.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatable_processing.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatatable_controls_bs4.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatatable_table_bs4.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatatable_sorting_bs4.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatatable_paging_bs4.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatables_classes.scss';
@import '__path_to__/node_modules/front-end-utilities/datatables/_scss/_datatatable_responsive.scss';

// datatable
//@import '__path_to__/node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css';

// datatable responsive (facoltativa)
@import '__path_to__/node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4';

//fixed header (facoltativa)
//@import '__path_to__/node_modules/datatables.net-fixedheader-bs4/css/fixedHeader.bootstrap4';

// rowreorder (facoltativa)
@import '__path_to__/node_modules/datatables.net-rowreorder-bs4/css/rowReorder.bootstrap4';
```


## Uso

Il plugin restituisce un'istanza DataTable in base ai parametri impostati:

```js
if(opts.jQueryObj) {
    dt = $('#' + opts.table_id ).dataTable(opts.datatable_options);   // jQuery obj
} else {
    dt = $('#' + opts.table_id ).DataTable(opts.datatable_options);  // datatable istance
}

if( opts.chainable ) {
    return this;
} else {
    return dt;
}
```


## Auto datatable

È possibile impostare il datatable direttamente nel file html aggiungendo i parametri necessari al contenitore come attributi `data`:

```twig
<div class="auto_dt” 
	data-cdt_options="{{ {
		datatable_options : {
			ajax: 'datatable.json',
			order: [[1,'asc']]
		}
	}|json_encode|e('html_attr') }}" 
	data-dt_columns="{{ [
		{
			dtRender  : { type: 'id' }
		},
		{
			title     : 'Nome',
			name      : 'nome',
			dtRender  : {
				type        : 'tpl',
				sf_base_url : path('url_scheda'),
				tpl         : '<a href="[[sf_base_url]][[id]]">[[nome]]</a>'
			}
		},
		
	]|json_encode|e('html_attr') }}"
></div>
```
Il div contenitore deve avere la classe `dt_container` per attivare la personalizzazione del css (la classe è assegnata automaticamente da creaDataTable) e, opzionalmente, la classe `auto_dt` per attivare il datatable senza ulteriori comandi.

In cui: `cdt_options` è l'array delle opzioni di `creaDataTable` (esclusi i valori delle colonne).

Nel caso di datatable legati ad un form di ricerca, è necessario aggiungere a `cdt_options` il parametro `bindToForm` (a cui va assegnato l'id del form utilizzato per la ricerca), in sostituzione del parametro `ajax` (viene utilizzata l'action del form):

```html
<div class="dt_container” 
	data-cdt_options="{{ {
		dtRender: {
			bindToForm: 'f_ricerca'
			[, formSubmitButton: 'submitButton' ]
		},
		datatable_options : {
			order: [[1,'asc']]
		}
	}|json_encode|e('html_attr') }}" 
>
``` 

È inoltre possibile aggiungere il parametro `formSubmitButton` corrispondente all'id dell pulsante di submit del form. In sua assenza viene utilizzato il valore di default `submitButton`

Per le colonne va utilizzata la sintassi standard datatable, con alcune modifiche impostate dall'elemento aggiuntivo `dtRender.type`:

* l'elemento `{ dtRender  : { type: 'id' } }` viene interpretato come:
	
```javascript
{
	title     : '#',
	data      : 'id',
	name      : 'id',
	className : "text-center small text-muted",
	type      : "num"
}
```
* il tipo `tpl` imposta un template *Mustache*. In questo caso il parametro aggiuntivo `tpl` corrispondente al template Mustache e il parametro `sf_base_url` corrispondente all'url symfony della pagina il cui url va incluso nel template:
	
```html
{
	title     : 'Nome',
	name      : 'nome',
	dtRender  : {
		type        : 'tpl',
		sf_base_url : path('url_scheda'),
		tpl         : '<a href="[[sf_base_url]][[id]]">[[nome]]</a>'
	}
}
		
```

e inoltre: 

* `sf_date`: campi data Symfony
* `num`: campi numerici da formattare con il separatore delle migliaia e il numero di decimali corrispondente al parametro `decimali` (defailt = 0)
* `euro`: celle con il simbolo euro e due decimali
* `bool_icons`: booleano che imposta le icone `componenti.icone.ok` e `componenti.icone.off`
* `striptags`: campo di testo con markup trasformato in plain text

Per dettagli e altre tipologie, vedere il file *_datatable_crea_dt.js*.

Una volta terminata la configurazione, il datatable può essere attivato tramite il plugin jQuery `dt`:

```javascript
$('#container_id').dt();
```

oppure in modo automatico, semplicemente aggiungendo al div contenitore la classe `auto_dt`.

Se fosse necessario aggiungere callback o altre personalizzazioni particolari, il datatable va attivato da script, aggiungendo i parametri aggiuntivi come argomento dello script dt. L'argomento un oggetto corrispondente configurato come le opzioni standard di CreaDataTable. Ad esempio per aggiungere due callback:

```javascript
$('#container_id').dt({
	datatable_options: {
		createdRow: function( row, row_data ) {
		
			if(row_data.my_value)
				rowClass='table-warning';
			} else { 
				rowClass='table-success';
			} 

			if(rowClass) {$(row).addClass(rowClass);}
		},

		stateSaveCallback: function ( ) {
			localStorage.setItem( 'customStorage', 1);
		}
	}
});
```


