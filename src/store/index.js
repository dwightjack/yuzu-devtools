export default function createStore(initialState = {}, reducers = []) {
  let state = initialState;

  const fns = [];

  return {
    action(payload = {}) {
      state = reducers.reduce((s, fn) => fn(s, payload), state);
      fns.forEach((fn) => fn(this.getState()));
    },

    getState() {
      return state;
    },

    resetState() {
      state = initialState;
    },

    subscribe(fn) {
      fns.push(fn);
    },
  };
}
