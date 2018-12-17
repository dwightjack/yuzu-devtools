import { wire } from 'hyperhtml';
import cc from 'classcat';
import * as styles from './Prop.styles';
import { noop, parseValue } from '../utils';
import PropWatcher from '../PropWatcher/PropWatcher';

export default function Prop({
  key,
  uid,
  value,
  watchable = false,
  watched = false,
  onSelect = noop,
}) {
  const { type, value: val /* , inspectable = false */ } = parseValue(value);
  const typeStyle = type ? styles[`${type}Style`] : '';

  return wire(null, ':prop')`
    <div class="${styles.root}" data-prop>
      ${watchable ? PropWatcher({ uid, key, watched, onSelect }) : ''}
      <span class="${cc([
        styles.label,
        { [styles.labelFirst]: !watchable },
      ])}">${key}: </span><span class="${cc([
    styles.value,
    typeStyle,
  ])}">${val}</span>
    </div>
  `;
}
