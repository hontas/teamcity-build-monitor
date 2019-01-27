import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Build from '../components/Build';
import { getBuilds } from '../utils/builds';
import { toRelative } from '../utils/relativeTime';
import * as localStorage from '../utils/localStorage';
import './base.css';
import css from './index.css';

export default () => {
  const [builds, setBuilds] = useState(null);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    let timeoutId;
    let didUnmount = false;
    const getSetBuilds = () =>
      getBuilds().then((nextBuilds) => {
        if (didUnmount) return;
        if (nextBuilds) {
          const updated = Date.now();
          setBuilds(nextBuilds);
          setLastUpdate(updated);
          localStorage.setItem({
            builds: nextBuilds,
            lastUpdate: updated
          });
        }
        timeoutId = setTimeout(getSetBuilds, 5000);
      });

    const state = localStorage.getItem();
    if (state) {
      if (state.builds) setBuilds(state.builds);
      if (state.lastUpdate) setLastUpdate(state.lastUpdate);
    }

    getSetBuilds();

    return () => {
      didUnmount = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1 className={css.heading}>Websteros dashboard</h1>
        {lastUpdate && <p className={css.updatedAt}>updated {toRelative(lastUpdate)}</p>}
      </header>
      <div className={css.buildsContainer}>
        {builds && Object.entries(builds).map(([type, props]) => <Build key={type} {...props} />)}
      </div>
    </div>
  );
};
