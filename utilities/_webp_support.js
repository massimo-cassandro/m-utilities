// webp support detection
// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/webp.js
// https://gist.github.com/jakearchibald/6c43d5c454bc8f48f83d8471f45698fa
// https://davidwalsh.name/detect-webp

export  function webpSupport() {
  'use strict';

  var webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
    setWebpSupport = esito => {
      //console.log('webp support: ' + esito);
      document.documentElement.classList.add(esito? 'webp' : 'no-webp');

      return esito;
    };

  try {
    var image = new Image(),
      maketest = function (event) {
      // if the event is from 'onload', check the see if the image's width is
      // 1 pixel (which indicates support). otherwise, it fails

        setWebpSupport( (event && event.type === 'load') ? image.width === 1 : false );
      };

    image.onload = maketest;
    image.onerror = maketest;
    image.src = webpData;

  } catch(e) { //throw "error"
    setWebpSupport(false);
  }
}
