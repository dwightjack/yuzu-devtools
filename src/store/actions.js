const createActions = (store) => ({
  expandBranch(action) {
    store.action({ type: 'ui:expand', action });
  },
  removeChild(action) {
    store.action({ type: 'hooks:destroy', action });
  },

  updateState(action) {
    store.action({ type: 'hooks:statechange', action });
  },

  selectInstance(action) {
    store.action({ type: 'ui:select', action });
  },
  toggleLogger(action) {
    store.action({ type: 'ui:logstate', action });
  },
});

export default createActions;
