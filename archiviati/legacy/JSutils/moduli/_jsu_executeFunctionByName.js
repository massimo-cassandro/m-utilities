/*eslint no-global-assign: 0*/ //TODO: eliminare e sistemare globals
/* globals JSutils:true */

/*
  executeFunctionByName

  da:
  https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string

*/

JSutils = (function (utils) {
	"use strict";

	utils.executeFunctionByName = function (functionName, context) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
        }
        return context[func].apply(context, args );
      };

	return utils;

})(JSutils || {});
