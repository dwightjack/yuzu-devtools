import { wire } from 'hyperhtml';
import * as styles from './MainPanel.styles';

export default function MainPanel({ ctx, render }) {
  return wire(ctx, ':main')`
    <div class="${styles.root}">${render(ctx)}</div>
  `;
}
