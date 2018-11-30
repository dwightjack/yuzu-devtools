import { css } from 'emotion';

export const root = css`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr 6px 0.5fr;
  grid-template-rows: 1fr 6px 0px;
  grid-template-areas: 'main gutter side';
`;

export const main = css`
  grid-area: main;
  border-right: 1px solid var(--color-light);
`;
export const side = css`
  grid-area: side;
  border-left: 1px solid var(--color-light);
`;

export const gutter = css`
  grid-area: gutter;
  background: var(--color-lighter);
  background-image: linear-gradient(
    to top,
    var(--color-quiet),
    var(--color-quiet)
  );
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 2px 30px;
`;