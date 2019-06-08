/* global FontFaceObserver, Cookies */
/*
  Font face observer
  automatic loader for google fonts only (single link tag)

*/
(() => {

  // google font -> es: https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700|Roboto:400&display=swap
  let google_fonts_array=document.querySelector('link[href^="https://fonts.googleapis.com"][rel="stylesheet"]');

  if(google_fonts_array) {

    google_fonts_array = google_fonts_array.getAttribute('href').split('?family=')[1].split('&')[0]
      .replace(/\+/g, ' ')
      .split('|');

    let font_observers=[];

    google_fonts_array.forEach((item) => {
      let font_parts = item.split(':'),
      font,
      font_name = font_parts[0];

      if(font_parts.length === 1 ) {
        font = new FontFaceObserver(font_name);
        font_observers.push(font.load());
      } else {
        font_parts[1].split(',')
        .map( item => {
          return item.trim();
        })
        .forEach( item => {
          let font_prop = {};

          if(item.indexOf('i') !== -1) {
            let w = item.substr(0, item.length - 1);
            font_prop = {
              weight : isNaN(w) ? w : +w,
              style  : 'italic'
            };
          } else {
            font_prop = {weight : isNaN(item) ? item : +item };
          }

          font = new FontFaceObserver(font_name, font_prop);
          font_observers.push(font.load());
        });
      }
    });

    let html = document.documentElement,
      font_cookie=false;

    html.classList.add('fonts-loading');

    if (Cookies.get('fontsloaded') === google_fonts_array.join('|')) {
      html.classList.remove('fonts-loading');
      html.classList.add('fonts-loaded');
      font_cookie = true;
    }

    Promise.all(font_observers).then(function () {

      Cookies.set('fontsloaded', google_fonts_array.join('|'), { expires: 1 });

      html.classList.remove('fonts-loading');
      html.classList.add('fonts-loaded');
    }).catch(function () {
      if (!font_cookie) {

        Cookies.remove('fontsloaded');

        html.classList.remove('fonts-loading');
        html.classList.add('fonts-failed');
        alert("Si è verificato un errore del server. " +
          "Prova a ricaricare la pagina; " +
          "se l'errore persiste, riprova tra qualche minuto");
      }
    });
  }

})();
