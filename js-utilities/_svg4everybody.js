/* globals svg4everybody */

export default function () {
  'use strict';

  var script = document.createElement('script');
  script.onload = function() {
    svg4everybody();
  };
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/svg4everybody/2.1.9/svg4everybody.min.js';
  script.type = 'text/javascript';
  document.head.appendChild(script);

}
