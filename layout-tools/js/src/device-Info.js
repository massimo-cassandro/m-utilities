import {lt} from './settings.js';

export default function () {

  //device info

  lt.content_wrapper.insertAdjacentHTML('beforeend', '<div class="lt-device-info"></div>');

  const lt_dinfo = lt.content_wrapper.querySelector('.lt-device-info');

  lt_dinfo.innerHTML = `<div class="heading">Device info</div>
    <dl>
      <dt>userAgent</dt>
      <dd>
        ${window.navigator.userAgent}
      </dd>
      <dt>devicePixelRatio</dt>
      <dd>
        ${window.devicePixelRatio}
      </dd>
      <dt>screen.width / height</dt>
      <dd>
        ${window.screen.width}${lt.times}${window.screen.height}${lt.unitSpacing}px
      </dd>
    </dl>`;

}
