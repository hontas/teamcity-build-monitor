const LOCAL_STORAGE_KEY = 'teamcity-dashboard-v1';

export function setItem(item) {
  return window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(item));
}

export function getItem() {
  let json;
  try {
    json = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch (e) {
    console.error(e);
  }
  return json;
}
