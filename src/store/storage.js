// If the users blocks 3rd party cookies and storage,
// localStorage will throw.
// see https://raw.githubusercontent.com/vuejs/vue-devtools/f46c608120ce9dea01c92ff7fc23673e14d42ceb/src/storage.js
export default {
  // eslint-disable-next-line
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {} // eslint-disable-line
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {} // eslint-disable-line
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {} // eslint-disable-line
  },
  clear() {
    try {
      localStorage.clear();
    } catch (e) {} // eslint-disable-line
  },
};
