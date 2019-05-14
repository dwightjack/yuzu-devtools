// If the users blocks 3rd party cookies and storage,
// localStorage will throw.
// see https://raw.githubusercontent.com/vuejs/vue-devtools/f46c608120ce9dea01c92ff7fc23673e14d42ceb/src/storage.js
export default {
  // eslint-disable-next-line
  toKey(key) {
    return `yzdt:${key}`;
  },
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(this.toKey(key)));
    } catch (e) {} // eslint-disable-line
    return undefined;
  },
  set(key, val) {
    try {
      localStorage.setItem(this.toKey(key), JSON.stringify(val));
    } catch (e) {} // eslint-disable-line
  },
  remove(key) {
    try {
      localStorage.removeItem(this.toKey(key));
    } catch (e) {} // eslint-disable-line
  },
  clear() {
    try {
      localStorage.clear();
    } catch (e) {} // eslint-disable-line
  },
};
