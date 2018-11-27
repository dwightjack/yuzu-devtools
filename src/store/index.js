export default function createStore(initialState = {}, reducers = []) {
  let state = initialState;

  const fns = [];

  return {
    updateState(action) {
      state = reducers.reduce((s, fn) => fn(s, action), state);
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
