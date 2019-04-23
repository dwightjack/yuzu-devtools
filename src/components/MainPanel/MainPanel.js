import { html } from 'lit-html';
import * as styles from './MainPanel.styles';

export default function MainPanel({ ctx, render }) {
  return html`
    <div class="${styles.root}">${render(ctx)}</div>
  `;
}
