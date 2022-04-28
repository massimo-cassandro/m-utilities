/* global FontFaceObserver, Cookies */
/*
  Font face observer loader

  Con impostazione manuale dei font da caricare

  la funzione va chiamata impostando la variabile font_arry in questa forma:

  [
    ['family', font_properties_obj ],
    ...
  ]

  in cui:
    * family è il nome della famiglia di font
    * font_properties_obj è un oggetto con le proprietà del font, es:
      {
        weight: 400,
        style: 'italic'
      }
      È facoltativo, se non è presente, il default è il font regular/normal

  vedi https://fontfaceobserver.com/
*/

export default function ( fonts_array ) {

  const html = document.documentElement;
  let font_observers = [],
    font_cookie=false,
    cookie_val = JSON.stringify(fonts_array);

  fonts_array.forEach(item => {
    font_observers.push(
      new FontFaceObserver(item[0], item[1] || {})
    )
  });

  html.classList.add('fonts-loading');

  if (Cookies.get('fontsloaded') && Cookies.get('fontsloaded') === cookie_val) {
    html.classList.remove('fonts-loading');
    html.classList.add('fonts-loaded');
    font_cookie = true;
  }

  Promise.all(font_observers).then(function () {

    Cookies.set('fontsloaded', 1, { expires: 1, secure: true });

    html.classList.remove('fonts-loading');
    html.classList.add('fonts-loaded');

  }).catch(function () {
    if (!font_cookie) {

      Cookies.remove('fontsloaded');

      html.classList.remove('fonts-loading');
      html.classList.add('fonts-failed');
      alert('Si è verificato un errore del server. ' +
        'Prova a ricaricare la pagina; ' +
        'se l\'errore persiste, riprova tra qualche minuto');
    }
  });

}
