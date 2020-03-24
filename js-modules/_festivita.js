export default function (datesOnly = true, anno) {

  /*
    restituisce un array con i giorni di festività per l'anno indicato
    le date sono in formato iso YYYY-MM-DD
    ogni elemento dell'array è a sua forma
      [ data, descrizione ]
  */

  anno = String(anno || new Date().getFullYear() );

  let festivi = [
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

  // pasqua
  // https://www.irt.org/articles/js052/index.htm
  const getEaster = anno => {

    anno = Number(anno);

    let C = Math.floor( anno/100 ),
      N = anno - 19 * Math.floor( anno/19 ),
      K = Math.floor((C - 17)/25),
      I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19 * N + 15
    ;

    I = I - 30 * Math.floor((I/30));
    I = I - Math.floor(I/28) * (1 - Math.floor(I/28) *
      Math.floor(29/(I + 1)) * Math.floor((21 - N)/11));

    let J = anno + Math.floor(anno/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7 * Math.floor(J/7);

    let L = I - J,
      M = 3 + Math.floor((L + 40)/44), // mese
      D = L + 28 - 31*Math.floor(M/4), // giorno
      pasqua = new Date(anno, M-1, D),
      pasquetta = new Date(anno, M-1, D+1)
    ;

    return [
      [
        pasqua.getFullYear() + '-' +
          String('00' + (pasqua.getMonth() + 1)).slice(-2) + '-' +
          String('00' + pasqua.getDate()).slice(-2),
        'Pasqua'
      ],
      [
        pasquetta.getFullYear() + '-' +
          String('00' + (pasquetta.getMonth() + 1)).slice(-2) + '-' +
          String('00' + pasquetta.getDate()).slice(-2),
        'Lunedì dell’Angelo'
      ]
    ];
  };

  festivi = festivi.concat( getEaster(anno) );

  festivi.sort( (a,b) => {
    if(a[0] > b[0]) { return 1; }
    if(a[0] < b[0]) { return -1; }
    return 0;
  });

  if(!datesOnly) {

    return festivi.map(item => {
      return item[0];
    });
  }
  return festivi;
}
