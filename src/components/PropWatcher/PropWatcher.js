import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { component } from 'haunted';
import visibility from 'material-design-icons/action/svg/production/ic_visibility_24px.svg';
import { noop } from '../utils';
// import * as styles from './PropWatcher.styles';

export default function Watcher(props) {
  const { uid, key, watched = false, onToggle = noop } = props;

  return html`
    <style>
      :host {
        position: relative;
        display: inline-block;
        margin: -0.5em;
        margin-right: -0.4em;
        padding: 0.5em;
        box-sizing: content-box;
      }
      label {
        cursor: pointer;
      }
      svg {
        visibility: hidden;
        width: 1.25em;
        height: 1.5em;
        fill: var(--color-quiet);
        vertical-align: middle;
      }

      :hover > svg {
        visibility: visible;
      }

      input {
        position: absolute;
        overflow: hidden;
        width: 1px;
        height: 1px;
        padding: 0;
        white-space: nowrap;
        border: 0;
        clip-path: inset(50%);
      }

      input:checked + svg {
        visibility: visible;
        fill: var(--color-accent-secondary);
      }
    </style>
    <label title="Watch changes">
      <input
        type="checkbox"
        ?checked="${watched}"
        @click="${() => onToggle(uid, key, !watched)}"
        value="${`${uid}:${key}`}"
      />
      ${unsafeHTML(visibility)}
    </label>
  `;
}

Watcher.observedAttributes = ['watched', 'uid', 'key'];

customElements.define('yzdt-watcher', component(Watcher));
