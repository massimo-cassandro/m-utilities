export var lt = {
  times: '&VeryThinSpace;&times;&VeryThinSpace;', // carattere x e spaziatura
  unitSpacing: '&VeryThinSpace;',
  storage_key: 'lt_settings',

  // defaults
  settings: {
    hidden: false,
    pictures_info: false
  },

  upd_settings: obj => {
    lt.settings = Object.assign({}, lt.settings, obj);
    sessionStorage[lt.storage_key] = JSON.stringify(lt.settings);
  }

};
