import storage from './storage';

export default function createStore(initialState = {}, reducers = []) {
  const fns = [];

  function withStorage({ uiPersistState, ...state }) {
    const persist = { ...uiPersistState, ...storage.get('uiPersistState') };
    const keys = Object.keys(persist);
    if (keys.length === 0) {
      return { uiPersistState: persist, ...state };
    }
    const hydratedState = keys.reduce((acc, key) => {
      const v = storage.get(key);
      if (v !== undefined && v !== null) {
        acc[key] = v;
      }
      return acc;
    }, state);
    hydratedState.uiPersistState = persist;
    return hydratedState;
  }

  let state = withStorage(initialState);

  return {
    action(payload = {}) {
      const prevState = state;
      state = reducers.reduce((s, fn) => fn(s, payload), state);
      if (state !== prevState) {
        fns.forEach((fn) => fn(this.getState(), prevState, payload));
        Object.keys(state.uiPersistState).forEach((key) => {
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
