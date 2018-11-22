export default function createStore(initialState = {}, reducers = []) {
  let state = initialState;

  return {
    updateState(action) {
      state = reducers.reduce((s, fn) => fn(s, action), state);
    },

    getState() {
      return state;
    },

    resetState() {
      state = initialState;
    },
  };
}
