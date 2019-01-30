import { useState } from 'react';
import scopedLocalStorage from '../utils/localStorage';

const ls = scopedLocalStorage('lastUpdated');
const stored = ls.getItem() || undefined;

export default () => {
  const [lastUpdate, setLastUpdated] = useState(stored);
  return [
    lastUpdate,
    (update) => {
      setLastUpdated(update);
      ls.setItem(update);
    }
  ];
};
