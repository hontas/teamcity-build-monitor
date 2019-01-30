import React from 'react';
import classNames from 'classnames';

import { toRelative } from '../utils/relativeTime';
import css from './header.css';

export default ({ className, isLoading, lastUpdate }) => {
  return (
    <header className={classNames(className, css.wrapper)}>
      <h1 className={css.heading}>Websteros dashboard</h1>
      {isLoading && <p>loading build data...</p>}
      {lastUpdate && <p className={css.updatedAt}>updated {toRelative(lastUpdate)}</p>}
    </header>
  );
};
