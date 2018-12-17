import { css } from 'emotion';

export const root = css`
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

export const labelFirst = css`
  padding-left: 1.4em;
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

export const stringStyle = css`
  &::after,
  &::before {
    content: '\\0022';
    display: inline-block;
  }
`;

export const inspect = css`
  padding: 0;
  border: 0;
  color: var(--color-quiet);
  visibility: hidden;

  [data-prop]:hover & {
    visibility: visible;
  }
`;
