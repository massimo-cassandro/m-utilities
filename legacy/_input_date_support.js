/* exported inputDateSupport */

const inputDateSupport = (function () {
  const  input = document.createElement('input'),
    notADateValue = 'not-a-date';
  input.setAttribute('type','date');
  input.setAttribute('value', notADateValue);

  return (input.value !== notADateValue);
})();
