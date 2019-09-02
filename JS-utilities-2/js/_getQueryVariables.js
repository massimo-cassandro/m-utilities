/* globals JSutils:true */

/*
  getQueryVariables v. 1.1
  Massimo Cassandro
*/

JSutils = (function (utils) {
	"use strict";

	utils.getQueryVariables = function () {

    var qstring = window.location.search.substr(1).trim();
    if(qstring) {
      var vars_array = window.location.search.substr(1).trim().split('&'),
        vars = {};
      for (var i=0; i<vars_array.length; i++) {
        var pair = vars_array[i].split("=");
        vars[pair[0]] = pair[1] !== undefined ? decodeURIComponent(pair[1]) : null;
      }
      return vars;
  	}

    return null;
	};

	return utils;

})(JSutils || {});
