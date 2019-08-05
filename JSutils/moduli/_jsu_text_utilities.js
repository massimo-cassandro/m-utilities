/*eslint no-global-assign: 0*/ //TODO: eliminare e sistemare globals
/* globals JSutils:true */

/*
  text_utilities v. 1.1.1
  Massimo Cassandro 2016-2017


  TODO: title case parole con apostrofo -> DELL'AEROPORTO, ALL'APERTO
*/

JSutils = (function (utils) {
	"use strict";

	utils.particelle = [
    'e', 'ed',
    'di', 'a', 'da', 'in', 'per', 'con', 'su', 'per', 'tra', 'fra',
    'il', 'lo', 'la', 'i', 'gli', 'le',
    'un', 'uno', 'una',
    'del', 'dello', 'della', 'dei', 'degli', 'delle',
    'al', 'allo', 'alla', 'ai', 'agli', 'alle',
    'dal', 'dallo', 'dalla', 'dai', 'dagli', 'dalle',
    'nel', 'nello', 'nella', 'nei', 'negli', 'nelle',
    'col', 'collo', 'colla', 'con', 'coi', 'cogli', 'colle',
    'sul', 'sullo', 'sulla', 'sui', 'sugli', 'sulle',

     // termini toponomastici e simili
     'C.so', 'Corso', 'Via', 'P.za', 'Piazza', 'L.go', 'Largo', 'V.le', 'Viale',
     'De', 'San', 'c/o', 'Loc.',

    // inglese
    'the', 'a', 'an', 'at', 'out', 'of'
  ];



	utils.better_text = function (str) {

    if(str) {
      str = str.trim();

      // punteggiatura ---- NB non mettere dopo i replace con entità HTML per conflitti con il carattere `;`
      // (?!$): negative lookahead per ignorare i caratteri a fine stringa
      str = str.replace(/ +(,|;|\.|:|!|\?)/g, '$1');
      str = str.replace(/(,|;|\.|:|!|\?)(?!$) +/g, '$1 ');

      // spazi o tabulazioni multiple
      str = str.replace(/[ |\t|\u00A0]+/g, ' ');

      //& commerciale
      // str = str.replace(/& */gm, function (match) {
      //   return match.replace(/&/g, '\u0026').replace(/ +/g, '\u00A0');
      // });

      // virgolette
      str = str.replace(/(^| )"/g, '$1\u201C') // virgolette doppie in apertura
        //.replace(/"($| |[,\.:;\!\?])/g, '\u201D$1') // virgolette doppie in chiusura
        .replace(/"/g, '\u201D') // tutte le rimanenti virgolette doppie in chiusura
        .replace(/(^| )'/g, '$1\u2018') // tutte le virgolette semplici in apertura
        .replace(/'/g, '\u2019')        // tutte le rimanenti virgolette semplici, compresi gli apostrofi
      ;

      // spazio dopo l'apostrofo preceduto da `l`, `un`, `d`, ecc...
      str = str.replace(/((^| )(l|un|d|all|dell|nell|sull)('|’)) /gi, '$1' );

      // aggiunta spazio non divisibile dopo articoli, preposizioni ecc.
      // include anche alcune parole in altre lingue
      var particelle = utils.particelle.slice(0);

      // parole particolari usate nei geonames
      particelle.push(
        'isola', 'isole'
      );



      // valori unici
      particelle.sort();
      var particelle_unique = particelle.filter( function (value, index, self) {
        return self.indexOf(value) === index;
      } );

      var re = new RegExp('\\b(' + particelle_unique.join('|') + ')\\b +', 'gmi');

      str = str.replace(re, function (match) {
        return match.replace(/ +/g, ' ');
      });
    } else {
      str = '';
    }
    return str;
  };

  utils.title_case = function(str) {
    if(str) {
      str = str.replace( /\w\S*/g, function(txt) {

        // numeri romani
        if( /^[MDCLXVI]{3,}$/.test(txt.toUpperCase()) ) {

          return txt.toUpperCase();

        } else if(txt.trim().length > 2) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

        } else {


          var breakException = {};

          try {

            utils.particelle.forEach(function (item) {
              if( item.toLowerCase() === txt.toLowerCase()) {
                txt = item;
                throw breakException;
              }
            });

          } catch (e) {
            if (e !== breakException) throw e;
          }

          return txt;
        }
      }); // end replace
    } // end if
    return str;
  };

  utils.text_cleaner = function(str) {
    // ripulisce una stringa di testo html dal markup indesiderato proveniente da copia&incolla da word

    if(str) {
      var _tags_to_remove = ['h1', 'h2', 'span', 'img', 'figure', 'figcaption', 'picture', 'script', 'font', 'div', 'blockquote',
          'big', 'small', 'strike', 'u', 'tt', 'code',
          'form', 'input', 'select', 'option', 'textarea', 'button', 'label', 'fieldset', 'legend', 'object',
          'iframe', 'embed', 'center', 'o:p'
        ],
        _attrs_to_remove = ['style', 'align', 'id', 'class', 'valign', 'width', 'height', 'hspace', 'vspace',
          'onclick', 'name', 'cellspacing', 'cellpadding', 'bgcolor'
        ],

        i, _regexp
      ;

      for(i = 0; i < _tags_to_remove.length; i++) {
        _regexp = new RegExp('</?' + _tags_to_remove[i] + '(.*?)>', 'gi');
        str = str.replace(_regexp, '');
      }

      for(i = 0; i < _attrs_to_remove.length; i++) {
        _regexp = new RegExp(' ' + _attrs_to_remove[i] +'=("|\')(.*?)("|\')', 'gi');
        str = str.replace(_regexp, '');
      }

      // attributi data
      str = str.replace(/ data-(.*?)=("|')(.*?)("|')/gi, '');

      return str.trim()
        .replace(/^"/g, '“')
        .replace(/ "/g, ' “')
        .replace(/"$/g, '”')
        .replace(/" /g, '” ')
        .replace(/'/g, '’');
    } else {
      return '';
    }
  };

	return utils;

})(JSutils || {});

