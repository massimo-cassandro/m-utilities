export default function () {
  'use strict';

  const pwd_field = $('#plainPassword'); // pagedata = $('#pagedata').data('d')

  $('.show_pwd').click(function () {
    var old_type = pwd_field.attr('type');
    pwd_field.attr('type', old_type === 'password'? 'text' : 'password');
    //$(this).find('use').attr('xlink:href', esa.maindata.icon_file + '#' + (old_type === 'password'? 'lucchetto' : 'occhio') );
  });


  // generazione pwd (modo scheda)
  $('.genera_pwd').click(function () {
    var chars='ABCDEFGHJKLMNPQRSTUVWXYZ123456789',
      charsNum=chars.length,
      min_lenght = pwd_field.attr('minlength'),
      pwd = '', i, x;

    for( x = 0; x < min_lenght; x++ ) {
      i = Math.floor(Math.random() * charsNum);
      pwd += chars.charAt(i);
    }

    pwd_field.val(pwd);
  });

  // $('#form_utente').submit(function() {}); // end submit

} // end export func
