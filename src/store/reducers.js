const componentInit = (state, { type, instance }) => {
  if (type === 'init') {
    return {
      ...state,
      byIds: {
        ...state.byIds,
        [instance.uid]: instance,
      },
      tree: [...state.tree, instance],
    };
  }
  return state;
};

const reference = (state, { type, instance }) => {
  if (type === 'ref') {
    const { parent, child } = instance;
    const { tree, byIds } = state;
    // find the child
    const childInst = byIds[child];
    const parentInst = byIds[parent];
    if (childInst && parentInst) {
      parentInst.children = (parentInst.children || []).concat(childInst);
      // remove the child from the main tree
      return {
        ...state,
        tree: tree.filter(({ uid }) => uid !== child),
      };
    }
  }
  return state;
};

const componentDestroy = (state, { type, instance }) => {
  if (type === 'destroy') {
    return {
      ...state,
      tree: state.tree.filter(({ uid }) => uid !== instance.uid),
    };
  }
  return state;
};

export default [componentInit, componentDestroy, reference];
