# Auto Datatable

Generazione automatica di datatable a partire da un flusso JSON.

Questo script è la riscrittura in ES6 del vecchio plugin jQuery [auto-datatables](../legacy/auto-datatables/README.md) presente in questo repository.

Esempi nella [dir demo](https://github.com/massimo-cassandro/m-utilities/tree/master/auto-datatables/demo)


## Moduli
La procedura comprende due moduli:

### _creaDataTable

Genera un datatable da un flusso JSON

Richiede [DataTable](https://datatables.net/), e [jQuery](https://jquery.com/).


### _autoDataTable

Crea un datatable leggendo gli attributi data assegnati ad un div e utilizzando **_creaDataTable**.

L'utilità di questa funzione è il poter configurare un datatable interamente con attributi data.

il contenitore deve avere gli attributi:

* `data-dt_columns`  definizione delle colonne datatable
* `data-cdt_options`   permette di modificare le altre opzioni di creaDataTable

tipi e opzioni colonne: <https://datatables.net/reference/option/columns.type>

Richiede [DataTable](https://datatables.net/), [Moment JS](https://momentjs.com/), [Mustache JS](https://github.com/janl/mustache.js/) e [jQuery](https://jquery.com/) (+ alcune utility presenti in questo repository).


## Installazione

```bash
npm i --save --only=prod @massimo-cassandro/m-utilities
npm i --save jquery
npm i --save datatables.net

# SOLO SE SE SI UTILIZZA BOOTSTRAP
npm i --save datatables.net-bs4
npm i --save popper.js
npm i --save bootstrap

# SOLO SE SI UTILIZZA ANCHE _autoDataTable
npm i --save moment
npm i --save mustache

# OPZIONALI, DA CONFIGURARE SE UTILIZZATI
# npm i --save datatables.net-responsive-bs4
# npm i --save datatables.net-fixedheader-bs4
# npm i --save datatables.net-rowreorder-bs4
```

## Utilizzo

### _creaDataTable

```html
<div id="dt_container"></div>
```

```js
import {_creaDataTable} from '@massimo-cassandro/m-utilities/auto-datatables/js/_creaDataTable';

_creaDataTable( '#dt_container', options, true );
```

Il primo argomento della funzione può essere un selettore css (stringa), un elemento DOM o un oggetto jQuery.

Vedi lo script e [https://github.com/massimo-cassandro/m-utilities/tree/master/auto-datatables/demo/creaDataTable.html]() per altre info.

### _autoDataTable

```html
<div id="datatable_container"
    data-cdt_options="{ datatable_options: { ... } }"
    data-dt_columns="[ ... ]"></div>
```

Opzione con form di ricerca:

```html
<form id="form_riceca" action="..."> ... </form>
<div id="datatable_container"
    data-cdt_options="{ 
        dtRender: {
            bindToForm: 'form_riceca'
        },
        datatable_options: { ... }
    }"
    data-dt_columns="[ ... ]"></div>
```

```js
import $ from 'jquery';
import {_autoDataTable} from '@massimo-cassandro/m-utilities/auto-datatables/js/_autoDataTable';

_autoDataTable( $('#dt_container') );
```

Vedi lo script e [https://github.com/massimo-cassandro/m-utilities/tree/master/auto-datatables/demo/autoDataTable.html]() per altre info.


## Modifiche rispetto alla versione precedente

* `_creaDataTable` non è più un plugin jQuery, ma un modulo ES6
* Sono state rimosse le opzioni:
    * `jQueryObj` (ora viene sempre restituita un'istanza DataTable)
    * `chainable`
    * `legacy`
