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

export const row = css`
  display: flex;
  align-items: flex-start;
  padding: 0 var(--gutter) calc(var(--gutter) / 2);
  font-family: var(--font-monospace);
  font-size: var(--font-size-s);
  font-weight: normal;
`;

export const label = css`
  display: inline-block;
  padding-right: 0.5em;
  color: var(--color-accent-secondary);
  line-height: 1.5;
  flex-shrink: 1;
  flex-grow: 0;
`;

export const value = css`
  display: inline-block;
  font-family: var(--font-monospace);
  font-size: var(--font-size-s);
  font-weight: normal;
  line-height: 1.5;
  border: none;
  flex: 1 1 auto;
`;
