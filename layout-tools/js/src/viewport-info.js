import {lt} from './settings.js';

export default function () {
  'use strict';

  //viewport info
  lt.content_wrapper.insertAdjacentHTML('beforeend', '<div class="lt-vpinfo"></div>');

  const lt_vpinfo = lt.content_wrapper.querySelector('.lt-vpinfo'),
    body_font_size = parseFloat(window.getComputedStyle(document.body, null)
      .getPropertyValue('font-size')),
    getViewportSize = function () {
      let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
        vw_em = (vw / body_font_size).toFixed(2),
        vh_em = (vh / body_font_size).toFixed(2),

        body_width = document.documentElement.clientWidth,
        body_width_em = (body_width / body_font_size).toFixed(2),
        body_height = document.documentElement.clientHeight,
        body_height_em = (body_height / body_font_size).toFixed(2);

      lt_vpinfo.innerHTML = `<div class="heading">Viewport info</div>
        ${vw}${lt.times}${vh}${lt.unitSpacing}px
        /
        ${vw_em}${lt.times}${vh_em}${lt.unitSpacing}em
        <br><br>
        <strong>body*:</strong><br>
        ${body_width}${lt.times}${body_height}${lt.unitSpacing}px
        /
        ${body_width_em}${lt.times}${body_height_em}${lt.unitSpacing}em
        <br>
        <small><em>(*) Altezza uguale a viewport se body height: 100%</em></small>`;
    };


  getViewportSize();

  if('ResizeObserver' in window) {

    const resizeObserver = new ResizeObserver(() => {
      getViewportSize();
    });

    resizeObserver.observe(document.body);

  } else {
    window.onresize = getViewportSize; // safari, ie
  }
}
