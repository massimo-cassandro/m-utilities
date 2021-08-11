import genera_pwd from '@massimo-cassandro/m-utilities/js-utilities/genera_pwd';

export default function () {
  'use strict';

  const pwd_field = $('#plainPassword'); // pagedata = $('#pagedata').data('d')

  $('.show_pwd').click(function () {
    var old_type = pwd_field.attr('type');
    pwd_field.attr('type', old_type === 'password'? 'text' : 'password');
    //$(this).find('use').attr('xlink:href', xxx.maindata.icon_file + '#' + (old_type === 'password'? 'lucchetto' : 'occhio') );
  });

  // generazione pwd (modo scheda)
  $('.genera_pwd').click(function () {
    pwd_field.val( genera_pwd(pwd_field.attr('minlength'));
  });

  // $('#form_utente').submit(function() {}); // end submit

} // end export func
