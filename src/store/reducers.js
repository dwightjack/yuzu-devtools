const hooksInit = (state, { type, action }) => {
  if (type === 'hooks:init') {
    const { roots } = state;

    const tree = {
      ...state.tree,
      [action.uid]: action,
    };

    if (action.parent && tree[action.parent]) {
      const parent = tree[action.parent];

      tree[action.parent] = {
        ...tree[action.parent],
        childIds: (parent.childIds || []).concat(action.uid),
      };

      return {
        ...state,
        tree,
      };
    }
    return {
      ...state,
      roots: [...roots, action.uid],
      tree,
    };
  }
  return state;
};

const hooksDestroy = (state, { type, action }) => {
  if (type === 'hooks:destroy') {
    const { roots } = state;
    const { uid } = action;

    const tree = { ...state.tree };

    delete tree[uid];

    if (roots.includes(uid)) {
      return {
        ...state,
        tree,
        roots: roots.filter((id) => id !== uid),
      };
    }

    Object.keys(tree).some((key) => {
      const inst = tree[key];
      if (inst.childIds && inst.childIds.includes(uid)) {
        tree[key] = {
          ...inst,
          childIds: inst.childIds.filter((id) => id !== uid),
        };
        return true;
      }
      return false;
    });

    return {
      ...state,
      tree,
    };
  }
  return state;
};

const ui = (state, { type, action }) => {
  switch (type) {
    case 'ui:expand': {
      const { uid, expanded } = action;
      const inst = { ...state.tree[uid], expanded };

      return {
        ...state,
        tree: {
          ...state.tree,
          [uid]: inst,
        },
      };
    }
    default:
      return state;
  }
};

export default [hooksInit, hooksDestroy, ui];
