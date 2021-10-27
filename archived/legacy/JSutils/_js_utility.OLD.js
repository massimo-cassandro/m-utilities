/* jshint undef: true, unused: true, devel: true, curly: false, eqeqeq: false */
// globals
/* exported JSUtil */

/*
 * js utility
 * Massimo Cassandro 2013-2016
 */

var JSUtil = function () {
	"use strict";

	this.date_input_support = function () {
	    var input = document.createElement('input');
	    input.setAttribute('type','date');

	    var notADateValue = 'not-a-date';
	    input.setAttribute('value', notADateValue);

	    return (input.value !== notADateValue);
	};
	this.storage_support = function() {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch(e){
			return false;
		}
	};

	this.number_format = function (number, decimals) {

	    if(decimals === undefined) decimals=0;
	    number = Number( number);

	    function toLocaleStringSupportsLocales() {
	        var nn = 0;
	        try {
	            nn.toLocaleString("i");
	        } catch (e) {
	            return e.name === "RangeError";
	        }
	        return false;
	    }

	    if(toLocaleStringSupportsLocales()) {
			number = Number(number.toFixed(decimals));
	        return number.toLocaleString("it-IT", { minimumFractionDigits: decimals });

	    } else {

	        // http://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript
	        number = number.toFixed( decimals );
	        var number_parts = String(number).split('.');

	        return number_parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + ( decimals ? ',' + number_parts[1] : '');
	    }
	};

	this.escapeHTML=function(text) {
	    var characters = {
	        '&': '&amp;',
	        '"': '&quot;',
	        "'": '&#039;',
	        '<': '&lt;',
	        '>': '&gt;'
	    };

	    return (text + "").replace(/[<>&"']/g, function(m){
	        return characters[m];
	    });
	};


	this.svg_circle_spinner = function () {
		return '<div class="circle_spinner_wrapper">' +
				'<svg class="circle_spinner" width="200" height="200">' +
				  '<circle cx="100" cy="100" r="50" />' +
				'</svg>' +
			'</div>';
	};

	this.spinner_rettangoli = function ( options ) {


		var _defaults = {
			colore: null, // esadecimale (con #), nome colore, funzione colore ecc.
			small: false
		},
		opts = $.extend(_defaults, options);

		opts.colore = ' style="background: ' + opts.colore + ';"' || '';

		return '<div class="spinner_rettangoli' + (opts.small? ' small' : '') + '">'+
			'<div class="rect1"' + opts.colore + '></div>' +
			'<div class="rect2"' + opts.colore + '></div>' +
			'<div class="rect3"' + opts.colore + '></div>' +
			'<div class="rect4"' + opts.colore + '></div>' +
			'<div class="rect5"' + opts.colore + '></div>' +
		'</div>';
	};

	this.basic_spinner = function () {
		return '<div class="basic_spinner"></div>';
	};

	this.classic_spinner = function (options) {
		// TODO gestione background
		var _defaults = {
				size: null, // null|small|large o font-size
				negative: false
			},
			opts = $.extend(_defaults, options),
			_class='',
			_style=''
		;

		switch (opts.size) {
			case null:
				_class = '';
				_style = '';
				break;

			case 'small':
				_class = ' small';
				break;

			case 'large':
				_class = ' large';
				break;

			default:
				_style=' style="font-size:' + opts.size + '"';
		}
		if(opts.negative) {
			_class = ' negative';
		}

		/*
			<div class="classic_spinner-outer">
				<div class="classic_spinner">
					<div><div>Loading...</div></div>
				</div>
			</div>
		*/
		return '<div class="classic_spinner' + _class + '"' + _style + '><div><div>Caricamento in corso...</div></div></div></div>';
	};

	// restituisce un array dei giorni festivi dell'anno dato (o di quello corrente)

	// pasqua
	// https://www.irt.org/articles/js052/index.htm
	var getEaster = function (anno) {

		anno = Number(anno);

		var C = Math.floor( anno/100 ),
			N = anno - 19*Math.floor( anno/19 ),
			K = Math.floor((C - 17)/25),
			I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15
		;

		I = I - 30 * Math.floor((I/30));
		I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
		var J = anno + Math.floor(anno/4) + I + 2 - C + Math.floor(C/4);
		J = J - 7*Math.floor(J/7);
		var L = I - J,
			M = 3 + Math.floor((L + 40)/44), // mese
			D = L + 28 - 31*Math.floor(M/4), // giorno
			pasqua = new Date(anno, M-1, D),
			pasquetta = new Date(anno, M-1, D+1)
		;

		return [
			[pasqua.getFullYear() + '-' + String("00" + (pasqua.getMonth() + 1)).slice(-2) + '-' + String("00" + pasqua.getDate()).slice(-2), 'Pasqua'],
			[pasquetta.getFullYear() + '-' + String("00" + (pasquetta.getMonth() + 1)).slice(-2) + '-' + String("00" + pasquetta.getDate()).slice(-2), "Lunedì dell’Angelo"]
		];
	};


	this.giorni_festivi = function (anno, returnObj) {

		/*
			returnObj == true → restituisce un oggetto invece di un array
			l'oggetto ha questa struttura:
			{
				'01' : { // mese a due cifre
					'01': 'Capodanno', // giorno a due cifre
					...
				}
			}

			NB: i mesi sono indicati a partire da 1 (gennaio), mentre in JS si parte da 0

		*/

		if(returnObj === undefined) { returnObj = false; } // restituisce un oggetto invece di un array

		anno = String(anno || new Date().getFullYear() );

		var festivi = [
			[anno + '-01-01', 'Capodanno'],
			[anno + '-01-06', 'Epifania'],
			[anno + '-04-25', 'Festa della Liberazione'],
			[anno + '-05-01', 'Festa del Lavoro'],
			[anno + '-06-02', 'Festa della Repubblica'],
			[anno + '-08-15', 'Assunzione'],
			[anno + '-11-01', 'Tutti i Santi'],
			[anno + '-12-08', 'Immacolata Concezione'],
			[anno + '-12-25', 'Natale'],
			[anno + '-12-26', 'Santo Stefano']
		];

		festivi = festivi.concat( getEaster(anno) );
		festivi.sort(function (a,b) {
			if(a[0] > b[0]) { return 1; }
			if(a[0] < b[0]) { return -1; }
			return 0;
		});

		if(returnObj) {
			var festiviObj = {};
			festivi.forEach(function (item) {
				var data = item[0].split('-'),
					mese = String(data[1]),
					giorno = String(data[2])
				;
				if(festiviObj[mese] === undefined) { festiviObj[mese] = {}; } // mese
				festiviObj[mese][giorno] = item[1];
			});
			return festiviObj;
		} else {
			return festivi;
		}
	};
};

/*
	DA VERIFICARE

	this.mesi= {
	    1: 'Gennaio',
	    2: 'Febbraio',
	    3: 'Marzo',
	    4: 'Aprile',
	    5: 'Maggio',
	    6: 'Giugno',
	    7: 'Luglio',
	    8: 'Agosto',
	    9: 'Settembre',
	    10: 'Ottobre',
	    11: 'Novembre',
	    12: 'Dicembre'
	};
	this.giorni= {
	    1: 'Luned\u00EC',
	    2: 'Marted\u00EC',
	    3: 'Mercoled\u00EC',
	    4: 'Gioved\u00EC',
	    5: 'Venerd\u00EC',
	    6: 'Sabato',
	    7: 'Domenica'
	};
	this.giorni0_6= {
	    1: 'Luned\u00EC',
	    2: 'Marted\u00EC',
	    3: 'Mercoled\u00EC',
	    4: 'Gioved\u00EC',
	    5: 'Venerd\u00EC',
	    6: 'Sabato',
	    0: 'Domenica'
	};

	this.modal_builder = function(_options) {
		/*

			tbUtil.modal_builder({
			    body                 : '',
			    title                : null,
			    footer               : null, // 'close', // solo pulsante chiusura // '<button id="SMSsubmitButton" type="submit" name="Submit" class="btn btn-primary">Registra</button>',
			    autodestroy          : true,
			    extra_modal_class    : '',
			    close_button         : true,
			    modal_id             : null,
			    jquery_obj           : false // se true restituisice un oggetto jQuery invece di una stringa
			});

* /
	    var _default= {
	        body               : '',
	        title              : null,
	        footer             : null,
	        autodestroy        : true,
	        extra_modal_class  : '',
	        close_button       : true,
	        modal_id           : null,
	        jquery_obj         : false // se true restituisce un oggetto jQuery invece di una stringa
	    };

	    var opts=$.extend(_default, _options);


	    if(opts.footer==='close') {opts.footer='<button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>';}

	    var modal= '<div class="modal fade' + (opts.autodestroy? ' autodestroy' : '')+ '"' + (opts.modal_id? ' id="'+opts.modal_id +'"' : '') + '>'+
	           '   <div class="modal-dialog ' + opts.extra_modal_class + '">'+
	           '     <div class="modal-content">';

	    if(opts.title || opts.close_button) {
	        modal += '<div class="modal-header">';
	        if(opts.close_button) {
	           modal += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
	        }
	        if(opts.title) {
	            modal += '<span>' + opts.title  + '</span>';
	        }
	        modal += '</div>';
	    }

	    modal += '<div class="modal-body">' + opts.body + '</div>';

	    if(opts.footer) {
	        modal += '<div class="modal-footer">' + opts.footer + '</div>';
	    }

	    modal += '</div></div></div>';

	    return opts.jquery_obj? $(modal) : modal;

	};


*/
