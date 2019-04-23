import { html } from 'lit-html';
import { useEffect } from 'haunted';
import Split from 'split-grid';

import * as styles from './Panels.styles';

const noop = () => {};

export default function Panels({ main = noop, side = noop }) {
  const gutter = html`
    <div class="${styles.gutter}"></div>
  `;

  useEffect(() => {
    Split({
      columnGutters: [
        {
          track: 1,
          element: gutter,
        },
      ],
    });
  }, []);

  return html`
    <div class="${styles.root}">
      <div class="${styles.main}">${main()}</div>
      ${gutter}
      <div class="${styles.side}">${side()}</div>
      <div></div>
    </div>
  `;
}
