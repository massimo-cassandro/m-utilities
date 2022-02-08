/**
 * layout_tools.js - 4 / Massimo Cassandro / 2016-2020
 */

 import {lt} from './settings.js';
import lt_ui from './ui.js';
import lt_brkpt from './breakpoints.js';
import lt_viewport_info from './viewport-info.js';
import lt_device_info from './device-Info.js';
import lt_imgs_info from './imgs-info.js';


export default function () {
  const _VERSION = '4.2.0';

  const stored_settings = sessionStorage[lt.storage_key]? JSON.parse(sessionStorage[lt.storage_key]) : {};
  lt.settings = Object.assign({}, lt.settings , stored_settings);


  // load css and init
  let currentScript = document.currentScript;
  lt.currentDir = currentScript.src.split('?')[0];
  lt.currentDir = lt.currentDir.substring(0, lt.currentDir.lastIndexOf('/'));

  lt.framework = currentScript.dataset.fw || 'bootstrap4';
  lt.css = currentScript.dataset.css || lt.currentDir + '/layout-tools.css';

  let lt_css_el = document.createElement('link');
  lt_css_el.onload = function() {
    lt_ui();
    lt_brkpt();
    lt_viewport_info();
    lt_device_info();
    lt_imgs_info();
  };
  lt_css_el.href = lt.css + '?v=' + _VERSION;
  lt_css_el.rel =  'stylesheet';
  lt_css_el.type = 'text/css';
  lt_css_el.media = 'screen';
  document.head.appendChild(lt_css_el);
}
