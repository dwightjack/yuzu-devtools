const componentInit = (state, { type, instance }) => {
  if (type === 'init') {
    let { tree } = state;
    // check for a parent
    if (instance.parent && state.byId[instance.parent]) {
      const parent = state.byId[instance.parent];
      parent.children = (parent.children || []).concat(instance);
    } else {
      tree = [...tree, instance];
    }
    return {
      ...state,
      byId: {
        ...state.byId,
        [instance.uid]: instance,
      },
      tree,
    };
  }
  return state;
};

const componentDestroy = (state, { type, instance }) => {
  if (type === 'destroy') {
    let { tree, byId } = state;
    if (instance.parent && byId[instance.parent]) {
      const parent = byId[instance.parent];
      parent.children = parent.children.filter(
        ({ uid }) => uid !== instance.uid,
      );
      byId = Object.assign({}, byId);
      byId[instance.uid] = undefined;
    } else {
      tree = tree.filter(({ uid }) => uid !== instance.uid);
    }
    return {
      ...state,
      byId,
      tree,
    };
  }
  return state;
};

export default [componentInit, componentDestroy];
