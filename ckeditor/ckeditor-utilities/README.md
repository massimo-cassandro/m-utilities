#CKEditor utilities

includere i due file
* `./_m-ckeditor-form-check.js`
* `./_m-ckeditor-loader.js`

config (editare i eprcorsi secondo necessità):

```javascript
window.mUtilities = window.mUtilities || {};

window.mUtilities.ckeditor = {

  cke_url: '/assets/ckeditor/m-ckeditor-min.js',
  upl_url: '/ckeditor/file-uploader',
  img_viewer: '/viewer/',

  requiredErrorMes: elementoRequired => {
    return `Il campo ${elementoRequired} è obbligatorio`;
  },
  alertUI: mes => {
    mAlert({
      type           : 'error',
      title          : mes,
      mes            : null
    });
  }
}
```
