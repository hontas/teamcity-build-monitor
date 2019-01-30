import React, { useState, useEffect } from 'react';

import { getProjectsAndBuildTypes } from '../api/teamcity';
import useProjectsAndBuildTypes from '../state/projectsAndBuildTypes';

import css from './buildsToMonitorForm.css';

export default ({ selectedBuildTypes = [], toggleBuildType }) => {
  const [projectsAndBuildTypes, setProjectsAndBuildTypes] = useProjectsAndBuildTypes();
  const [rootId, selectRootId] = useState();
  const [projectId, selectProjectId] = useState();

  useEffect(() => {
    if (!projectsAndBuildTypes) {
      getProjectsAndBuildTypes().then(setProjectsAndBuildTypes);
    }
  }, []);

  if (!projectsAndBuildTypes) return null;
  const { roots = [], projects = [], buildTypes = [] } = projectsAndBuildTypes;
  const selectableTypes = buildTypes.filter((buildType) => buildType.projectId === projectId);

  return (
    <div className={css.wrapper}>
      <form>
        <select onChange={({ target }) => selectRootId(target.value)}>
          <option disabled>Team</option>
          {roots.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
        {rootId && (
          <select onChange={({ target }) => selectProjectId(target.value)}>
            <option disabled>Project</option>
            {projects
              .filter(({ parentProjectId }) => parentProjectId === rootId)
              .map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
          </select>
        )}
        {selectableTypes.map(({ id, name }) => (
          <label key={id}>
            {name}
            <input
              type="checkbox"
              checked={selectedBuildTypes.includes(id)}
              onChange={({ target }) => toggleBuildType(id, target.checked)}
            />
          </label>
        ))}
      </form>
    </div>
  );
};
