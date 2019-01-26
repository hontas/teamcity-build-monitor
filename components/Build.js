import React from 'react';
import classNames from 'classnames';
import { toRelative, toMinSec } from '../utils/relativeTime';

import css from './build.css';

const statuses = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};
const states = {
  RUNNING: 'running'
};

export default (build) => {
  const {
    webUrl,
    number,
    state,
    status,
    type,
    percentageComplete,
    buildType = {},
    finishDate,
    startDate,
    triggered,
    lastChanges
  } = build;

  const isRunning = state === states.RUNNING;
  const isSuccess = status === statuses.SUCCESS;
  const isFailure = status === statuses.FAILURE;
  const isUnknown = !isSuccess && !isFailure && !isRunning;
  const progressBarWidth = isRunning ? `${percentageComplete}%` : '100%';
  const triggeredBy = isRunning
    ? triggered[triggered.type]
      ? triggered[triggered.type].name
      : triggered.type
    : '';
  const changedBy = isRunning && lastChanges.change[0].username;
  const runInfo = isRunning && build['running-info'];

  return (
    <a
      href={webUrl}
      title={number}
      className={classNames(css.build, {
        [css.buildSuccess]: isSuccess,
        [css.buildError]: isFailure,
        [css.buildRunning]: isRunning,
        [css.buildUnknown]: isUnknown
      })}
      key={type}
    >
      <div className={css.buildTextContent}>
        <div className={css.buildTitle}>
          {`${buildType.projectName} / ${buildType.name} ${isRunning ? `- RUNNING` : ''}`}
        </div>
        {isRunning && <div className={css.buildTitle}>{runInfo.currentStageText}</div>}
        <p className={css.buildStatus}>
          {isRunning
            ? `${toRelative(startDate)}. Triggered by ${triggeredBy}. Last change by ${changedBy}`
            : `${isUnknown ? `${status} ` : ''}${toRelative(finishDate)}`}
        </p>
      </div>
      <div
        className={css.buildProgressBar}
        style={{
          width: progressBarWidth
        }}
      />
    </a>
  );
};
