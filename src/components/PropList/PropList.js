import { wire } from 'hyperhtml';
import Prop from '../Prop/Prop';
import * as styles from './PropList.styles';

const empty = (keys) => wire(keys)`<p class="${styles.empty}">empty object</p>`;

export default function PropList({ title = '', props = {} }) {
  const keys = Object.keys(props);
  const list =
    keys.length > 0
      ? keys.map((key) => Prop({ key, value: props[key] }))
      : empty(keys);

  return wire(props)`
    <section class="${styles.root}">
      <h3 class="${styles.title}">${title}</h3>
      ${list}
    </section>
  `;
}
