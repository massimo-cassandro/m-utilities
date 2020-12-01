let app_data = document.body.dataset || {};

app_data.baseUrl = app_data.baseUrl || '';
app_data.dev = app_data.dev? true : false;

export default { ...app_data }; //Object.assign({}, app_data);
