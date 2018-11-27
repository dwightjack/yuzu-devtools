import { wire } from 'hyperhtml';
import cc from 'classcat';
import * as styles from './Instance.styles';

const noop = () => {};

export default function Instance(props = {}) {
  const {
    Component,
    childIds,
    expanded = false,
    onClick = noop,
    renderChild = noop,
    uid,
  } = props;
  const classes = [styles.root];

  const tagStart = wire(props, ':uid')`<span class="${
    styles.tag
  }">${Component}</span>`;
  const tagEnd = wire(props, ':uid')`<span class="${
    styles.tag
  }">${Component}</span>`;

  const expander = wire(props, ':expanded')`
    <button 
      type="button"
      class="${styles.expander}"
      onclick="${() => onClick({ uid, expanded: !expanded })}" 
      aria-label="Expand / collapse children"
    >${expanded ? '▼' : '▶'}</button>`;

  if (Array.isArray(childIds) && childIds.length > 0) {
    classes.push({ [styles.isExpanded]: expanded });

    return wire(props)`
     <div class="${cc(classes)}">
        ${expander}${tagStart}
        <div class="${styles.childList}" hidden="${!expanded}">
          ${renderChild(childIds)}
        </div>
        ${tagEnd}
      </div>`;
  }

  return wire(props)`
    <div class="${cc(classes)}">
      ${tagStart}
    </div>`;
}
