// versione originale:
// https://w3bits.com/javascript-slidetoggle/

// NB: la presenza di margini e padding negli elementia cui è applicato lo slide,
// agli elementi direttamente contenuti e a quelli successivi, può determinare
// un effetto "a scatto" (vedi test)

// agisce anche su elementi inzialmente nascosti da `display: none` anche se
// assegnato nel css non inline

export function disposeSliding(target) {
  target.style.removeProperty('display');
  target.style.removeProperty('height');
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  target.style.removeProperty('overflow');
  target.style.removeProperty('transition-duration');
  target.style.removeProperty('transition-property');
  target.style.removeProperty('box-sizing');
}

// assegnazione e rimozione proprietà condivise
function propertiesSetup(target, duration) {
  target.style.overflow = 'hidden';
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;

}
function propertiesReset(target) {
  target.style.removeProperty('height');
  target.style.removeProperty('overflow');
  target.style.removeProperty('transition-duration');
  target.style.removeProperty('transition-property');

  // necessario solo per SlideUp
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
}

export function slideUp(target, duration=500, callback = null) {

  // NB: la sequenza delle proprietà è importante
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;

  propertiesSetup(target, duration);

  window.setTimeout( () => {
    target.style.display = 'none';

    propertiesReset(target);

    if(callback && typeof callback === 'function') {
      callback();
    }

  }, duration);

  return false;
}

export function slideDown(target, duration=500, callback = null) {

  // NB: la sequenza delle proprietà è importante

  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none') {
    display = 'block';
  }

  target.style.display = display;
  let height = target.offsetHeight;

  propertiesSetup(target, duration);

  target.offsetHeight;
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');

  window.setTimeout( () => {
    propertiesReset(target);

    if(callback && typeof callback === 'function') {
      callback();
    }

  }, duration);

  return true;
}

export function slideToggle(target, duration = 500, callback=null) {
  let is_expanded;
  if (window.getComputedStyle(target).display === 'none') {
    is_expanded = slideDown(target, duration, callback);
  } else {
    is_expanded = slideUp(target, duration, callback);
  }

  return is_expanded;
}
