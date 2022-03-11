import {lt} from './settings.js';

export default function () {

  // le toolbar aggiuntive possono essere caricate dopo layout tools
  // e vengono quindi elborate dai selettori indicati in `other_toolbars_selectors`
  let other_toolbars = null;

  const wrapper_id = 'lt-wrapper',
    other_toolbars_selectors = ['.sf-toolbar'], // selettori di altre toolbar da rimuovere

    get_other_toolbars = () => {
      if(other_toolbars === null) {
        other_toolbars = [];
        other_toolbars_selectors.forEach(selector => {
          let this_toolbar = document.querySelector(selector);
          if(this_toolbar) {
            other_toolbars.push(this_toolbar);
          }
        });
      }
      return other_toolbars;
    };


  document.body.insertAdjacentHTML('beforeend', '<div id="' + wrapper_id + '" class="lt-collapsed"></div>');
  lt.wrapper = document.getElementById(wrapper_id);

  lt.wrapper.innerHTML = `<div class="lt-inner-wrapper">
      <div class="lt-content">
        <div>
          <button type="button" class="lt-hide-show-btn">Hide</button>
          <button type="button" class="lt-remove-btn">Remove</button>
        </div>
      </div>
      <div class="lt-brkpt">&#x2732;</div>
    </div>`;

  lt.content_wrapper = lt.wrapper.querySelector('.lt-content');
  lt.brkpt_wrapper = lt.wrapper.querySelector('.lt-brkpt');

  // contrazione wrapper
  lt.brkpt_wrapper.addEventListener('click', function () {
    lt.wrapper.classList.toggle('lt-collapsed');
  }, false);

  // layout tools e sf toolbar invisibili
  const hide_btn = lt.content_wrapper.querySelector('.lt-hide-show-btn'),
    set_hidden = (add_storage) => {
      lt.wrapper.classList.toggle('lt-hidden');
      let is_hidden = lt.wrapper.classList.contains('lt-hidden');

      get_other_toolbars().forEach(toolbar => {
        toolbar.toggleAttribute('hidden', is_hidden);
      });

      hide_btn.innerHTML = is_hidden ? 'Show' : 'Hide';
      if(add_storage) {
        lt.upd_settings({hidden: is_hidden});
      }
    };

  hide_btn.addEventListener('click', () => {
    set_hidden(true);
  },false);

  if(lt.settings.hidden) {
    set_hidden(false);
  }

  // eliminazione completa delle barre
  lt.content_wrapper.querySelector('.lt-remove-btn').addEventListener('click', () => {
    lt.wrapper.remove();
    get_other_toolbars().forEach(toolbar => {
      toolbar.remove();
    });
    // la barra viene mostrata al successivo reload
    lt.upd_settings({hidden: false});
  });
}
