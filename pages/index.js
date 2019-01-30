import React, { useState, useEffect } from 'react';

import { getBuilds } from '../api/teamcity';
import useSelectedBuilds from '../state/selectedBuilds';
import useLastUpdated from '../state/lastUpdated';
import useBuildInfo from '../state/buildInfo';

import Header from '../components/Header';
import Builds from '../components/Builds';
import BuildsToMonitorForm from '../components/BuildsToMonitorForm';

import './base.css';
import css from './index.css';

const BUILDS_INTERVAL = 10000;

export default () => {
  const [buildsToMonitor, setBuildsToMonitor] = useSelectedBuilds();
  const [lastUpdate, setLastUpdate] = useLastUpdated();
  const [buildsInfo, setBuildsInfo] = useBuildInfo();
  const [isLoading, setIsLoading] = useState(false);

  const toggleBuildToMonitor = (buildId, isSelected) => {
    const monitoredBuilds = buildsToMonitor || [];
    const nextState = isSelected
      ? [...monitoredBuilds, buildId]
      : monitoredBuilds.filter((type) => type !== buildId);
    setBuildsToMonitor(nextState);
  };

  useEffect(() => {
    let timeoutId;
    let didUnmount = false;

    const getSetBuilds = () => {
      setIsLoading(true);
      clearTimeout(timeoutId);
      return getBuilds(buildsToMonitor)
        .then((nextBuilds) => {
          console.log(nextBuilds);
          if (didUnmount) return;
          if (nextBuilds) {
            setBuildsInfo(nextBuilds);
            setLastUpdate(Date.now());
          }
          setIsLoading(false);
          timeoutId = setTimeout(getSetBuilds, BUILDS_INTERVAL);
        })
        .catch(() => setIsLoading(false));
    };

    setIsLoading(true);
    getSetBuilds();

    return () => {
      didUnmount = true;
      clearTimeout(timeoutId);
    };
  }, [buildsToMonitor]);

  return (
    <div className={css.container}>
      <Header className={css.header} isLoading={isLoading} lastUpdate={lastUpdate} />
      <Builds
        className={css.buildsContainer}
        buildsInfo={buildsInfo}
        buildsToMonitor={buildsToMonitor}
      />
      <BuildsToMonitorForm
        selectedBuildTypes={buildsToMonitor}
        toggleBuildType={toggleBuildToMonitor}
      />
    </div>
  );
};
