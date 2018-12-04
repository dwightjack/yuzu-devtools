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
