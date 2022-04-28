/*globals JSutils:true*/

/*
  url_append v. 1.0
  Massimo Cassandro 2017
*/

JSutils = (function (utils) {
	"use strict";

  // appende _param a _url utilizzando l'operatore corretto tra '?' e '&'
  // restituisce l'url completo
	utils.url_append = function (_url, _param) {

	    return _url + (_param? (/\?/.test(_url) ? '&' : '?') + _param : '');
	};

	return utils;

})(JSutils || {});
