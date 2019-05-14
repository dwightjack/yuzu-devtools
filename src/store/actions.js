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

  inspectInstance(action) {
    store.action({ type: 'ui:inspect', action });
  },
  toggleWatcher(action) {
    store.action({ type: 'ui:watchstate', action });
  },
  updatePersistState(action) {
    store.action({ type: 'ui:persiststate', action });
  },
});

export default createActions;
