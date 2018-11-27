import { wire } from 'hyperhtml';
import cc from 'classcat';
import * as styles from './Instance.styles';

const noop = () => {};

export default function Instance(props = {}) {
  const { Component, children, expanded = false, onClick = noop } = props;
  const classes = [styles.root];

  if (Array.isArray(children) && children.length > 0) {
    classes.push({ [styles.isExpanded]: expanded });

    return wire(props)`
     <div class="${cc(classes)}">
        <button 
          type="button"
          class="${styles.expander}"
          onclick="${() => onClick(props)}" 
          aria-label="Expand / collapse children"
        >${expanded ? '▼' : '▶'}
        </button
        ><span class="${styles.tag}">${Component}</span>
        <div class="${styles.childList}" hidden="${!expanded}">
          ${children.map((child) => Instance({ ...child, onClick }))}
        </div>
        <span class="${styles.tag}">${Component}</span>
      </div>`;
  }

  return wire(props)`
    <div class="${cc(classes)}">
      <span class="${styles.tag}">${Component}</span>
    </div>`;
}
