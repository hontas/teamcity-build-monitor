import { getBuildTypes } from './buildTypes';
import { getProjects } from './projects';

const idSelector = ({ id }) => id;

export { getBuilds } from './builds';

export const getProjectsAndBuildTypes = () => {
  return Promise.all([getProjects(), getBuildTypes()]).then(([allProjects, buildTypes]) => {
    const roots = allProjects.filter(({ parentProjectId }) => parentProjectId === '_Root');
    const levelOneIds = roots.map(idSelector);
    const projects = allProjects.filter(({ parentProjectId }) =>
      levelOneIds.includes(parentProjectId)
    );

    return {
      roots,
      projects,
      buildTypes
    };
  });
};
