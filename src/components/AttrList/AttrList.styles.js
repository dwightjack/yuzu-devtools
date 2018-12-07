import { css } from 'emotion';

export const root = css`
  margin: 0 0.5em;
  color: var(--color-accent-ter);

  &[data-value]::after {
    content: '"' attr(data-value) '"';
    color: var(--color-accent);
  }
`;
