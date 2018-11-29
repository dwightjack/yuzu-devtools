export default function createStore(initialState = {}, reducers = []) {
  let state = initialState;

  const fns = [];

  return {
    action(payload = {}) {
      const prevState = state;
      state = reducers.reduce((s, fn) => fn(s, payload), state);
      if (state !== prevState) {
        fns.forEach((fn) => fn(this.getState()));
      }
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
