import { getLastBuild } from './api';

const buildsToDisplay = ['QoreRoot_QliroCom_Build', 'QoreRoot_QliroCom_E2eTest'];

export const getBuilds = () => {
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
};
