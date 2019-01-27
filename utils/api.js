const baseUrl = '/api/teamcity';

export const toQueryString = (query = {}) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const getLastBuild = (buildType) =>
  getBuildInfo({
    buildType,
    locator: 'running:any',
    count: 1
  });

function getBuildInfo(query = {}) {
  return makeRequest(`${baseUrl}/app/rest/builds?${toQueryString(query)}`)
    .then(({ build }) => build[0])
    .then(async (build) => {
      const buildDetails = await makeRequest(`${baseUrl}${build.href}`);
      return {
        ...build,
        ...transformDates(buildDetails)
      };
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
}

function makeRequest(url) {
  return fetch(url, {
    headers: { accept: 'application/json' }
  }).then((resp) => {
    if (resp.ok) return resp.json();
    console.error('resp', resp);
    return Promise.reject(resp.text());
  });
}

function transformDates(buildDetails) {
  return {
    ...buildDetails,
    queuedDate: transformDate(buildDetails.queuedDate),
    startDate: transformDate(buildDetails.startDate),
    finishDate: transformDate(buildDetails.finishDate)
  };
}

function transformDate(simpleDate) {
  if (!simpleDate) return simpleDate;
  return simpleDate.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
}
