# Multiselect

<http://davidstutz.github.io/bootstrap-multiselect/>

## Installazione

Includere il file js dalla distribuzione:

```javascript
@codekit-append '__path_to__/node_modules/bootstrap-multiselect/dist/js/bootstrap-multiselect.js';
```

E allo stesso modo, il file css con l'aggiunta del modulo di adattamento per BS4 dai componenti, personalizzando, se necessario, le variabili relative

```scss
@import '__path_to__/node_modules/bootstrap-multiselect/dist/css/bootstrap-multiselect';

$multiselect-hover-bg: $gray-200;
$multiselect-hover-color: $text-color;
$multiselect-label-padding: .3em 1em;
@import '__path_to__/node_modules/front-end-utilities/multiselect/_multiselect.scss';
```


## Utilizzo: impostazione tipica (Bootstrap 4)

```Javascript
$('select.multiselect', _context).multiselect({
  nonSelectedText                 : '—',
  nSelectedText                   : ' selezionati',
  allSelectedText                 : 'Tutti selezionati',
  selectAllText                   : 'Seleziona tutti',
  filterPlaceholder               : 'Cerca',
  buttonClass                     : 'btn btn-outline-secondary btn-sm',
  buttonContainer                 : '<div class="multiselect_outer_wrapper dropdown" />',
  enableFiltering                 : true,
  enableCaseInsensitiveFiltering  : true,
  enableClickableOptGroups        : true,
  enableCollapsibleOptGroups      : true,
  includeSelectAllOption          : true,
  numberDisplayed                 : 4,
  maxHeight                       : 400,
  selectedClass                   : 'multiselect-selected',
  templates                       : {
    
    button         : '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown">' +
                        '<span class="multiselect-selected-text"></span>' +
                      '</button>',

     filter         : '<li class="multiselect-item filter dropdown-item">'+
                         '<div class="input-group">'+
                           '<span class="input-group-prepend">'+
                             '<span class="input-group-text btn-has-icon">' + 
                             	'<svg class="icona"><use xlink:href="icons.svg#lente"></use></svg>' + 
                             '</span>' +
                           '</span>'+
                         '<input class="form-control multiselect-search" type="text">'+
                         '</div>'+
                       '</li>',

      filterClearBtn : '<span class="input-group-append">'+
                         '<button class="btn btn-outline-secondary btn-has-icon multiselect-clear-filter" type="button">'+
                           '<svg class="icona"><use xlink:href="icons.svg#ui-elimina"></use></svg>'+
                         '</button>'+
                       '</span>',

    //ul             : '<ul class= "multiselect-container dropdown-menu"></ul>',
    li             : '<li class="dropdown-item"><a tabindex="0"><label></label></a></li>'
    //divider        : '<li class="multiselect-item divider"></li>',
    //liGroup        : '<li class="multiselect-item multiselect-group"><label></label></li>'
  }
});
```
