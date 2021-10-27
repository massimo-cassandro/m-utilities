/* global FontFaceObserver, Cookies */
/*
  Font face observer loader

  Con impostazione manuale dei font da caricare

*/
(() => {

  const html = document.documentElement,
    font_observers = [
      new FontFaceObserver('Lavanderia Sturdy'),
      new FontFaceObserver('Roboto Condensed', {
        weight: 400
      }),
      new FontFaceObserver('Roboto Condensed', {
        weight: 400,
        style: 'italic'
      }),
      new FontFaceObserver('Roboto Condensed', {
        weight: 700
      }),
      new FontFaceObserver('Roboto Condensed', {
        weight: 700,
        style: 'italic'
      })
    ];

  let font_cookie=false;

  html.classList.add('fonts-loading');

  if (Cookies.get('fontsloaded')) {
    html.classList.remove('fonts-loading');
    html.classList.add('fonts-loaded');
    font_cookie = true;
  }

  Promise.all(font_observers).then(function () {

    Cookies.set('fontsloaded', 1, { expires: 1 });

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

})();
