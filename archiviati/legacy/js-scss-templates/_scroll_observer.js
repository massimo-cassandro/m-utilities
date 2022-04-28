(() => {
  'use strict';

  if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {

    const observer_element = document.querySelector('.scroll-observer');
    // in modo fancy non è presente
    if(observer_element) {
      const scrollObserver = new IntersectionObserver( (entries) => {
        document.documentElement.classList.toggle('scroll-on', !entries[0].isIntersecting);
      },{
        threshold: 1,
        rootMargin: '200px 0px',
      });

      scrollObserver.observe(observer_element);
    }
  }

})();
