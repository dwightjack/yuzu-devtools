import { wire } from 'hyperhtml';
import cc from 'classcat';
import visibility from 'material-design-icons/action/svg/production/ic_visibility_24px.svg';
import AttrList from '../AttrList/AttrList';
import { noop } from '../utils';

import * as styles from './Instance.styles';

function TagOpen(props) {
  const { Component, uid, onSelect, attrs, watched } = props;
  const watchMark = watched
    ? wire(props, ':watched')`<span class="${
        styles.watchMark
      }" aria-label="Watching Component State">${{
        html: visibility,
      }}</span>`
    : '';
  return wire(props, ':uid')`<span
  class="${cc([styles.tag, { [styles.isWatched]: watched }])}"
  onclick="${() => onSelect({ uid })}"
  >${Component}${watchMark}${attrs}</span>`;
}

function TagClose(props) {
  return wire(props, ':uid')`<span
      class="${cc([styles.tag, { [styles.isWatched]: props.watched }])}"
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
      aria-expanded="${expanded}"
    ></button>`;
}

export default function Instance(props = {}) {
  const {
    Component,
    uid,
    childIds,
    onClick = noop,
    onSelect = noop,
    renderChild: Children = noop,
    expanded = false,
    selected = false,
    watched = false,
  } = props;

  const classes = [styles.root, { [styles.isSelected]: selected }];

  const tagOpen = TagOpen({
    Component,
    onSelect,
    uid,
    watched,
    attrs: AttrList(props),
  });

  if (Array.isArray(childIds) && childIds.length > 0) {
    classes.push({ [styles.isExpanded]: expanded });

    return wire(props, ':uid')`
     <div class="${cc(classes)}">
        ${ExpandBtn({ uid, onClick, expanded })}${tagOpen}
        <div class="${styles.childList}" hidden="${!expanded}">
          ${Children(childIds)}
        </div>
        ${TagClose({ Component, watched })}
      </div>`;
  }

  return wire(props, ':uid')`
    <div class="${cc(classes)}">
      ${tagOpen}
    </div>`;
}
