import { render, html } from 'lit-html';

export const mockComponent = (tag) => (props) => {
  const el = document.createElement(tag);
  Object.keys(props).forEach((key) => {
    el.setAttribute(key, props[key]);
  });
  return el;
};

export function cycle() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

const cleanup = (wrapper) =>
  wrapper.querySelectorAll('style').forEach((style) => {
    style.remove();
  });

const toObject = (wrapper) => ({
  $root: wrapper,
  get html() {
    return wrapper.innerHTML;
  },
  find(selector) {
    return wrapper.querySelector(selector);
  },
  findAll(selector) {
    return wrapper.querySelectorAll(selector);
  },
});

export function toHTML(template, props = {}, raw = false) {
  const wrapper = document.createElement('div');

  Object.defineProperty(wrapper, 'isRoot', {
    value: true,
    enumerable: false,
  });

  if (props && typeof template === 'function') {
    // eslint-disable-next-line no-param-reassign
    template = template(props);
  }
  if (Array.isArray(template)) {
    render(
      html`
        ${template}
      `,
      wrapper,
    );
  } else {
    render(template, wrapper);
  }
  cleanup(wrapper);
  return raw ? wrapper : toObject(wrapper);
}

export function toHTMLAsync(template, props, raw = false) {
  const root = toHTML(template, props, true);
  return cycle().then(() => {
    cleanup(root);
    return raw ? root : toObject(root);
  });
}
