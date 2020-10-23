/* jshint undef: true, unused: true, devel: true, curly: false, eqeqeq: false */
//* globals */
/* exported bs4_accordion2Tabs */

// Massimo Cassandro - 2017

/*
	In produzione:
	@codekit-append 'componenti/bs4_accordion2tabs/_bs4_accordion2tabs.js';
*/

/*

// STRUTTURA TABS
<!-- Nav tabs -->
<ul class="nav nav-pills" role="tablist"> // nav-tabs invece di nav_pills per tab classico
	<li class="nav-item">
		<a class="nav-link active" data-toggle="tab" href="#XXX" role="tab">__TITLE__</a>
	</li>
  ...
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div class="tab-pane active" id="XXX" role="tabpanel"> __CONTENT__ </div>
  ...
</div>


//STRUTTURA ACCORDION (correzione con heading interamente cliccabile)

// nb: la classe `accordion-title` dell'esempio non è standard bs4

<div id="ACCORDION_ID" role="tablist" aria-multiselectable="true">     <-- elemento `accordion_container`
	<section class="card">
		<div role="tab" id="heading-XXX">
			<a class="accordion-title" data-toggle="collapse" data-parent="#ACCORDION_ID" href="#collapse-XXX" aria-expanded="true" aria-controls="collapse-XXX">
	        	<h3>__TITLE__</h3>
	        </a>
		</div>

		<div id="collapse-XXX" class="collapse show" role="tabpanel" aria-labelledby="heading-XXX">
			__CONTENT__
		</div>
	</section>

	...
</div>




//ACCORDION STANDARD (da documentazione bs4)
<div id="ACCORDION_ID" role="tablist" aria-multiselectable="true">
 	<div class="card">
	    <div class="card-header" role="tab" id="heading-XXX">
			<h5 class="mb-0">
				<a data-toggle="collapse" data-parent="#ACCORDION_ID" href="#collapse-XXX" aria-expanded="true" aria-controls="collapse-XXX">
					__TITLE__
				</a>
			</h5>
	    </div>

		<div id="collapse-XXX" class="collapse show" role="tabpanel" aria-labelledby="heading-XXX">
			<div class="card-block">
				__CONTENT__
			</div>
		</div>
	</div>

  ...
</div>

*/


function bs4_accordion2Tabs(accordion_container, switch_breakpoint, tab_pills, title_container_class) {

	switch_breakpoint      = switch_breakpoint || 'sm';              // breakpoint oltre il quale si passa da accordion a tabs e viceversa
	tab_pills              = tab_pills || false;                     // usa nav-pills invece di nav-tabs
	title_container_class  = title_container_class || 'card-header'; // classe dell'elemento da cui ricavare il testo del titolo
	                                                                 // (nella versione modificata dell'accordion è diverso)


	var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'],
		breakpoint_idx = breakpoints.indexOf(switch_breakpoint);

	if(breakpoint_idx < 0 || breakpoint_idx === breakpoints.length -1 ) {
		console.error('Lo switch_breakpoint indicato non ha senso (' + switch_breakpoint + ')');
	} else {

		var accordion_hidden_breakpoint = breakpoints[ breakpoint_idx + 1];

		accordion_container.addClass('hidden-' + accordion_hidden_breakpoint + '-up')
		.after(
			'<div id="bs4_accordion2Tabs" class="hidden-' + switch_breakpoint + '-down">' +
				//Nav tabs
				'<ul class="nav ' + (tab_pills ? 'nav-pills' : 'nav-tabs') + '" role="tablist"></ul>' +
				// Tab panes
				'<div class="tab-content"></div>' +
			'</div>'
		);

		var a2t_wrapper = $('#bs4_accordion2Tabs');

		accordion_container.children('.card').each( function(idx) {
			var _this     = $(this),
				_tab_id   = 'tab-' + (idx++),
				_title    = $('.' + title_container_class, _this).text(),
				_content  = $('.collapse', _this).html() //wrapInner('<div></div>').clone(true, true)
			;

			$('.nav', a2t_wrapper).append(
				'<li class="nav-item">' +
					'<a class="nav-link" data-toggle="tab" href="#' + _tab_id + '" role="tab">' + _title + '</a>' +
				'</li>'
			);

			$('.tab-content', a2t_wrapper).append(
				'<div class="tab-pane" id="' + _tab_id + '" role="tabpanel">' + _content + '</div>'
			);

		});

		$('.nav a:first', a2t_wrapper).tab('show');
	}
}
