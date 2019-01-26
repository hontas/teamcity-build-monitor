import { getLastBuild } from './api';

const buildsConfig = {
  QoreRoot_QliroCom_Build: {
    name: 'Qliro.com develop BUILD'
  },
  QoreRoot_QliroCom_E2eTest: {
    name: 'Qliro.com develop E2E'
  }
};

export const getBuilds = () => {
  const promises = Object.entries(buildsConfig).map(([type, options]) =>
    getLastBuild(type).then((json) => {
      if (!json) return undefined;
      return {
        [type]: {
          ...options,
          ...json
        }
      };
    })
  );

  return Promise.all(promises).then((responses) => {
    const nextBuilds = responses.filter(Boolean).reduce((res, curr) => ({ ...res, ...curr }), {});
    console.log(nextBuilds);
    return nextBuilds;
  });
};
