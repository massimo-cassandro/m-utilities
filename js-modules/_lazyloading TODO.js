// https://addyosmani.com/blog/lazy-loading/
export default function () {
  'use strict';

  window.mUtilities = window.mUtilities || {};

  window.mUtilities.lazysizes_url = window.mUtilities.lazysizes_url ||
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js';

  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img.lazyload'); // <=======
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    let script = document.createElement('script');
    script.async = true;
    script.src = window.mUtilities.lazysizes_url;
    document.body.appendChild(script);
  }
}
