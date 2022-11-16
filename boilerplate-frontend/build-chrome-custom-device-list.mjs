/* eslint-disable no-console */
/* eslint-env node */

import fs from 'fs';

const device_std_height = 700,

  breakpoints = [
    {title: 'moto g5',  w:  360, h: 512},

    {title: 'bs5 xs max',  w:  575, h: device_std_height},
    {title: 'bs5 sm min',  w:  576, h: device_std_height},
    {title: 'bs5 sm max',  w:  767, h: device_std_height},
    {title: 'bs5 md min',  w:  768, h: device_std_height},
    {title: 'bs5 md max',  w:  991, h: device_std_height},
    {title: 'bs5 lg min',  w:  992, h: device_std_height},
    {title: 'bs5 lg max',  w: 1199, h: device_std_height},
    {title: 'bs5 xl min',  w: 1200, h: device_std_height},
    {title: 'bs5 xl max',  w: 1399, h: device_std_height},
    {title: 'bs5 xxl min', w: 1400, h: device_std_height},


    {title: 'schermo staff BV (1280x960)', w: 1280, h: 960},
    {title: '1366x768', w: 1366, h: 768},
    {title: '1280x720 (HD)', w: 1280, h: 720},
    {title: '1920x1080 (full HD)', w: 1920, h: 1980},

  ];

let device_list = breakpoints.map((item, idx) => {

  return {
    'title': ('00' + String(idx+1)).slice(-2) + '. ' + item.title,
    'type': 'unknown',
    'user-agent': '',
    'capabilities': [
      'mobile'
    ],
    'screen': {
      'device-pixel-ratio': 0,
      'vertical': {
        'width': item.w,
        'height': item.h
      },
      'horizontal': {
        'width': item.h,
        'height': item.w
      }
    },
    'modes': [
      {
        'title': '',
        'orientation': 'vertical',
        'insets': {
          'left': 0,
          'top': 0,
          'right': 0,
          'bottom': 0
        }
      },
      {
        'title': '',
        'orientation': 'horizontal',
        'insets': {
          'left': 0,
          'top': 0,
          'right': 0,
          'bottom': 0
        }
      }
    ],
    'show-by-default': true,
    'dual-screen': false,
    'show': 'Default',
    'user-agent-metadata': {
      'brands': [
        {
          'brand': '',
          'version': ''
        }
      ],
      'fullVersion': '',
      'platform': '',
      'platformVersion': '',
      'architecture': '',
      'model': '',
      'mobile': true
    }
  };
});


const dest = 'ChromeCustomDeviceList.txt',
  str = '"customEmulatedDeviceList":"'+ JSON.stringify(device_list).replace(/"/g, '\\"') + '",';

fs.writeFileSync(dest, str);

console.log (
  'copiare in `~/Library/Application Support/Google/Chrome/Default/Preferences` (NB: è un file JSON)\n'+
  'vedi: https://stackoverflow.com/a/70905335/743443\n'
);
