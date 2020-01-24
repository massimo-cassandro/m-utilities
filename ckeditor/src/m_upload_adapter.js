/*
 * Upload adapter per CKEditor 5
 * Massimo Cassandro - v. 1.1 - 2018/2020
 *
 * Refs:
 *  - https://ckeditor.com/docs/ckeditor5/latest/framework/guides/creating-simple-plugin.html
 *  - https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/image-upload.html
 *  - https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html
 *  - https://docs.ckeditor.com/ckeditor5/latest/api/module_upload_filerepository-FileRepository.html
 */


/* globals XMLHttpRequest */

// NB: i percorsi dei moduli sono relativi alla cartella node_modules
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';



class UploadAdapter {

  constructor(loader, url, t, textarea_element, imgViewer, uploadMaxSize) {

    // console.log('loader:', loader); // eslint-disable-line
    // console.log('url:', url); // eslint-disable-line
    // console.log('t:', t); // eslint-disable-line
    // console.log('form_element:', form_element); // eslint-disable-line

    this.loader = loader;

    this.url = url;

    /**
     * Locale translation method.
     *
     */
    this.t = t;

    // textarea originale
    this.textarea_element = textarea_element;

    // img viewer base path
    this.imgViewer = imgViewer;

    //uploadMaxSize
    this.uploadMaxSize = uploadMaxSize;
  }

  /**
   * Starts the upload process.
   *
   */
  upload() {

    return this.loader.file.then(file => {
      return new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      });
    });
  }

  /**
   * Aborts the upload process.
   */
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  /**
   * Initializes the XMLHttpRequest object.
   *
   */
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
  }

  /**
   * Initializes XMLHttpRequest listeners.
   */
  _initListeners(resolve, reject, file) {

    const xhr = this.xhr;
    const loader = this.loader;
    const t = this.t;
    const genericError = t('Impossibile caricare il file:') + ` ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericError + ' (1)'));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      let img_src;

      if( this.uploadMaxSize && file.size > this.uploadMaxSize ) {
        let allowed_size = Math.round(this.uploadMaxSize / 1024);
        if( allowed_size > 1024 ) {
          allowed_size = Math.round(allowed_size / 1024) + 'MB';
        } else {
          allowed_size += 'KB';
        }
        return reject(`il file ${file.name} supera la dimensione massima ammessa (${allowed_size})`);
      }

      if(response.demo) {
        img_src = {
          default: response.demo
        };

        // solo a scopo di test (value dell'hidden con l'id dell'immagine caricata)
        response.id = '__demo_img__';

      } else {

        var _this = this; // nei foreach this non è definita

        if (!response || !response.id) { // || !response.uploaded
          return reject(response && response.error && response.error.message ? response.error.message + ' (2)' : genericError + ' (3)');
        }

        // creazione degli url viewer per l'immagine in esame
        // la costruzione del tag img e viene eseguita dal ckeditor
        // richiamando la funzione resolve con l'oggetto contenente i breakpoints
        // necessari
        // vedi
        // https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#responsive-images-and-srcset-attribute
        /*
          breakpoints bs4:
          xs: 0,
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200
        */
        response.width = +response.width;
        img_src = {
          default: this.imgViewer + response.id + '?ext=1' + (response.width > 1200 ? '&bb=1200x' : '')
        };

        [992, 768, 576].forEach(function (item) {
          if (response.width > item) {
            img_src[String(item)] = _this.imgViewer + response.id + '?ext=1&bb=' + item + 'x';
          }
        });
      }

      // aggiunge un hidden con l'id dell'immagine aggiunta
      this.textarea_element.insertAdjacentHTML('afterend',
        '<input type="hidden" name="ckeditor_imgs[]" value="' + response.id + '">'
      );

      // invia i dati a /@ckeditor/ckeditor5-upload/src/imageuploadengine.js
      resolve(img_src);
      //resolve( { default: response.url });

    });

    // Upload progress when it's supported.
    /* istanbul ignore else */
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {

          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  /**
   * Prepares the data and sends the request.
   *
   * @private
   */
  _sendRequest(file) {
    // Prepare form data.
    //console.log('file:', file); // eslint-disable-line
    const data = new FormData();
    data.append('upload', file);

    // Send request.
    this.xhr.send(data);
  }
}


export default class mUploadAdapter extends Plugin {


  static get requires() {
    return [FileRepository];
  }


  static get pluginName() {
    return 'mUploadAdapter';
  }


  init() {
    const url = this.editor.config.get('uploaderUrl'),
      imgViewer = this.editor.config.get('imgViewer'),
      uploadMaxSize = this.editor.config.get('uploadMaxSize') || null;

    if (!url) {
      return;
    }
    // Register adapter
    //console.log(this.editor); // eslint-disable-line
    this.editor.plugins.get(FileRepository).createUploadAdapter = loader =>
      new UploadAdapter(loader, url, this.editor.t, this.editor.sourceElement, imgViewer, uploadMaxSize);
  }
}
