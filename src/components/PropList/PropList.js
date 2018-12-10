import { wire } from 'hyperhtml';
import Prop from '../Prop/Prop';
import PropWatcher from '../PropWatcher/PropWatcher';
import { noop } from '../utils';
import * as styles from './PropList.styles';

const empty = (keys) => wire(keys)`<p class="${styles.empty}">empty object</p>`;

export default function PropList({
  uid,
  title = '',
  onSelect = noop,
  props = {},
  watchers = [],
  watchable = false,
}) {
  const keys = Object.keys(props);
  const list =
    keys.length > 0
      ? keys.map((key) => {
          return Prop({
            key,
            uid,
            watchable,
            value: props[key],
            onSelect,
            watched: watchable && watchers.includes(`${uid}:${key}`),
          });
        })
      : empty(keys);

  const globalWatcher =
    keys.length && watchable
      ? PropWatcher({
          watched: watchers.includes(`${uid}:*`),
          uid,
          onSelect,
          key: '*',
        })
      : '';

  return wire(props)`
    <section class="${styles.root}">
      <h3 class="${styles.title}"><span>${title}</span>${globalWatcher}</h3>
      ${list}
    </section>
  `;
}
