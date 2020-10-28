export default function () {

  const config_field = $('#config'),
    cfg_tpl_common = {
      class: 'class1 class2',
      attributes: {
        min: 0,
        max: 100,
        step: 1
      },
      properties: [
        'required',
        'multiple'
      ]
    },
    cfg_tpl_textarea = { editor: 'true|lite|xlite', html: true },
    cfg_tpl_num = { number: 'euro|perc' },
    cfg_tpl_img = {
      desktop_img: {
        file_uploader_data: {
          max_filesize: 100,
          img_min_w: null,
          img_min_h: null,
          img_max_w: null,
          img_max_h: null,
          img_w: null,
          img_h: null
        },
        required: true
      },
      mobile_img: {
        file_uploader_data: {
          max_filesize: 100,
          img_min_w: null,
          img_min_h: null,
          img_max_w: null,
          img_max_h: null,
          img_w: null,
          img_h: null
        },
        use_mobile_img: true,
        required: false
      },
      dida: 'true|required|false'
    },
    cfg_tpl_gallery = {
      file_uploader_data: {
        max_filesize: 100,
        img_min_w: null,
        img_min_h: null,
        img_max_w: null,
        img_max_h: null,
        img_w: null,
        img_h: null,

        sortable: true,
        sortable_varname: 'ordine'
      },
      dida: 'true|required|false',
      link: 'true|required|false'
    },
    cfg_tpl_file = {
      file_uploader_data: {
        filetype: 'auto|pdf',
        max_filesize: '4Mb',
        required: false
      }
    };

  $('#toggle-config').click(function(){
    $('#cfg-wrapper').slideToggle(function() {
      config_field[0].dispatchEvent(new Event('input'));
    });
  });

  $('#ignora-required').click(function(){
    let no_required = $(this).prop('checked'),
      contenuti_values_wrapper = $('.contenuti-values');

    if(no_required) {
      $('[required]', contenuti_values_wrapper).each(function(){
        $(this).prop('required', false).attr('data-cfg-required', 'true')
          .parents('.form-group').eq(0).removeClass('required');
      });

      // uploader
      $('.fupl-wrapper[data-required="true"]').each(function(){
        $(this).removeAttr('data-required').attr('data-cfg-required', 'true')
          .children('legend').removeClass('required');
      });

    } else {
      $('[data-cfg-required]', contenuti_values_wrapper).each(function(){
        $(this).prop('required', true).removeAttr('data-cfg-required')
          .parents('.form-group').eq(0).addClass('required');
      });

      // uploader
      $('.fupl-wrapper[data-cfg-required]').each(function(){
        $(this).removeAttr('data-cfg-required]').attr('data-required', 'true')
          .children('legend').addClass('required');
      });
    }

  });

  $('#tipo').change(function(){
    let tipo = +$(this).val();

    $('.add_cfg_tpl[data-cfg="required"')
      .prop('disabled', [10, 11].indexOf(tipo) !== -1);
  })
    .trigger('change');

  $('.add_cfg_tpl').click(function(){
    let tipo = +$('#tipo').val(),
      cfg_data = $(this).data('cfg');

    if(!tipo) {
      mAlert({
        type  : 'error',
        title : 'Devi prima impostare il tipo di contenuto'
      });
    } else {
      let cfg_tpl = Object.assign({}, cfg_tpl_common);

      switch (tipo) {
        case 2: // number
          cfg_tpl = Object.assign(cfg_tpl, cfg_tpl_num);
          break;

        case 6: // textarea
          cfg_tpl = Object.assign(cfg_tpl, cfg_tpl_textarea);
          break;

        case 10: // img
          cfg_tpl = Object.assign({}, cfg_tpl_img);
          break;

        case 11: // gallery
          cfg_tpl = Object.assign({}, cfg_tpl_gallery);
          break;

        case 12: // file
          cfg_tpl = Object.assign({}, cfg_tpl_file);
          break;
      }

      let cfg_tpl_str = JSON.stringify(cfg_tpl, null, 2);

      if(cfg_data === 'required' && [10, 11].indexOf(tipo) === -1) {
        cfg_tpl_str = JSON.stringify({properties: ['required']}, null, 2);
      }

      if(config_field.val().trim() !== '' && config_field.val().trim() !== '{}'){
        mAlert({
          type  : 'confirm',
          title : 'Il campo “config” contiene dei valori, sovrascrivo?',
          ok_btn_text: 'OK',
          callback: function(esito) {
            if(esito) {
              config_field.val(cfg_tpl_str).trigger('input'); // trigger → attiva autosize
            }
          }
        });
      } else {
        config_field.val(cfg_tpl_str).trigger('input');
      }
    }
  });

  // $('.test-video').click(function() {

  //   let btn = $(this),
  //     video_container = btn.closest('.form-group'),
  //     titolo_modal = $('label', video_container).text(),
  //     keyname = $('.video-keyname', video_container).val();

  //   test_S3_video(keyname, titolo_modal);
  // });

  $('#form_contenuti').submit(function(){

    const submit_btn = $(':submit', $(this));

    if(config_field.length) {
      let cfg_str = config_field.val().trim()
        .replace(/"true"/g, 'true')
        .replace(/"false"/g, 'false');

      if(!cfg_str) {
        cfg_str = '{}';
      }
      try {
        let cfg =JSON.parse(cfg_str);
        config_field.val(JSON.stringify(cfg, null, 2)); // riformatta il json

      } catch(e) { //throw "error"
        mAlert({
          type  : 'error',
          title : 'Il campo `Config` contiene un JSON non valido'
        });
        submit_btn.prop('disabled', false);
        return false;
      }

      if(config_field.val().indexOf('|') !== -1) {
        mAlert({
          type  : 'error',
          title : 'Il campo `Config` contiene dei valori da impostare (è presente il carattere “|”)'
        });
        submit_btn.prop('disabled', false);
        return false;
      }
      let contenuto = $('#contenuto');
      if(contenuto.length) {
        contenuto.val(contenuto.val().trim());
      }
    }

  });
}
