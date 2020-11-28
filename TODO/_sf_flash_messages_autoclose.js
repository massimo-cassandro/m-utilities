export default function () {

  const flash_alerts = document.querySelectorAll('.alert-success.alert-flash');

  if(flash_alerts) {
    let expire_timeout = window.setTimeout(function () {
      flash_alerts.forEach(item => {
        // .fadeTo(500, 0).slideUp(500, function () {
        // $(this).remove();
        let timer = 500 // ms
        ;

        let fade_timeout = window.setTimeout(function () {

          item.style.opacity = 1 / timer;
          timer--;

        }, 500);
        window.clearTimeout(fade_timeout);
      });

    }, 4000);
    window.clearTimeout(expire_timeout);
  }
}
