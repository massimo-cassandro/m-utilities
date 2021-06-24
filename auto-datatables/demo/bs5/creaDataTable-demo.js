// import $ from 'jquery';
import {_creaDataTable} from '../../js/_creaDataTable-bs5';


/*
  {
      "id": 5,
      "firstName": "Airi",
      "lastName": "Satou",
      "position": "Accountant",
      "office": "Tokyo"
    },
*/
_creaDataTable(
  '#datatable_container', // oppure $('#datatable_container') oppure document.getElementById('datatable_container')
  {
    datatable_options: {
      ajax             : './demo_data.json',
      order            : [[1,'asc']],
      columns          : [
        {
          title      : '#',
          data       : 'id',
          className  : 'text-right'
        },
        {
          title      : 'Nome',
          data       : 'firstName'
        },
        {
          title      : 'Cognome',
          data       : 'lastName'
        },
        {
          title      : 'Posizione',
          data       : 'position'
        },
        {
          title      : 'Sede',
          data       : 'office'
        }
      ]
    }
  }
);

