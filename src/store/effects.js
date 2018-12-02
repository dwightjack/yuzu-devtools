import difference from 'lodash/difference';

export const createEffects = (hooksExec) => ({
  'ui:logstate': function logState(state, prevState) {
    const removed = difference(prevState.logs, state.logs);
    const added = difference(state.logs, prevState.logs);
    if (removed.length > 0) {
      removed.forEach((uid) => hooksExec(`logEnd`, uid));
    }

    if (added.length > 0) {
      added.forEach((uid) => hooksExec(`logStart`, uid));
    }
  },

  'ui:select': function uiSelect({ uiSelectedInstance }) {
    hooksExec(`setGlobal`, uiSelectedInstance);
  },
});

export const match = (effects) => (state, prevState, { type } = {}) => {
  if (type && effects[type]) {
    effects[type](state, prevState);
  }
};
