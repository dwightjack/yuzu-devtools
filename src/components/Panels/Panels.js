import { html } from 'lit-html';
import { useEffect, virtual } from 'haunted';
import Split from 'split-grid';

import * as styles from './Panels.styles';

const noop = () => {};

function Panels({ main = noop, side = noop }) {
  const gutter = document.createElement('div');
  gutter.className = styles.gutter;

  useEffect(
    () => {
      Split({
        columnGutters: [
          {
            track: 1,
            element: gutter,
          },
        ],
      });
    },
    [gutter],
  );

  return html`
    <div class="${styles.root}">
      <div class="${styles.main}">${main()}</div>
      ${gutter}
      <div class="${styles.side}">${side()}</div>
      <div></div>
    </div>
  `;
}

export default virtual(Panels);
