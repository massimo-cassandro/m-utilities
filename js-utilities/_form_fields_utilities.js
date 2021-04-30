// export function getFieldType(element) {
//   // let element_tag = element.tagName.toLowerCase(),
//   //   element_type = element.type.toLowerCase();
//   return element.type.toLowerCase();
// }

export function setFormElementValue(element, value) {

  let element_type = element.type; //getFieldType(element);
  if(element_type) {
    element_type = element.type.toLowerCase();

    // fieldset.form-group (serie radio/checkbox) => value è un array dei valori dei campi selezione
    if(element_type=== 'fieldset' && element.classList.contains('form-group')) {

      value.forEach(val => {
        // element.querySelector(`input[value="${val}"]`).checked = true;
        element.querySelector(`input[value="${val}"]`).click();
      });

    // select →  value == valore dell'option selezionato
    } else if (element_type === 'select-one') {
      let selected = element.querySelector(`option[value="${value}"]`),
        selected_index = Array.from(element.querySelectorAll('option')).indexOf(selected);

        element.selectedIndex = selected_index;

    // checkbox|radio →  true == selezionato, false == deselezionato
    } else if (element_type === 'checkbox' || element_type === 'radio') {
      element.checked = value;

    // ['textarea', 'text', 'date', 'email', 'number'].indexOf(element_type) !== -1
    } else {
      element.value = value;
    }
  } else {
    console.error('not element type:');
    console.error(element);
  }
}

export function getFormElementValue(element) {
  let element_type = element.type; //getFieldType(element);

  if(element_type) {
    element_type = element.type.toLowerCase();

    // fieldset.form-group (serie radio/checkbox) =>
    //         restituisce un array con il valore delle opzioni selezionate
    if(element_type=== 'fieldset' && element.classList.contains('form-group')) {
      let values = [];
      element.querySelectorAll('input:checked').forEach(item => {
        values.push(item.value);
      });
      return values;

    // select
    } else if (element_type === 'select-one') {
      return element.options[element.selectedIndex].value;

    // checkbox|radio →  true == selezionato, false == deselezionato
    } else if (element_type === 'checkbox' || element_type === 'radio') {
      return element.checked;

    // ['textarea', 'text', 'date', 'email', 'number'].indexOf(element_type) !== -1
    } else {
      return element.value;
    }
  } else {
    console.error('not element type');
    console.error(element);
  }
}
