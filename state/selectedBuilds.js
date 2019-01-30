import { useState } from 'react';
import scopedLocalStorage from '../utils/localStorage';

const ls = scopedLocalStorage('selectedBuildTypes');
const storedTypes = ls.getItem() || undefined;

export default () => {
  const [selectedBuilds, setSelected] = useState(storedTypes);
  return [
    selectedBuilds,
    (selected) => {
      setSelected(selected);
      ls.setItem(selected);
    }
  ];
};
