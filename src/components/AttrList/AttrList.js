import { html, nothing } from 'lit-html';
import { component } from 'haunted';

const ATTRS = ['ref', 'detached'];

export default function AttrList(props) {
  return ATTRS.map((attr) => {
    const val = props[attr];
    const bool = typeof val === 'boolean' ? '' : val;
    // prettier-ignore
    return val
      ? html`
        <style>
        span {
          display: inline-block;
          color: var(--color-accent-ter);
        }
        b {
          color: var(--color-accent);
          font-weight: normal;
        }
        </style>
        <span>
        ${attr}${bool ? html`=<b>"${val}"</b>` : nothing}
        </span>`
      : nothing;
  }).filter((x) => x);
}

AttrList.observedAttributes = ATTRS;

AttrList.ATTRS = ATTRS;

customElements.define('yzdt-attrs', component(AttrList));
