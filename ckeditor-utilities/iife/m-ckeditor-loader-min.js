!function(){"use strict";!function(e){const t=document.querySelectorAll("textarea.editor");void 0===window.mUtilities&&(window.mUtilities={});let i=Object.assign({},{cke_url:"/assets/ckeditor-dist/m-ckeditor-min.js",upl_url:"/ckeditor/file-uploader",img_viewer:"/viewer/"},e||{},window.mUtilities.ckeditor||{});if(t.length){window.ckeditor_instances={};const e=["heading","|","bold","italic","link","|","alignment:left","alignment:center","alignment:right","alignment:justify","|","outdent","indent","|","bulletedList","numberedList","|","imageUpload","blockQuote","insertTable","undo","redo"],l=["heading","|","bold","italic","link","|","alignment:left","alignment:center","alignment:right","alignment:justify","|","outdent","indent","|","bulletedList","numberedList","|","blockQuote","insertTable","undo","redo"],o=["heading","|","bold","italic","link","|","alignment:left","alignment:center","alignment:right","alignment:justify","|","outdent","indent","|","bulletedList","numberedList","|","blockQuote","undo","redo"],a=["mUploadAdapter","ImageUpload","Image","ImageToolbar","ImageStyle","ImageUpload","ImageCaption"],n=["insertTable","Table","TableToolbar","TableProperties","TableCellProperties"],r=["Heading"];let d=document.createElement("script");d.onload=()=>{t.forEach((function(t,d){let s={uploaderUrl:i.upl_url,uploadMaxSize:4194304,imgViewer:i.img_viewer,toolbar:e};t.dataset.ckeUplMaxSize&&(s.uploadMaxSize=t.dataset.ckeUplMaxSize),t.classList.contains("editor-lite")?s={toolbar:l,removePlugins:a}:t.classList.contains("editor-xlite")&&(s={toolbar:o,removePlugins:a.concat(n)}),t.classList.contains("editor-no-headings")&&(s.toolbar=s.toolbar.filter(e=>"heading"!==e),s.removePlugins=s.removePlugins.concat(r)),"|"===s.toolbar[0]&&(s.toolbar=s.toolbar.slice(1)),"|"===s.toolbar.slice(-1)&&(s.toolbar=s.toolbar.slice(0,-1)),ClassicEditor.create(t,s).then(e=>{t.disabled&&(e.isReadOnly=!0),window.ckeditor_instances[t.id?t.id:d]=e,document.querySelectorAll('[data-enable="editor"]:disabled').forEach(e=>{e.disabled=!1,e.closest(".form-group").classList.remove("disabled")})}).catch(e=>{console.group("textarea "+d),console.error(e),console.log("textarea",t),console.groupEnd()})}))},d.src=i.cke_url,d.type="text/javascript",document.head.appendChild(d)}}()}();
//# sourceMappingURL=m-ckeditor-loader-min.js.map