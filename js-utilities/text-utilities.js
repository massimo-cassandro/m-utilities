/*
  text_utilities v. 2.0
  Massimo Cassandro 2016-2020


  TODO: title case parole con apostrofo -> DELL'AEROPORTO, ALL'APERTO
*/

const particelle = [
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
  'the', 'a', 'an', 'at', 'out', 'of',

  // parole particolari usate nei geonames
  'isola', 'isole'
];

// "abbellisce" un testo sistemando alcuni caratteri, spazi ecc.
export function better_text(str, custom_words = []) {
  // custom_words: array di definizioni specifiche da trattare nella forma riportata
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

    // valori unici
    particelle.sort();
    var particelle_unique = particelle.filter( function (value, index, self) {
      return self.indexOf(value) === index;
    } );

    var re = new RegExp('\\b(' + particelle_unique.join('|') + ')\\b +', 'gmi');

    str = str.replace(re, function (match) {
      return match.replace(/ +/g, ' ');
    });
    if(custom_words.length) {
      custom_words.forEach(item => {
        str = str.replace(new RegExp(`\\b${item}\\b`, 'gi'), item);
      });
    }
  } else {
    str = '';
  }
  return str;
}

// imposta un testo in cui ogni parola è miniuscola tranne la prima lettera
export function title_case(str) {

  if(str) {
    str = str.replace( /\w\S*/g, function(word) {

      // numeri romani
      if( /^[MDCLXVI]{3,}$/.test(word.toUpperCase()) ) {

        return word.toUpperCase();

      } else if(word.trim().length > 2) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();

      } else {


        var breakException = {};

        try {

          particelle.forEach(function (item) {
            if( item.toLowerCase() === word.toLowerCase()) {
              word = item;
              throw breakException;
            }
          });

        } catch (e) {
          if (e !== breakException) throw e;
        }

        return word;
      }
    }); // end replace
  } // end if

  return str;
} // end title_case

// prima lettera maiuscola, il resto minuscolo
export function sentence_case(str) {
  if(str) {
    return  str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  }
  return str;
}

export function text_cleaner(str) {
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
}
