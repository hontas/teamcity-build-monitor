import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Build from '../components/Build';
import { getBuilds } from '../utils/builds';
import './base.css';
import css from './index.css';

const localStorageKey = 'dashboard.builds';

export default () => {
  const [builds, setBuilds] = useState(null);

  useEffect(() => {
    let timeoutId;
    let cancelUpdate;
    const getSetBuilds = () =>
      getBuilds().then((nextBuilds) => {
        if (cancelUpdate) return;
        setBuilds(nextBuilds);
        window.localStorage.setItem(localStorageKey, JSON.stringify(nextBuilds));
        timeoutId = setTimeout(getSetBuilds, 5000);
      });

    try {
      setBuilds(JSON.parse(window.localStorage.getItem(localStorageKey)));
    } catch (e) {
      console.warn(e);
    }
    getSetBuilds();
    return () => {
      cancelUpdate = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={css.container}>
      <header>
        <h1 className={css.heading}>Websteros dashboard</h1>
      </header>
      <div className={css.buildsContainer}>
        {builds && Object.entries(builds).map(([type, props]) => <Build key={type} {...props} />)}
      </div>
    </div>
  );
};
