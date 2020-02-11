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
    notADateTimeValue = 'not-a-datetime';
  input.setAttribute('type','datetime-local');
  input.setAttribute('value', notADateTimeValue);

  return (input.value !== notADateTimeValue);
}

export  function inputTimeSupport() {
  'use strict';

  const  input = document.createElement('input'),
    notATimeValue = 'not-a-time';
  input.setAttribute('type','time');
  input.setAttribute('value', notATimeValue);

  return (input.value !== notATimeValue);
}

