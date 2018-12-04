import { wire } from 'hyperhtml';
import visibility from 'material-design-icons/action/svg/production/ic_visibility_24px.svg';
import { noop } from '../utils';
import * as styles from './PropWatcher.styles';

export default function Watcher(props) {
  const { uid, key, watched = false, onSelect = noop } = props;

  return wire(props, ':watcher')`<label
    class="${styles.root}"
    title="Watch changes"
    >
    <input
      type="checkbox"
      checked="${watched}"
      onclick="${() => onSelect(uid, key, !watched)}"
      value="${`${uid}:${key}`}"
      class="${styles.input}"
    >
    ${{ html: visibility }}
  </label>
  `;
}
