import { wire } from 'hyperhtml';
import Split from 'split-grid';

import * as styles from './Panels.styles';

const noop = () => {};

export default function Panels({ main = noop, side = noop, config = {} }) {
  const gutter = wire(config, ':gutter')`<div class="${styles.gutter}" />`;

  const onconnected = () => {
    Split({
      columnGutters: [
        {
          track: 1,
          element: gutter,
        },
      ],
    });
  };

  return wire(config, ':panels')`<div class="${
    styles.root
  }" onconnected="${onconnected}">
    <div class="${styles.main}">${main()}</div>
    ${gutter}
    <div class="${styles.side}">${side()}</div>
  <div>`;
}
