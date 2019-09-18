# mAlert

Sistema di alert simile a [Sweetalert](https://sweetalert.js.org/) ma basato sul componente [Modal di Boostrap](https://getbootstrap.com/docs/4.0/components/modal/).


## Uso

```javascript

mAlert({
    type: 'success', // success (default), error, info, warning, confirm
    
    title: 'Operazione completata', // facoltativo, default null
    title_class: 'text-success',    // facoltativo, default null
    mes: null,                      // facoltativo, default null
    
    ok_btn_text: 'OK',              // obbl. default OK
    ok_btn_class: 'btn-success',    // obbl. default `btn-outline-primary`
    
    cancel_btn_text: 'Annulla',     // obbl. solo confirm default Annulla
    cancel_btn_class: 'btn-outline-warning', // obbl. solo confirm default `btn-outline-primary`
    
    timer: 4000,// ms               // facoltativo, default null
    modal_keyboard: true,           // true o false, parametro keyboard del componente modal
    modal_backdrop: true            // true, false o 'static', parametro backdrop del componente modal
});

```
