export  function isIE() {

  return navigator.userAgent.indexOf('MSIE') !== -1 ||
    navigator.appVersion.indexOf('Trident/') > -1 ||
    navigator.userAgent.indexOf('Trident/') > -1;

}
