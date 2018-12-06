import { wire } from 'hyperhtml';
import cc from 'classcat';
import visibility from 'material-design-icons/action/svg/production/ic_visibility_24px.svg';
import * as styles from './Instance.styles';

const noop = () => {};

const ATTRS = ['ref', 'detached'];

function renderAttrs(props) {
  return ATTRS.map((attr) => {
    const val = props[attr];
    const bool = typeof val === 'boolean' ? null : val;
    return val
      ? wire(props)`<span class="${
          styles.attribute
        }" data-value="${bool}">${attr + (bool ? '=' : '')}</span>`
      : null;
  }).filter((x) => x);
}

function TagOpen(props) {
  const { Component, uid, onSelect, attrs, watched, ctx } = props;
  const watchMark = watched
    ? wire(props, ':watched')`<span class="${styles.watchMark}">${{
        html: visibility,
      }}</span>`
    : '';
  return wire(props, ':uid')`<span
  class="${styles.tag}"
  onclick="${() => onSelect({ uid })}"
  >${Component}${watchMark}${attrs}</span>`;
}

function TagClose(props) {
  return wire(props, ':uid')`<span
      class="${styles.tag}"
    >${props.Component}</span>`;
}

function ExpandBtn(props) {
  const { onClick, expanded, uid } = props;
  return wire(props, ':expanded')`
    <button
      type="button"
      class="${cc([styles.expander, { [styles.isExpanderActive]: expanded }])}"
      onclick="${() => onClick({ uid, expanded: !expanded })}"
      aria-label="Expand / collapse children"
    ></button>`;
}

export default function Instance(props = {}) {
  const {
    Component,
    childIds,
    expanded = false,
    onClick = noop,
    onSelect = noop,
    renderChild: Children = noop,
    selected = false,
    watched = false,
    ctx = {},
    uid,
  } = props;

  const classes = [
    styles.root,
    { [styles.isSelected]: selected, [styles.isWatched]: watched },
  ];

  const tagOpen = TagOpen({
    Component,
    onSelect,
    uid,
    watched,
    attrs: renderAttrs(props),
  });

  if (Array.isArray(childIds) && childIds.length > 0) {
    classes.push({ [styles.isExpanded]: expanded });

    return wire(ctx, ':uid')`
     <div class="${cc(classes)}">
        ${ExpandBtn({ uid, onClick, expanded })}${tagOpen}
        <div class="${styles.childList}" hidden="${!expanded}">
          ${Children(childIds)}
        </div>
        ${TagClose({ Component })}
      </div>`;
  }

  return wire(ctx, ':uid')`
    <div class="${cc(classes)}">
      ${tagOpen}
    </div>`;
}
