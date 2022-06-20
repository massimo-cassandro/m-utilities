/**
 * Icona SVG
 * Aggiunge all'elemento SVG la classe `line-icon` o `fill-icon` se l'id dell'icona termina con
 * `-line` o `-fill`.
 * La stessa classe viene aggiunta ad ogni elemento `use` se si tratta di un'icona composta, con
 * l'aggiunta di un'ulteriore classe corrispondente all'id dell'elemento
 *
 * @param {*} props
 * @returns
 * @author Massimo Cassandro
 */

// https://it.reactjs.org/docs/typechecking-with-proptypes.html

// import icone from '../../imgs/icone.svg';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqid from '@massimo-cassandro/m-utilities/js-utilities/unique-id';
import getAppData from '../../front-end/js/src/get-app-data';

/*
  import Icona from 'icone';

  <Icona {...{
    id           : '',        //o array di id / required
    className    : 'icona',
    title        : '',
    descr        : '',
    ariaHidden   : true       // forzata su false se descr o title sono definiti
  }} />

*/

function Icona(props) {
  const app_data =  getAppData();

  let icon_id;
  if(Array.isArray(props.id)) {
    icon_id = props.id;
  } else {
    icon_id = [props.id.trim()];
  }

  let base_id = icon_id.join('') + uniqid(),
    ariaHidden = props.ariaHidden,
    aria_ids = [],
    title_unique_id = 't-' + base_id,
    descr_unique_id = 'd-' + base_id;

  if(props.title || props.descr) {
    ariaHidden = false;
  }
  if(props.title) {
    aria_ids.push(title_unique_id);
  }

  if (props.descr) {
    aria_ids.push(descr_unique_id);
  }

  let svgClassNames = [];
  let svg_attrs = {...{role: 'img'}, ...props.attrs};
  if(props.className) {
    svgClassNames.push(props.className);
  }

  // se c'è un solo elemento, la classe `line-icon` o `fill-icon` viene aggiunta
  // al tag svg
  if(icon_id.length === 1) {
    if(/-fill$/.test(icon_id)) {
      svgClassNames.push('fill-icon');

    } else if(/-line$/.test(icon_id)) {
      svgClassNames.push('line-icon');
    }
  }

  if(ariaHidden) {
    svg_attrs['aria-hidden'] = true;
  }
  if(aria_ids.length) {
    svg_attrs['aria-labelledby'] = aria_ids.join(' ');
  }

  return (
    <svg {...svg_attrs} className={svgClassNames.length? classnames(svgClassNames) : null}>
      {props.title && <title id={title_unique_id}>{props.title}</title>}
      {props.descr && <desc id={descr_unique_id}>{props.descr}</desc>}
      {icon_id.map(id => {
        let useClassNames = [];

        if(icon_id.length > 1) {
          useClassNames.push(id);

          if(/-fill$/.test(id)) {
            useClassNames.push('fill-icon');

          } else if(/-line$/.test(id)) {
            useClassNames.push('line-icon');
          }
        }

        return (
          <use xlinkHref={`${app_data.icon_file}#${id}`} className={useClassNames.length? classnames(useClassNames) : null} key={id}></use>
        );
      })}
    </svg>
  );
}


Icona.propTypes = {
  id          : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  className   : PropTypes.string,
  title       : PropTypes.string,
  descr       : PropTypes.string,
  ariaHidden  : PropTypes.bool,
  attrs       : PropTypes.object
};

Icona.defaultProps = {
  className   : 'icona',
  title       : null,
  descr       : null,
  ariaHidden  : true,       // forzata su false se descr o title sono definiti
  attrs       : {}
};

export default Icona;


