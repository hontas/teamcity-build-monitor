import { makeRequest, toQueryString, teamcityBaseUrl } from './index';

export function getBuilds(buildsToDisplay = []) {
  const promises = buildsToDisplay.map((type) =>
    getLastBuild(type).then((json) => {
      if (!json) return undefined;
      return {
        [type]: json
      };
    })
  );

  return Promise.all(promises).then((responses) => {
    const successfulResponses = responses.filter(Boolean);
    if (successfulResponses.length === 0) return;
    const nextBuilds = successfulResponses.reduce((res, curr) => ({ ...res, ...curr }), {});
    console.log(nextBuilds);
    return nextBuilds;
  });
}

export const getLastBuild = (buildType) =>
  getBuildInfo({
    buildType,
    locator: 'running:any',
    count: 1
  });

function getBuildInfo(query = {}) {
  return makeRequest(`${teamcityBaseUrl}/app/rest/builds?${toQueryString(query)}`)
    .then(({ build }) => build[0])
    .then(async (build) => {
      const buildDetails = await makeRequest(`${teamcityBaseUrl}${build.href}`);
      return {
        ...build,
        ...transformDates(buildDetails)
      };
    })
    .catch(() => undefined);
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
