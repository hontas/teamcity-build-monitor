const LOCAL_STORAGE_KEY = 'teamcity-dashboard-v1';
const usedKeys = [];

export default (key) => {
  if (usedKeys.includes(key)) throw Error(`Key: ${key}, already in use`);
  const combinedKey = `${LOCAL_STORAGE_KEY}-${key}`;

  return {
    getItem() {
      let json;
      try {
        json = JSON.parse(window.localStorage.getItem(combinedKey));
      } catch (e) {
        console.error(e);
      }
      return json;
    },

    setItem(item) {
      return window.localStorage.setItem(combinedKey, JSON.stringify(item));
    }
  };
};
