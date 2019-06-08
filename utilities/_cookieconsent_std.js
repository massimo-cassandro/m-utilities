(() => {
  "use strict";

  const head = document.head;
  head.insertAdjacentHTML('beforeend',
    '<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css">'
  );

  let script = document.createElement('script');
  script.onload = () => {
    window.addEventListener("load", () => {
      window.cookieconsent.initialise({
        "palette": {
          "popup": {
            "background": "#252e39"
          },
          "button": {
            "background": "#14a7d0"
          }
        },
        "theme": "edgeless",
        "position": "bottom-right",
        "content": {
          "message": "Questo sito utilizza cookie, anche di terze parti anonimizzati, per garantirti la migliore esperienza di navigazione. Continuando a navigare su questo sito, si acconsente al loro utilizzo.",
          "dismiss": "Ho capito",
          "link": "Per saperne di più",
          "href": "https://ec.europa.eu/info/cookies_it"
        }
      });
    });
  };
  script.src = '//cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js';
  script.type = 'text/javascript';
  head.appendChild(script);
})();
