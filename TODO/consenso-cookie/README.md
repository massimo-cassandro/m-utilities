#Script per informativa Cookie

`cookie_banner.js` è un piccolo script per visualizzare l'avviso informativo sull'utilizzo dei cookie.

Ogni pagina che richiama questo script, deve contenere il markup per la visualizzazione dell'informativa sui cookie.


`cookie_banner.js` non utilizza alcun framework js.

In ogni pagina, prima della chiamata del file `cookie_banner.js` 
deve essere presente il markup per la visualizzazione dell'avviso.

Il markup può essere inserito in fondo alla pagina per non essere rilevato come prima stringa dai robot di indicizzazione e va impostato come `hidden` (è possibile utilizzare anche `style="display:none"`) o messo all'interno di un elemento `hidden`:


```
<div id="cookie_policy_banner" hidden>
	<div>
		<div>
			Questo sito non utilizza cookie di profilazione e utilizza alcuni cookie di terze parti per offrirti il miglior servizio possibile.
			Proseguendo nella navigazione acconsenti all’utilizzo di cookie in conformit&agrave; alla nostra <a href="/pagina-informativa-privacy.html" rel="nofollow">Cookie Policy</a>.
		</div>
		<div>
			<button type="button" id="cookie_policy_button_OK">OK</button>
		</div>
	</div>
</div>
```
I vari elementi (`div`, testo e pulsanti) possono essere formattati in base alle specifiche del framework utilizzato, ma è essenziale che il `div` più esterno abbia l'attributo `id="cookie_policy_banner"` e il pulsante abbia `id="cookie_policy_button_OK"`.

Se necessario, possono essere aggiunti div contenitore in base alle necessità del framework. Ad esempio con bootstrap:

```
<div id="cookie_policy_banner" hidden>
	<div class="container">
		<div class="row">
			<div class="col-sm-10">
				<p><small>Questo sito non utilizza cookie di profilazione e utilizza alcuni cookie di terze parti per offrirti il miglior servizio possibile.
				Proseguendo nella navigazione acconsenti all’utilizzo di cookie in conformit&agrave; alla nostra <a href="/pagina-informativa-privacy.html" rel="nofollow">Cookie Policy</a>.</small></p>
			</div>
			<div class="col-sm-2">
				<p><button type="button" id="cookie_policy_button_OK" class="btn btn-default btn-block">&times;</button></p>
			</div>
		</div>
	</div>
</div>
```

Il punto in cui lo script posizionerà il markup visualizzato dagli utenti viene indicato dall'elemento

```
<div id="cookie_policy_banner_wrapper"></div>
```

NB:
nella formattazione del banner, non tenere conto dell'ID `#cookie_policy_banner` che viene rimosso durante l'operazione,
assegnare eventuali regole css a `#cookie_policy_banner_wrapper`:

```
#cookie_policy_banner_wrapper, #cookie_policy_banner_wrapper > div { ... }
```

**NB: il testo dell'avviso è puramente indicativo e va verificato sulla base del caratteristiche del sito e del tipo di cookie utilizzati.**


## Disclaimer
Questo  programma è  software  libero; è  lecito redistribuirlo  o
modificarlo secondo i termini  della Licenza Pubblica Generica GNU
come è pubblicata dalla Free  Software Foundation; o la versione 2
della licenza o (a propria scelta) una versione successiva.

Questo programma  è distribuito nella  speranza che sia  utile, ma
SENZA  ALCUNA GARANZIA;  senza  neppure la  garanzia implicita  di
NEGOZIABILITÀ  o di  APPLICABILITÀ PER  UN PARTICOLARE  SCOPO.  Si
veda la Licenza Pubblica Generica GNU per avere maggiori dettagli.
