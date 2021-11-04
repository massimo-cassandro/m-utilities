import {_autoDataTable} from '../../../js/autoDataTable-bs5';


/*
  {
      "id": 5,
      "firstName": "Airi",
      "lastName": "Satou",
      "position": "Accountant",
      "office": "Tokyo"
    },
*/
_autoDataTable('#datatable_container', {
  datatable_options:{
    createdRow: function( row, data, dataIndex, cells ) {
      // if ( data[4] == "A" ) {
      //   $(row).addClass( 'important' );
      // }
      console.log(row);
      console.log(data);
      console.log(dataIndex);
      console.log(cells);
    }
  }
});

