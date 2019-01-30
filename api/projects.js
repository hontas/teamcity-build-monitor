import { makeRequest, teamcityBaseUrl } from './index';

export function getProjects() {
  return makeRequest(`${teamcityBaseUrl}/app/rest/projects`).then(({ project }) => project);
}
