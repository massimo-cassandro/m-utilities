// export function getFieldType(element) {
//   // let element_tag = element.tagName.toLowerCase(),
//   //   element_type = element.type.toLowerCase();
//   return element.type.toLowerCase();
// }

export function setFormElementValue(element, value) {
  let element_type = element.type.toLowerCase(); //getFieldType(element);

  // select →  value == valore dell'option selezionato
  if (element_type === 'select-one') {
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
}

export function getFormElementValue(element) {
  let element_type = element.type.toLowerCase(); //getFieldType(element);

  // select
  if (element_type === 'select-one') {
    return element.options[element.selectedIndex].value;

  // checkbox|radio →  true == selezionato, false == deselezionato
  } else if (element_type === 'checkbox' || element_type === 'radio') {
    return element.checked;

  // ['textarea', 'text', 'date', 'email', 'number'].indexOf(element_type) !== -1
  } else {
    return element.value;
  }
}
