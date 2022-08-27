function makeRequest(method, url, data = null) {
  return new Promise(function (resolve, reject) {    
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {        
        reject(JSON.parse(xhr.response));
      }
    };
    xhr.onerror = function () {      
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
  });
}

export const http = {
  get: (url) => {   
    return makeRequest("GET", url);   
  },
  post: (url, data) => {    
    return makeRequest("POST", url, data);
  },
  delete: (url) => {   
    return makeRequest("DELETE", url);   
  },
  patch: (url, data) => {   
    return makeRequest("PATCH", url, data);    
  },
};
