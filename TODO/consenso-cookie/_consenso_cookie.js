/*@license
 * Script per gestione consenso Cookie
 * Massimo Cassandro 2015
 * https://github.com/massimo-cassandro/consenso-cookie
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 */

/* jshint undef:false */
(function() {
	"use strict";
  	try {


		var retrieveFromCookie=function(_var) {
		    var c=document.cookie,
		        cStart=c.indexOf(_var + '=');
		    if(cStart!==-1) {
		        var cLen=(_var + '=').length,
		            cEnd=c.indexOf(";", cStart+cLen);

		        if(cEnd===-1) {cEnd=c.length;}

		        return c.substring(cStart+cLen, cEnd);
		    } else {
		        return null;
		    }
		};
		var cookie_var='consenso_cookie',
			cookie_consenso_privacy = retrieveFromCookie(cookie_var),
			cookie_policy_banner = document.getElementById('cookie_policy_banner'),
			cookie_policy_wrapper = document.getElementById('cookie_policy_banner_wrapper')
		;

		//console.log(cookie_consenso_privacy);

		var setPrivacyCookie = function () {
			var CookieDate = new Date();
			CookieDate.setMonth( CookieDate.getMonth() +3 );
			document.cookie = cookie_var +'=1; expires=' + CookieDate.toGMTString( ) + '; path=/';


			// IE non supporta il metodo remove e richiede il check anche del parent element
			//cookie_policy_banner.remove();
			//cookie_policy_wrapper.remove();
			if( cookie_policy_banner && cookie_policy_banner.parentElement ) { cookie_policy_banner.parentElement.removeChild(cookie_policy_banner); }
			if( cookie_policy_wrapper  && cookie_policy_wrapper.parentElement ) { cookie_policy_wrapper.parentElement.removeChild(cookie_policy_wrapper); }
		};

		if(cookie_consenso_privacy === null) {

			if(cookie_policy_banner && cookie_policy_wrapper) { // extra check per evitare errori js
				cookie_policy_wrapper.innerHTML = cookie_policy_banner.innerHTML;
				cookie_policy_wrapper.removeAttribute("hidden");
				cookie_policy_wrapper.setAttribute('display', 'block');
				//cookie_policy_banner.remove();
				cookie_policy_banner.parentElement.removeChild(cookie_policy_banner);
				document.getElementById('cookie_policy_button_OK').onclick = setPrivacyCookie;
			}

		} else {
			setPrivacyCookie(); // rinnova la data di expire
		}

	} catch(err) { //throw "error"
	    console.log(err);
	}
})();