export const apiCall = async (method, path, data) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method,
    body: data
  })
    .then(res => res.json())
    .then(data => data);
};
