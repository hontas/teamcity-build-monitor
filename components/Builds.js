import React from 'react';
import Build from './Build';

export default ({ className, buildsInfo, buildsToMonitor = [] }) => {
  if (!buildsInfo) return null;
  const filteredBuilds = Object.entries(buildsInfo).filter(([type]) =>
    buildsToMonitor.includes(type)
  );
  return (
    <div className={className}>
      {filteredBuilds.map(([type, props]) => (
        <Build key={type} {...props} />
      ))}
    </div>
  );
};
