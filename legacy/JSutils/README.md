#JSutils

Utilità Javascript.

Per l'inclusione in un progetto è necessario includere il modulo base e i moduli aggiuntivi desiderati:

```
/* 

@codekit-append 'path/to/node_modules/m-utilities/JSutils/_JSutils.js';

@codekit-append 'path/to/node_modules/m-utilities/JSutils/moduli/_jsu_escapeHTML.js';
@codekit-append 'path/to/node_modules/m-utilities/JSutils/moduli/_jsu_number_format.js';
@codekit-append 'path/to/node_modules/m-utilities/JSutils/moduli/_jsu_url_append.js';
@codekit-append 'path/to/node_modules/m-utilities/JSutils/moduli/_jsu_text_utilities.js';
@codekit-append 'path/to/node_modules/m-utilities/JSutils/moduli/_jsu_getQueryVariables.js';
@codekit-append 'path/to/node_modules/m-utilities/JSutils/moduli/_jsu_executeFunctionByName.js';
*/
```

Utilizzo: `JSutils.__modulo__( argomento1 [, argomento2][, ...] )`

## Descrizione dei moduli

### `escapeHTML`

Converte in entità HTML alcuni caratteri della stringa data.

```javascript
JSutils.escapeHTML('"Stringa"'); 
// → "&quot;Stringa&quot;"
```

### `number_format`

Analogo al number_format di PHP, converte un numero in una stringa numerica secondo le impostazioni italiane.

Uso: `JSutils.escapeHTML(numero, decimali);`

Il parametro decimali è facoltativo, il valore di default è `0`;

```javascript
JSutils.number_format(123456.789, 2); 
// → "123.456,79"
```

### `url_append`

Appende il valore indicato ad un url come parametro get utilizzando l'operatore corretto tra `?` e `&` e restituisce l'url completo.

```javascript
JSutils.url_append('/url?param1', param2); 
// → "url?param1&param2"
```

### `getQueryVariables`

Restituisce un oggetto con le coppie nomi valori della parte query dell'url corrente

```javascript
var obj = JSutils.getQueryVariables(); 
// → obj == {var1 : "val1", var2: "val2", ...}
```

### `text_utilities`

Utilità per la formattazione del testo.

*text_utilities* è composto da due funzioni distinte: `better_text` e `text_cleaner`.

**better_text** ottimizza una stringa, correggendo dove possibile spazi e punteggiatura, virgolette, ecc...

```javascript
JSutils.better_text('Stringa di "prova",con punteggiatura e un\'apostrofo  !');
// → "Stringa di “prova”,con punteggiatura e un’apostrofo!"
```
**text_cleaner** ripulisce una stringa di testo html dal markup indesiderato, ad esempio proveniente da *copia&incolla* di Word;

```javascript
JSutils.text_cleaner('<p class="classe" style="color:red">Testo di <font size="2">prova</font></p>');
// → "<p>Testo di prova</p>"
```

## `executeFunctionByName`

Esegue una funzione da un nome in forma di stringa.

Vedi <https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string>

```javascript
JSutils.executeFunctionByName('nome_funzione' [,namespace][, arg1, arg2,...]);

```
