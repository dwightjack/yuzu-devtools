const createActions = (store) => ({
  expandBranch(action) {
    store.action({ type: 'ui:expand', action });
  },
  removeTodo(action) {
    store.action({ type: 'hooks:destroy', action });
  },

  selectInstance(action) {
    store.action({ type: 'ui:select', action });
  },
});

export default createActions;
