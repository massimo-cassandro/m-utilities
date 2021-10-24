import {lt} from './settings.js';

export default function () {
  'use strict';

  //ui
  lt.content_wrapper.insertAdjacentHTML('beforeend',
    '<div><label><input type="checkbox" class="lt-imgs-info-trigger">Imgs info</label</div>'
  );

  let imgs = document.getElementsByTagName('img');

  const imgsInfoTrigger = lt.content_wrapper.querySelector('.lt-imgs-info-trigger'),
    removeImgsInfo = () => {
      document.querySelectorAll('.lt-img-info-wrapper').forEach(item => {
        item.remove();
      });
    },
    shortenSrcString = (str) => {
      // mantiene solo gli ultimi due elementi del path
      const shortenSrc = src => {
        let srcElements = src.trim().split('/'),
          strPrefix = srcElements.length > 2? '[&hellip;] /' : '';
        return `<span title="${src}">${strPrefix}${srcElements.slice(-2).join('/')}</span>`;
      };

      return str.split(',').map(item => {
        return shortenSrc(item);
      }).join(',<br>');
    },
    formatPropValue = (prop, value) => {
      if(value) {
        if(['src', 'currentSrc', 'srcset'].indexOf(prop) !== -1 ) {
          return shortenSrcString(value);
        } else {
          return value;
        }
      } else {
        return '&mdash;';
      }
    },

    //img info
    showImgsInfo = () => {

      [...imgs].forEach(img => {

        const img_info_rows = () => {
          const img_props = [
            'src',
            'currentSrc',
            'srcset',
            'sizes',
            'media',
            'width',
            'height',
            'naturalWidth',
            'naturalHeight',
            'id',
            'className'
          //'attributes'
          ];

          let rows = '';
          // img.dataset.ltImgIdx = idx;

          img_props.forEach(prop => {
            rows += `<tr>
              <th scope="row">${prop}</th>
              <td class="lt-img-${prop}">${formatPropValue(prop, img[prop])}</td>
            </tr>`;
          });

          return rows;
        };

        img.insertAdjacentHTML('afterend',
          `<details class="lt-img-info-wrapper">
            <summary>Info</summary>
            <table>
              <tbody>
                ${img_info_rows()}
              </tbody>
            </table>
          </details>`
        );



      }); // end foreach
    }, // end showImgsInfo

    updImgsInfo = () => {
      const upd_img_props = [
        'currentSrc',
        'width',
        'height'
      ];
      [...imgs].forEach(img => {
        upd_img_props.forEach(prop => {
          let sibling =img.nextElementSibling.querySelector(`td.lt-img-${prop}`);
          if(sibling) {
            sibling.innerHTML = formatPropValue(prop, img[prop]);
          }
        });
      }); // end foreach

    }; // end updImgsInfo

  imgsInfoTrigger.addEventListener('click', () => {
    lt.upd_settings({imgs_info: imgsInfoTrigger.checked});

    if( imgsInfoTrigger.checked ) {
      showImgsInfo();
    } else {
      removeImgsInfo();
    }
  }, false);

  if(lt.settings.imgs_info) {
    showImgsInfo();
    imgsInfoTrigger.checked = true;
  }

  if('ResizeObserver' in window) {

    const resizeObserver = new ResizeObserver(() => {
      if( imgsInfoTrigger.checked ) {
        updImgsInfo();
      }
    });

    resizeObserver.observe(document.body);

  } else {
    window.onresize = function () {
      if( imgsInfoTrigger.checked ) {
        updImgsInfo();
      }
    }; // safari, ie
  }

}
