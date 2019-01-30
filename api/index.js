export const teamcityBaseUrl = '/api/teamcity';

export const toQueryString = (query = {}) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export function makeRequest(url) {
  return fetch(url, {
    headers: { accept: 'application/json' }
  }).then((resp) => {
    if (resp.ok) return resp.json();
    // console.error(resp);
    return Promise.reject(resp.text());
  });
}
