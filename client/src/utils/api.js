export const apiCall = async (method, path, data) => {
  const token = localStorage.getItem('token');

  return fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method,
    headers: {
      Authorization: token
    },
    body: data ? JSON.stringify(data) : null
  })
    .then(res => {
      if (!res.ok) {
        const error = res.json();
        throw error;
      } else {
        // If the content-type is set to json, parse the response as json
        // otherwise, parse it as a blob.
        if (res.headers.get('content-type') && res.headers.get('content-type').indexOf('application/json') !== -1) {
          return res.json();
        } else {
          return res.blob();
        }
      }
    })
    .catch(err => {
      throw err;
    });
};
