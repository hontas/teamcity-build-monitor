import { makeRequest, teamcityBaseUrl } from './index';

export function getBuildTypes() {
  return makeRequest(`${teamcityBaseUrl}/app/rest/buildTypes`).then(({ buildType }) => buildType);
}
