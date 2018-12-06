export const getSidePanelData = (state = {}) => {
  const { uiSelectedInstance, tree, watchers } = state;

  if (!uiSelectedInstance) {
    return {};
  }
  const baseObj = { ...tree[uiSelectedInstance] };

  baseObj.state = baseObj.state && JSON.parse(baseObj.state);
  baseObj.options = baseObj.options && JSON.parse(baseObj.options);

  return {
    watchers: watchers.filter((w) => w.startsWith(`${uiSelectedInstance}:`)),
    ...baseObj,
  };
};

export const hasWatchers = (state, uid) =>
  state.watchers.some((hash) => hash.startsWith(`${uid}:`));

export const selectInstance = (state, uid) => {
  return {
    ...(state.tree[uid] || {}),
    selected: uid === state.uiSelectedInstance,
    watched: hasWatchers(state, uid),
  };
};
