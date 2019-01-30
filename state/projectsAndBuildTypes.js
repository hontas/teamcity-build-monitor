import { useState } from 'react';
import scopedLocalStorage from '../utils/localStorage';

const ls = scopedLocalStorage('projectsAndBuildTypes');
const stored = ls.getItem() || undefined;

export default () => {
  const [state, setState] = useState(stored);
  return [
    state,
    (update) => {
      setState(update);
      ls.setItem(update);
    }
  ];
};
