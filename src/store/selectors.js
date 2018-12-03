export const getSidePanelData = (state = {}) => {
  const { uiSelectedInstance, tree, logs } = state;

  if (!uiSelectedInstance) {
    return {};
  }
  const baseObj = { ...tree[uiSelectedInstance] };

  baseObj.state = baseObj.state && JSON.parse(baseObj.state);
  baseObj.options = baseObj.options && JSON.parse(baseObj.options);

  return {
    logged: logs.includes(uiSelectedInstance),
    ...baseObj,
  };
};
