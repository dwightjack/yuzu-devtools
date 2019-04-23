import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import visibility from 'material-design-icons/action/svg/production/ic_visibility_24px.svg';
import { noop } from '../utils';
import * as styles from './PropWatcher.styles';

export default function Watcher(props) {
  const { uid, key, watched = false, onSelect = noop } = props;

  return html`
    <label class="${styles.root}" title="Watch changes">
      <input
        type="checkbox"
        ?checked="${watched}"
        @click="${() => onSelect(uid, key, !watched)}"
        value="${`${uid}:${key}`}"
        class="${styles.input}"
      />
      ${unsafeHTML(visibility)}
    </label>
  `;
}
