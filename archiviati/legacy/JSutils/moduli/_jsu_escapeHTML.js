/*eslint no-global-assign: 0*/ //TODO: eliminare e sistemare globals
/* globals JSutils:true */

/*
  escapeHTML v. 1.1
  Massimo Cassandro 2015-2017
*/

JSutils = (function (utils) {
	"use strict";

	utils.escapeHTML=function(text) {
	    var characters = {
	        '&': '&amp;',
	        '"': '&quot;',
	        "'": '&#039;',
	        '<': '&lt;',
	        '>': '&gt;'
	    };

	    return (text + "").replace(/[<>&"']/g, function(m){
	        return characters[m];
	    });
	};

	return utils;

})(JSutils || {});
