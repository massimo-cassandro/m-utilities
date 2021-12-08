import * as slide from '@massimo-cassandro/m-utilities/js-utilities/slide-up-down-toggle';
import autosize from '@massimo-cassandro/m-utilities/js-utilities/textarea-autosize';
import {mAlert} from '@massimo-cassandro/m-utilities/mAlert-bs4/_mAlert';

// ckeditor e fileUploader vanno caricati nell'implementazione locale

export default function () {

  autosize();

  const config_field = document.getElementById('config'),
    cfg_tpl_common = {
      class: '',
      attributes: {
        maxlength: 24,
        minlength: 10,
        min: 0,
        max: 100,
        step: 1
      },
      properties: [
        'required',
        'multiple'
      ]
    },
    cfg_tpl_textarea = {
      class:'editor-no-headings',
      attributes: {},
      properties: ['required'],
      editor: 'true|lite|xlite|xxlite',
      html: true
    },
    cfg_tpl_num = { number: 'euro|perc' },
    cfg_tpl_select = {
      class: '',
      attributes: {},
      properties: [
        'required',
        'multiple // non supportato'
      ],
      options: {
        'val_1': 'text_1',
        'val_2': 'text_2'
      }
    },
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


  const cfg_wrapper = document.getElementById('cfg-wrapper'),
    cfg_fset = document.getElementById('cfg-fset');

  document.getElementById('toggle-config').addEventListener('click', () => {
    slide.slideToggle(cfg_wrapper, 500, () => {
      config_field.dispatchEvent(new Event('input'));
      if(cfg_fset.classList.contains('open')) {
        cfg_fset.classList.remove('open');
      } else {
        cfg_fset.classList.add('open');
      }
    });
  }, false);

  const ignora_req_btn = document.getElementById('ignora-required');
  if(ignora_req_btn) {
    ignora_req_btn.addEventListener('click', (e) => {
      let contenuti_values_wrapper = document.querySelector('.contenuti-values');

      if(e.target.checked) {
        contenuti_values_wrapper.querySelectorAll('[required]').forEach( item => {
          item.required = false;
          item.setAttribute('data-cfg-required', true);
          item.closest('.form-group').classList.remove('required');
        });

        // uploader
        contenuti_values_wrapper.querySelectorAll('.fupl-wrapper[data-required="true"]').forEach( item => {
          item.removeAttribute('data-required');
          item.setAttribute('data-cfg-required', true);
          item.querySelector('legend').classList.remove('required');
        });

      } else {
        contenuti_values_wrapper.querySelectorAll('[data-cfg-required]').forEach( item => {
          item.required = true;
          item.removeAttribute('data-cfg-required');
          item.closest('.form-group').classList.add('required');
        });

        // uploader
        contenuti_values_wrapper.querySelectorAll('.fupl-wrapper[data-cfg-required]').forEach( item => {
          item.removeAttribute('data-cfg-required');
          item.setAttribute('data-required', true);
          item.querySelector('legend').classList.add('required');
        });
      }

    }, false);
  }

  const change_tipo = new Event('change'),
    campo_tipo = document.getElementById('tipo');

  campo_tipo.addEventListener('change', (e) => {
    let tipo = +e.target.value;

    document.querySelectorAll('.add_cfg_tpl.req_only').forEach(item => {
      item.disabled = [10, 11].indexOf(tipo) !== -1;
    });
  }, false);

  campo_tipo.dispatchEvent(change_tipo);


  document.querySelectorAll('.add_cfg_tpl').forEach(item => {
    item.addEventListener('click', () => {

      let tipo = +campo_tipo.options[campo_tipo.selectedIndex].value,
        is_required_only = item.classList.contains('req_only'); // inserisce solo required

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

          case 7: // select
            cfg_tpl = Object.assign({}, cfg_tpl_select);
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

        if(is_required_only && [10, 11].indexOf(tipo) === -1) {
          cfg_tpl_str = JSON.stringify({properties: ['required']}, null, 2);
        }

        if(config_field.value.trim() !== '' && config_field.value.trim() !== '{}'){
          mAlert({
            type  : 'confirm',
            title : 'Il campo “config” contiene dei valori, sovrascrivo?',
            ok_btn_text: 'OK',
            callback: function(esito) {
              if(esito) {
                config_field.value = cfg_tpl_str;
                config_field.dispatchEvent(new Event('input')); // trigger → attiva autosize
              }
            }
          });
        } else {
          config_field.value = cfg_tpl_str;
          config_field.dispatchEvent(new Event('input'));
        }
      }
    }, false);
  });

  // tipologia video S3 eliminata
  // $('.test-video').click(function() {

  //   let btn = $(this),
  //     video_container = btn.closest('.form-group'),
  //     titolo_modal = $('label', video_container).text(),
  //     keyname = $('.video-keyname', video_container).val();

  //   test_S3_video(keyname, titolo_modal);
  // });

  document.getElementById('form_contenuti').addEventListener('submit', e => {

    const submit_btns = e.target.querySelectorAll('[type=submit]');

    if(config_field) {
      let cfg_str = config_field.value.trim()
        .replace(/"true"/g, 'true')
        .replace(/"false"/g, 'false');

      if(!cfg_str) {
        cfg_str = '{}';
      }
      try {
        let cfg =JSON.parse(cfg_str);
        config_field.value = JSON.stringify(cfg, null, 2); // riformatta il json

      } catch(err) { //throw "error"
        submit_btns.forEach(item => { item.disabled=false;});
        e.preventDefault();
        mAlert({
          type  : 'error',
          title : 'Il campo `Config` contiene un JSON non valido'
        });

      }

      if(config_field.value.indexOf('|') !== -1) {
        submit_btns.forEach(item => { item.disabled=false;});
        e.preventDefault();
        mAlert({
          type  : 'error',
          title : 'Il campo `Config` contiene dei valori da impostare (è presente il carattere “|”)'
        });

      }
      const contenuto = document.getElementById('contenuto');
      if(contenuto) {
        contenuto.value = contenuto.value.trim();
      }
    }

  }, false);
}
