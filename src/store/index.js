import storage from './storage';

export default function createStore(
  initialState = {},
  reducers = [],
  persistKeys = [],
) {
  const fns = [];

  function withStorage(partialState) {
    return persistKeys.reduce((acc, key) => {
      const v = storage.get(key);
      if (v !== undefined && v !== null) {
        acc[key] = v;
      }
      return acc;
    }, partialState);
  }

  let state = withStorage(initialState);

  return {
    action(payload = {}) {
      const prevState = state;
      state = reducers.reduce((s, fn) => fn(s, payload), state);
      if (state !== prevState) {
        fns.forEach((fn) => fn(this.getState(), prevState, payload));
        persistKeys.forEach((key) => {
          if (state[key] !== prevState[key]) {
            storage.set(key, state[key]);
          }
        });
      }
    },

    getState() {
      return state;
    },

    resetState() {
      state = withStorage(initialState);
    },

    subscribe(fn) {
      fns.push(fn);
    },
  };
}
