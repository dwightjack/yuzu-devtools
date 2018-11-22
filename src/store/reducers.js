const componentInit = (state, { type, instance }) => {
  if (type === 'init') {
    return {
      ...state,
      tree: [...state.tree, instance],
    };
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

export default [componentInit, componentDestroy];
