import {mAlert} from '../mAlert';
import $ from 'jquery';

(function() {

  // demo buttons
  const demo_mes = 'Cupidatat do <em>reprehenderit</em> id <strong>consequat velit</strong><br>nuova riga &rarr; NB: message contains HTML';

  $('.demo-default').on('click', () => {
    mAlert()
      .then(function(result) {
        alert('Risultato della promessa: ' + result);
      });

  });

  $('.demo-callback').on('click', () => {
    mAlert({
      callback: function() {
        alert('callback triggered');
      }
    });
  });

  $('.demo-success').on('click', () => {
    mAlert({
      type: 'success',
      title: 'Custom title',
      mes: demo_mes
    });
  });

  $('.demo-info').on('click', () => {
    mAlert({
      type: 'info',
      mes: demo_mes
    });
  });

  $('.demo-warning').on('click', () => {
    mAlert({
      type: 'warning',
      mes: demo_mes
    });
  });

  $('.demo-error').on('click', () => {
    mAlert({
      type: 'error',
      mes: demo_mes
    });
  });

  $('.demo-confirm').on('click', () => {
    mAlert({
      type: 'confirm',
      mes: demo_mes,
      callback: function(response){
        alert(response? 'OK' : 'Cancel');
      }
    });
  });



  // demo submit confirm
  $('#testform').on('submit', function(e) {
    e.preventDefault();


    mAlert({
      type           : 'confirm',
      title          : 'Confirm submit? ',
      mes            : null,
      callback       : function(result) {
        return result;
      }
    })
      .then(function(result) {
        alert(result);
      });
  });
})();
