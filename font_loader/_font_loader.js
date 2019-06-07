/* global FontFaceObserver, Cookies */
(() => {

//TODO caso font non google

  // google font -> es: Roboto+Condensed|Roboto:400,400i,700,700i
  let font_array=document.querySelector('link[href^="https://fonts.googleapis.com"][rel="stylesheet"]');

  if(font_array) {

    font_array = font_array.getAttribute('href').split('?family=')[1]
      .replace(/\+/g, ' ')
      .split('|');

    let font_observers=[];

    font_array.forEach((item) => {
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

    let html = $(document.documentElement),
      font_cookie=false;

    html.addClass('fonts-loading'); // inserito direttamente nel codice della pagina

    if (Cookies.get('fontsloaded') === font_array.join('|')) {
      html.removeClass('fonts-loading');
      html.addClass('fonts-loaded');
      font_cookie = true;
    }

    Promise.all(font_observers).then(function () {

      Cookies.set('fontsloaded', font_array.join('|'), { expires: 1 });

      html.removeClass('fonts-loading');
      html.addClass('fonts-loaded');
    }).catch(function () {
      if (!font_cookie) {

        Cookies.remove('fontsloaded');

        html.removeClass('fonts-loading');
        html.addClass('fonts-failed');
        alert("Si è verificato un errore del server. " +
          "Prova a ricaricare la pagina; " +
          "se l'errore persiste, riprova tra qualche minuto");
      }
    });
  }

})();
