import { html } from 'lit-html';
import * as styles from './AttrList.styles';

const ATTRS = ['ref', 'detached'];

export default function AttrList(props) {
  return ATTRS.map((attr) => {
    const val = props[attr];
    const bool = typeof val === 'boolean' ? null : val;
    return val
      ? html`
          <span class="${styles.root}" data-value="${bool}"
            >${attr + (bool ? '=' : '')}</span
          >
        `
      : null;
  }).filter((x) => x);
}

AttrList.ATTRS = ATTRS;
