import { css } from 'emotion';

export const root = css`
  & + & {
    margin-top: var(--gutter);
    border-top: 1px solid var(--color-light);
  }
`;

export const title = css`
  margin: var(--gutter);
  font-size: var(--font-size-m);
  font-weight: bold;
  line-height: 1.2;
`;

export const empty = css`
  margin: 0;
  padding: 0 var(--gutter);
  color: var(--color-quiet);
  font-size: var(--font-size-m);
  font-style: italic;
`;
