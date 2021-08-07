import {mAlert} from '../m-alert';

(() => {

  // demo buttons
  const demo_mes = 'Cupidatat do <em>reprehenderit</em> id <strong>consequat velit</strong><br>nuova riga &rarr; NB: message contains HTML';

  document.querySelector('.demo-callback').addEventListener('click', () => {
    mAlert({
      type: 'success',
      mes: demo_mes,
      callback: function() {
        alert('callback triggered');
      }
    });
  });

  document.querySelector('.demo-success').addEventListener('click', () => {
    mAlert({
      type: 'success',
      title: 'Custom title',
      mes: demo_mes
    });
  });

  document.querySelector('.demo-info').addEventListener('click', () => {
    mAlert({
      type: 'info',
      mes: demo_mes
    });
  });

  document.querySelector('.demo-warning').addEventListener('click', () => {
    mAlert({
      type: 'warning',
      mes: demo_mes
    });
  });

  document.querySelector('.demo-error').addEventListener('click', () => {
    mAlert({
      type: 'error',
      mes: demo_mes
    });
  });

  document.querySelector('.demo-confirm').addEventListener('click', () => {
    mAlert({
      type: 'confirm',
      mes: demo_mes,
      callback: function(response){
        console.log(response); // eslint-disable-line
        alert('response: ' + response);
      }
    });
  });

  // demo submit confirm
  document.getElementById('test-form').addEventListener('submit', e => {
    e.preventDefault();

    mAlert({
      type           : 'confirm',
      title          : 'Confirm submit? ',
      mes            : null,
      cancel_focus: false, // false to give focus to the ok button
      bs_status_class: 'danger',
      title_class: 'text-danger',
      ok_btn_class: 'btn-danger',
      cancel_btn_class: 'btn-outline-danger',
      ok_btn_text: 'Submit',
      cancel_btn_text: 'Cancel',
      callback       : function(result) {
        return result;
      }
    })
      .then(function(result) {
        alert('result: ' + result);
      });

  }, false);

})();
