import { css } from 'emotion';

export const title = css`
  margin: 0;
  padding: 8px var(--gutter);
  font-size: var(--font-size-l);
  font-weight: bold;
  line-height: 1.2;
  background-color: var(--color-lighter);

  & > em {
    font-size: 0.75em;
  }
`;

export const blankSlate = css`
  margin: 0;
  padding: var(--gutter);
  color: var(--color-quiet);
  font-size: var(--font-size-m);
  font-style: italic;
`;
