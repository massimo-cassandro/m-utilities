# Sass Utilities

## Raccolta di utilità per lo sviluppo scss:

* `_px2rem.scss` converte un valore da px a rem (di Hugo Giraudel, <https://css-tricks.com/snippets/sass/strip-unit-function/>)
* `_str_replace.scss`search and replace (di Hugo Giraudel, <https://css-tricks.com/snippets/sass/str-replace-function/>)
* `_svg_uri.scss` utilità per l'utilizzo di SVG all'interno di un file scss (di Jakob Eriksen, <https://github.com/waldemarfm/sass-svg-uri/blob/master/_svg-uri.scss>)
* `_color_utilities.scss` utilità per la scelta del colore con il miglior contrasto rispetto ad un background (<https://lnikki.la/articles/sass-better-colour-based-on-brightness/>)
* `_map_deep_get.scss` utilità per la navigazione dentro oggeti multidimensionali (<https://css-tricks.com/snippets/sass/deep-getset-maps//>)
* `_type_checking.scss` Advanced Type Checking (<https://css-tricks.com/snippets/sass/advanced-type-checking/>)
* `_bs4_responsive_columns.scss` multicolonne responsive per BS 4. 
Richiede la definizione delle variabili `$columns-rule` e `$column-gap`.
* `_utility_classes.scss` alcune classi di utilizzo frequente. Questo file generalmente non viene importato ma copiato e adattato alle esigenze del progetto

## Utilizzo

### Utilità
```scss
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_px2rem.scss';
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_str_replace.scss'; // nb: è già inclusa in _svg_uri.scss
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_svg_uri.scss';
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_utilities.scss';
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_color_utilities.scss';
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_map_deep_get.scss';
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_type_checking.scss';
```
### Colonne
```scss
$columns-rule: 1px dotted #ccc; // default
$column-gap: 2rem; // default
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_bs4_responsive_columns.scss';
```

```html
<div class="colonne colonne-3"></div> <!--  tutti i brekapoint -->
<div class="colonne colonne-md-3"></div> <!--  da md in su -->
```

### Classi
```scss
@import '__path_to__/node_modules/front-end-utilities/sass_utilities/_utility_classes.scss';
```

```html
<div class="euro">123</div> <!--  ==> € 123 -->
<div>123<span class="decimali">,99</span></div> <!-- riduce dimensione dei decimali -->
```
