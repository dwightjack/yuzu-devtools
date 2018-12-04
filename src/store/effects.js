import difference from 'lodash/difference';

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

  'ui:select': function uiSelect({ uiSelectedInstance }) {
    hooksExec(`setGlobal`, uiSelectedInstance);
    hooksExec(`setCurrent`, uiSelectedInstance);
  },
});

export const match = (effects) => (state, prevState, { type } = {}) => {
  if (type && effects[type]) {
    effects[type](state, prevState);
  }
};
