export const status_params =  {

  success: {
    svg: '<path class="check" d="M101.4 42L52.7 90.6 31 69.3" />',

    title: 'Operazione completata',
    mes: null,
    ok_btn_text: 'OK',

    title_class: 'text-success',
    ok_btn_class: 'btn-success',

    timer: 4000
  },

  error: {
    svg: '<path d="M35 39L96.4 93.4" />'+
      '<path d="M96.4 39L35 93.2" />',

    title: 'Si è verificato un errore',
    mes: null,
    ok_btn_text: 'OK',

    bs_status_class: 'danger',
    title_class: 'text-danger',
    ok_btn_class: 'btn-danger',

    timer: null
  },
  warning: {
    svg: '<path d="M41.839 72.475v-37.2c0-3.852 3.143-6.975 7.02-6.975s7.02 3.123 7.02 6.975V65.5m0-30.225v-9.3c0-3.852 3.143-6.975 7.02-6.975s7.02 3.123 7.02 6.975V65.5m0-30.225c0-3.852 3.143-6.975 7.02-6.975 3.878 0 7.02 3.123 7.02 6.975V65.5m0-20.925c0-3.852 3.144-6.975 7.02-6.975 3.878 0 7.021 3.123 7.021 6.975V84.1C98 99.509 85.428 112 69.92 112h-9.36c-9.896-1.357-18.517-6.496-23.401-13.95L24.522 73.637c-2.584-3.53-1.799-8.475 1.755-11.043 3.555-2.568 8.531-1.788 11.116 1.743l4.212 8.138" />',
    title: 'Attenzione!',
    mes: null,
    ok_btn_text: 'OK',
    title_class: null,
    ok_btn_class: 'btn-warning',
    timer: null
  },
  info: {
    svg: '<path d="M74 105l-8.6.237V45.713L56 46m9.6-13.025V26" />',

    title: null,
    mes: null,
    ok_btn_text: 'Ricevuto',

    title_class: null,
    ok_btn_class: 'btn-info',

    timer: null
  },
  confirm: {
    svg: '<path d="M44 48a21.928 21.928 0 0 1 6.443-15.556A21.931 21.931 0 0 1 66 26c12.15 0 22 9.85 22 22 0 6.14-2.668 11.543-6.573 15.683-6.514 6.91-15.363 4.47-15.363 16.065v7.935M66 105.816v-6.975" />',

    title: 'Confermi?',
    mes: null,
    ok_btn_text: 'Ho capito',
    cancel_btn_text: 'Annulla',
    cancel_focus: true, // false to give focus to the ok button
    title_class: null,
    ok_btn_class: 'btn-warning',
    cancel_btn_class: 'btn-outline-warning',
    callback: null,
    timer: null
  }

};

