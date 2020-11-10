export default function () {
  document.querySelectorAll('form').forEach( el => {
    el.addEventListener('submit', () => {
      el.querySelectorAll('[type=submit], [type=button]').forEach(el => {
        el.disabled = true;
      });
    });
  });
}
