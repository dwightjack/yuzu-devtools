import difference from 'lodash-es/difference';
import storage from './storage';

export const createEffects = (hooksExec) => ({
  'ui:watchstate': function logState(state, prevState) {
    const removed = difference(prevState.watchers, state.watchers);
    const added = difference(state.watchers, prevState.watchers);
    if (removed.length > 0) {
      removed.forEach((watchHash) => hooksExec(`logEnd`, watchHash));
    }

    if (added.length > 0) {
      added.forEach((watchHash) => hooksExec(`logStart`, watchHash));
    }
  },

  'ui:persiststate': function watchersStorage(state, _, payload = {}) {
    Object.entries(payload).forEach(([key, value]) => {
      if (value) {
        storage.set(key, state[key]);
      } else {
        storage.remove(key);
      }
    });
    storage.set('uiPersistState', state.uiPersistState);
  },

  'hooks:init': function hooksInit({ watchers }, prev, { uid }) {
    const match = uid && `${uid}:`;
    if (!match) {
      return;
    }
    watchers.forEach((hash) => {
      if (hash.startsWith(match)) {
        // requestAnimationFrame(() => {
        //   requestAnimationFrame(() => {
        //   });
        // });
        hooksExec(`logStart`, hash);
      }
    });
  },

  'ui:select': function uiSelect({ uiSelectedInstance }) {
    hooksExec(`setGlobal`, uiSelectedInstance);
    hooksExec(`setCurrent`, uiSelectedInstance);
  },

  'yuzu:panel-hidden': function hidePanel() {
    hooksExec(`stop`);
  },
});

export const match = (effects) => (state, prevState, { type, action } = {}) => {
  if (type && effects[type]) {
    effects[type](state, prevState, action);
  }
};
