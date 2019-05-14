const hooksInit = (state, { type, action }) => {
  if (type === 'hooks:init') {
    const { roots } = state;

    const tree = {
      ...state.tree,
      [action.uid]: Object.assign({}, state.tree[action.uid], action),
    };

    const treeCount = Object.keys(tree).length;

    if (action.parent) {
      const parent = tree[action.parent] || {};

      tree[action.parent] = {
        ...parent,
        childIds: (parent.childIds || []).concat(action.uid),
      };

      return {
        ...state,
        tree,
        treeCount,
      };
    }
    return {
      ...state,
      roots: [...roots, action.uid],
      tree,
      treeCount,
    };
  }
  return state;
};

const hooksState = (state, { type, action }) => {
  if (type === 'hooks:statechange') {
    const { uid } = action;
    const tree = { ...state.tree };
    tree[uid] = {
      ...tree[uid],
      state: action.state,
    };

    return {
      ...state,
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
    const treeCount = Object.keys(tree).length;

    if (roots.includes(uid)) {
      return {
        ...state,
        tree,
        treeCount,
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
      treeCount,
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
    case 'ui:watchstate': {
      const { uid, key, watched } = action;
      let watchers = [...state.watchers];
      const hash = `${uid}:${key}`;

      const idx = watchers.indexOf(hash);

      if (!watched && idx !== -1) {
        watchers.splice(idx, 1);

        return {
          ...state,
          watchers,
        };
      }

      if (watched && idx !== -1) {
        // already watching
        return state;
      }

      if (key === '*') {
        // remove all key watchers from the same uid
        watchers = watchers.filter((h) => h.startsWith(`${uid}:`) === false);
      }

      watchers.push(hash);

      return {
        ...state,
        watchers,
      };
    }

    case 'ui:select':
      return {
        ...state,
        uiSelectedInstance: action.uid,
      };
    case 'ui:inspect': {
      const { tree } = state;
      const { uid } = action;
      let { parent } = tree[uid];
      while (parent) {
        tree[parent] = { ...tree[parent], expanded: true };
        ({ parent } = tree[parent]);
      }
      return {
        ...state,
        tree: { ...tree },
        uiSelectedInstance: uid,
      };
    }
    case 'ui:persiststate': {
      const uiPersistState = { ...state.uiPersistState };
      Object.entries(action).forEach(([key, value]) => {
        if (!value) {
          delete uiPersistState[key];
        } else {
          uiPersistState[key] = !!value;
        }
      });
      return {
        ...state,
        uiPersistState,
      };
    }

    default:
      return state;
  }
};

export default [hooksInit, hooksDestroy, ui, hooksState];
