const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

export const get = url =>
  fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => {
      console.log('Fetch Error :-S', error);
    });

const POST_DEFAULT = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
};

export const post = (url, body) =>
  fetch(url, {
    ...POST_DEFAULT,
    body: JSON.stringify(body),
  })
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => {
      console.log('Fetch Error :-S', error);
    });

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
