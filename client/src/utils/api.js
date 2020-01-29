export const apiCall = async (method, path, data) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method,
    body: data ? JSON.stringify(data) : null
  })
    .then(res => {
      // If the content-type is set to json, parse the response as json
      // otherwise, parse it as a blob.
      if (res.headers.get('content-type').indexOf('application/json') !== -1) {
        return res.json();
      } else {
        return res.blob();
      }
    })
    .catch(err => {
      console.log(err);
    });
};
