#CKEditor utilities

includere i due file

* `./m-ckeditor-form-check.js`
* `./m-ckeditor-loader.js`

## configurazione

(editare i percorsi secondo le impostazioni del progetto)

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

##TODO

Custom heading (loader): <https://ckeditor.com/docs/ckeditor5/latest/features/headings.html>
