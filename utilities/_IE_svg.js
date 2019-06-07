/* globals svg4everybody */
(function() {
  "use strict";

  if( navigator.userAgent.indexOf('MSIE') !== -1 ||
      navigator.appVersion.indexOf('Trident/') > -1 ||
      navigator.userAgent.indexOf('Trident/') > -1 ){

    "use strict";
    var script = document.createElement('script');
    script.onload = function() {
        svg4everybody();
    };
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/svg4everybody/2.1.9/svg4everybody.min.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);

  }

})();
