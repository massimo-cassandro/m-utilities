export  function inputDateSupport() {
  'use strict';

  const  input = document.createElement('input'),
    notADateValue = 'not-a-date';
  input.setAttribute('type','date');
  input.setAttribute('value', notADateValue);

  return (input.value !== notADateValue);
}

export  function inputDatetimeSupport() {
  'use strict';

  const  input = document.createElement('input'),
    notADateValue = 'not-a-date';
  input.setAttribute('type','datetime-local');
  input.setAttribute('value', notADateValue);

  return (input.value !== notADateValue);
}
