/**
 *
 * @param {*} props
 * @returns
 * @author Massimo Cassandro
 */

// TODO sizes
// TODO SVG images
// TODO lazy loading js

/*
  <picture>
    <source type="image/webp" srcset="img-xl.webp" media="(min-width: 1200px)">
    <source srcset="img-xl.jpg" media="(min-width: 1200px)">

    <source type="image/webp" srcset="img-lg.webp" media="(min-width: 992px) and (max-width: 1199px)">
    <source srcset="img-lg.jpg" media="(min-width: 992px) and (max-width: 1199px)">

    <source type="image/webp" srcset="img-md.webp" media="(min-width: 768px) and (max-width: 991px)">
    <source srcset="img-md.jpg" media="(min-width: 768px) and (max-width: 991px)">

    <source type="image/webp" srcset="img-sm.webp" media="(min-width: 576px) and (max-width: 767px)">
    <source srcset="img-sm.jpg" media="(min-width: 576px) and (max-width: 767px)">

    <source type="image/webp" srcset="img-xs.webp">
    <img src="img-xs.jpg" alt="Testata Luci" class="img-fluid d-block object-fix-cover">
  </picture>
*/

import PropTypes from 'prop-types';
// import HTMLComment from 'react-html-comment';
import getAppData from '../../front-end/js/src/get-app-data.js';
import {grid_breakpoints} from '../../front-end/js/src/breakpoints.mjs';

const app_data = getAppData();


TODO funzione per ricavare src dell'img base?

export function createSrcSetObj(opts) {
  /*
    opts = {
      img_id    : id dell'immagine (obbl.)
      brks      : oggetto dei breakpoints BS5 e delle relative dimensioni
                  dell'immagine (es. md: '200x300')
      dpr2      : true per aggiungere la versione con dpr 2
      debug     : se true aggiunge info per il debug
    }
  */

  const default_opts = {
    dpr2: true,
    debug: process.env.NODE_ENV === 'development',
    brks: []
  };

  opts = {...default_opts, ...opts};

  if(opts.img_id === undefined || (opts.breakpoints === undefined)) {
    throw new Error( 'Parametri insufficienti' );
  }

  const base_url = `${app_data.viewer}/${opts.img_id}}`;
  let result = {sources: []};

  // sort dei breakpoints dati secondo l'ordine di bootstrap_breakpoints
  const bootstrap_breakpoints = Object.keys(grid_breakpoints).reverse(),
    brk_keys = Object.keys(opts.breakpoints);

  brk_keys.sort(function(a, b){
    return bootstrap_breakpoints.indexOf(a) - bootstrap_breakpoints.indexOf(b);
  });

  if(opts.debug){
    console.log(brk_keys); // eslint-disable-line
  }

  brk_keys.forEach((brk, idx) => {

    const isFirst = idx === 0,
      isLast = idx === brk_keys.length - 1;

    if(opts.debug){
      console.log(brk, idx, isFirst, isLast); // eslint-disable-line
    }

    let prev_brk = idx === 0 ? null : brk_keys[idx-1];

    let [w, h] = opts.breakpoints[brk].split('x').map(item => +item.trim());

    // xxl_full_width è definito in breakpoints.mjs
    if(!w) {
      w = brk === 'xxl'? xxl_full_width : grid_breakpoints[prev_brk] - 1;
    }

    ['webp', 'jpg'].forEach(file_format => { // jpg alla fine

      let fmt = file_format === 'webp' ? '&fm=webp' : '';
      let source_item = {
        brk: brk, // solo a scopo di controllo, non utilizzato
        srcset: `${base_url}&w=${w}&h=${h}${fmt}`
      };

      // dpr 2: solo brk > lg
      if(['xxl', 'xl', 'lg'].indexOf(brk) === -1 && opts.dpr2) {
        source_item.srcset += `, ${base_url}&w=${w * 2}&h=${h * 2}${fmt} 2x`;
      }

      if(isLast && file_format === 'jpg') {

        result.src = `${base_url}&w=${w}&h=${h}`;
        if(opts.dpr2) {
          result.srcset = `${base_url}&w=${w * 2}&h=${h * 2} 2x`;
        }

      } else {

        source_item.media = (!isLast? `(min-width: ${grid_breakpoints[brk]}px)` : '') +
          ((!isLast && !isFirst)? ` and (max-width: ${grid_breakpoints[prev_brk] - 1}px)` : '');

        result.sources.push(
          file_format !== 'jpg' ? { type: file_format, ...source_item } : source_item
        );

      }
    });

  }); // end foreach

  return result;
}


function RespImgSource(props) {
  let type;
  switch (props.type) {
    case 'webp':
      type = 'image/webp';
      break;

    case 'avif':
      type = 'image/avif';
      break;

    default:
      type = undefined;
  }

  return (
    <>
      {/* {(props.brk && process.env.NODE_ENV === 'development') && <HTMLComment text={`#${props.brk}${props.type? `/${props.type}` : ''}`}/>} */}
      <source srcSet={props.srcset} type={type} media={props.media || null} />
    </>
  );
}
RespImgSource.propTypes = {
  type    : PropTypes.oneOf(['jpeg', 'jpg', 'png', 'gif', 'avif', 'webp']),
  srcset  : PropTypes.string.isRequired, // default fallback image
  media   : PropTypes.string,
  brk     : PropTypes.string // facoltativo, solo a scopo di testing
};
RespImgSource.defaultProps = {
  type    : 'jpeg',
  media   : null
};


function ResponsiveImage(props) {

  return (
    <>
      <picture>
        {props.sources.map((item, idx) => <RespImgSource {...item} key={idx} /> )}
        <img src={props.src}
          srcSet={props.srcset}
          alt={props.alt}
          className={props.className}
          loading={props.lazy? 'lazy' : null}
          decoding={props.async? 'async' : null}
          fetchpriority={props.fetchpriority}
        />
      </picture>
    </>
  );
}

// https://it.reactjs.org/docs/typechecking-with-proptypes.html

ResponsiveImage.propTypes = {
  alt             : PropTypes.string.isRequired,
  async           : PropTypes.bool,
  fetchpriority   : PropTypes.oneOf(['high', 'low', 'auto']),
  className       : PropTypes.string,
  lazy            : PropTypes.bool,
  sizes           : PropTypes.string,
  sources         : PropTypes.arrayOf(
    PropTypes.shape(RespImgSource.propTypes)
  ),
  src             : PropTypes.string.isRequired, // default fallback image
  srcset          : PropTypes.string // optional srcset for img tag
};

ResponsiveImage.defaultProps = {
  lazy            : false,
  async           : true
};

export default ResponsiveImage;




