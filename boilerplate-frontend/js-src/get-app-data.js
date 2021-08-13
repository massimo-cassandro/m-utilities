let app_data = document.body.dataset || {};

app_data.baseUrl = app_data.baseUrl || '';
app_data.dev = app_data.dev? true : false;
app_data.superAdmin = app_data.superAdmin? true : false;

app_data.fw = 'bs5';

export default { ...app_data }; //Object.assign({}, app_data);
