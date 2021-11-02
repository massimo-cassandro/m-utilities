let app_data = document.body.dataset || {};

export default {
  ...app_data,
  ...{
    baseUrl: app_data.baseUrl || '',
    dev: app_data.dev? true : false,
    superAdmin: app_data.superAdmin? true : false,
    domain: 'esportsacademy.it',
    fw: 'bs5',
    jq_url: '/libs/jquery.min.js',
    brkt_url: '/tornei-brackets/'
  }
};

// export default { ...app_data }; //Object.assign({}, app_data);
