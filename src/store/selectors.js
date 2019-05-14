function extract(obj, key) {
  const val = obj[key];
  try {
    return JSON.parse(val);
  } catch (e) {
    console.warn(`Unable to parse key ${key}`, e); // eslint-disable-line no-console
  }
  return val;
}

export const getElementPanelData = (state = {}) => {
  const { uiSelectedInstance, tree, watchers } = state;

  if (!uiSelectedInstance) {
    return {};
  }
  const baseObj = { ...tree[uiSelectedInstance] };

  baseObj.state = extract(baseObj, 'state');
  baseObj.options = extract(baseObj, 'options');

  return {
    watchers: watchers.filter((w) => w.startsWith(`${uiSelectedInstance}:`)),
    ...baseObj,
  };
};

export const getWatchersPanelData = (state = {}) => {
  const { watchers = [], tree = {} } = state;
  let total = 0;
  const data = watchers.sort().reduce((acc, hash) => {
    const [uid, key] = hash.split(':');
    if (!tree[uid]) {
      return acc;
    }
    if (!acc[uid]) {
      const { Component } = tree[uid] || {};
      acc[uid] = { keys: [], name: Component, uid };
    }
    acc[uid].keys.push(key);
    total += 1;
    return acc;
  }, {});
  return {
    watchers: Object.values(data),
    total,
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
