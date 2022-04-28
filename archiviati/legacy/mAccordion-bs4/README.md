# mAccordion

Estensione del modulo [collapse di Bootstrap 4](https://getbootstrap.com/docs/4.0/components/collapse/) per l'ottimizzazione del suo utilizzo come accordion. 

mAccordion richiede che Bootstrap sia compilato con il componente scss `card` e il componente javascript `collapse`.

> NB: La versione attuale di mAccordion fa riferimento alla versione 4.0 di Bootstrap.

## Installazione

Oltre ai moduli BS4 è necessario aggiungere al proprio css il file `_mAccordion_bs4.scs`, personalizzando se necessario, i valori di default delle variabili:

```
//!mAccordion (richiede bootstrap collapse)
$mAccordion-padding                     : .5rem;
$mAccordion-border-color                : $card-border-color;
$mAccordion-border-radius               : $border-radius;
$mAccordion-head-background-color       : $link-color;
$mAccordion-head-color                  : #fff;
$mAccordion-head-font-weight            : $headings-font-weight;
$mAccordion-head-font-size              : 1.2rem;
$mAccordion-head-hover-background-color : $link-hover-color;
$mAccordion-head-hover-color            : #fff;
$mAccordion-head-font-family            : $headings-font-family ;

$mAccordion-wrapper-border-color        : #666;
$mAccordion-wrapper-h2-font-family      : $mAccordion-head-font-family;

@import '__path_to__/node_modules/front-end-utilities/mAccordion/_mAccordion_bs4.scss';
```


## Markup

```twig
<div class="mAccordion" id="mAccordion"  role="tablist">

	{# collapse1 #}
	<div class="card">
		<div class="card-header" role="tab" role="tab"  id="header-__XXXX__">
			<h3>
				<a data-toggle="collapse" href="#collapse-__XXXX__" aria-expanded="true" aria-controls="collapse-__XXXX__">
					Titolo collapse 1
				</a>
			</h3>
		</div>
		<div id="collapse-__XXXX__" class="collapse show" role="tabpanel" aria-labelledby="header-__XXXX__" data-parent="#mAccordion">
			<div class="card-body">

				Contenuto 1

			</div> {# end .card-body #}
		</div> {# end .collapse #}
	</div> {# end .card #}

	{# collapse2 #}
	<div class="card">
		<div class="card-header" role="tab" role="tab"  id="header-__YYYY__">
			<h3>
				<a data-toggle="collapse" href="#collapse-__YYYY__" aria-expanded="false" aria-controls="collapse-__YYYY__">
					Titolo collapse 2
				</a>
			</h3>
		</div>
		<div id="collapse-__YYYY__" class="collapse" role="tabpanel" aria-labelledby="header-__YYYY__" data-parent="#mAccordion">
			<div class="card-body">

				Contenuto 2

			</div> {# end .card-body #}
		</div> {# end .collapse #}
	</div> {# end .card #}

</div> {# end .mAccordion #}
```

Perché un elemento appaia inizialmente aperto (di solito il primo), l'elemento `.collapse` deve avere la classe `show`.


È possibile racchiudere un accordion in un wrapper, associandogli un titolo, utilizzando un elemento con la classe `mAccordion-wrapper`, come nell'esempio seguente:

```twig
<div class="mAccordion-wrapper">
	<h2>Titolo sezione</h2>
	
	{# accordion #}
	<div class="mAccordion" id="mAccordion"  role="tablist">
		{# contenuto dell'accordion #}
	</div> {# end mAccordion #}
	
</div>  {# end wrapper #}
```

In questo caso, è necessario includere nel proprio progetto anche il file `_mAccordion_wrapper_bs4.scss`.

## Personalizzazione del css

Il css di mAccordion può essere personalizzato impostando le seguenti variabili nel prioprio css (sono riportati i valori di default):

```scss
$mAccordion-padding                     : .5rem !default;
$mAccordion-border-color                : $card-border-color !default;
$mAccordion-border-radius               : $border-radius !default;
$mAccordion-head-background-color       : $link-color !default;
$mAccordion-head-color                  : #fff !default;
$mAccordion-head-font-weight            : $headings-font-weight !default;
$mAccordion-head-font-size              : 1.2rem !default;
$mAccordion-head-hover-background-color : $link-hover-color !default;
$mAccordion-head-hover-color            : #fff !default;
$mAccordion-head-font-family            : $headings-font-family !default;
$mAccordion-head-border-bottom          : 1px solid $mAccordion-border-color;

$mAccordion-wrapper-border-color        : #666 !default;
$mAccordion-wrapper-h2-font-family      : $mAccordion-head-font-family !default;
``` 
Le variabili `$border-radius`, `$link-color`, `$link-hover-color`, `$card-border-color` ecc. sono le stesse dell'installazione Boostrap del proprio progetto.
