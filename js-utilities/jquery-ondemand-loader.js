export default function (jquery_url='https://code.jquery.com/jquery-3.6.0.min.js', callback) {
  try {

    if(callback === undefined || typeof callback !== 'function') {
      throw 'Errore callback';
    }
    // if(!jquery_url || typeof jquery_url !== 'string') {
    //   throw 'Errore jQuery url';
    // }

    if(window.jQuery === undefined && !document.head.querySelector('.jq')) {

      let script = document.createElement('script');
      script.onload = function() {
        callback();
      };
      script.src = jquery_url;
      script.async = false;
      script.className = 'jq';
      document.head.appendChild(script);

    } else if(window.jQuery === undefined) { // script presente ma jquery ancora in caricamento

      const intervalID = setInterval(() => {
        if(window.jQuery !== undefined ) {
          clearInterval(intervalID);
          callback();
        }
      }, 200);

    } else {
      callback();
    }

  } catch(e) { //throw error
    console.error( e ); // eslint-disable-line
  }
}
