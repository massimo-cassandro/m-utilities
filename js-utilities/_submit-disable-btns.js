export default function () {
  document.querySelectorAll('form:not([data-disable-submit=false])').forEach( el => {
    el.addEventListener('submit', () => {
      el.querySelectorAll('[type=submit], [type=button]').forEach(el => {
        el.disabled = true;
      });
    });
  });
}
