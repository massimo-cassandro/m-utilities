/*
import url_concat from '@massimo-cassandro/m-utilities/js-utilities/url-concat';

url_concat(url, {param1: val, param2:[1, 'a', 2]})
*/

export default function (url, queryParams = {}) {

  let params = new URLSearchParams();

  for(const i in queryParams) {
    if(Array.isArray(queryParams[i])) {
      queryParams[i].forEach(item => {
        params.append(`${i}[]`, item);
      });
    } else {
      params.set(i, queryParams[i]);
    }
  }

  return url + (/\?/.test(url)? '&' : '?') + params.toString();
}
