export const mockComponent = (tag) => (props) => {
  const el = document.createElement(tag);
  Object.keys(props).forEach((key) => {
    el.setAttribute(key, props[key]);
  });
  return el;
};
