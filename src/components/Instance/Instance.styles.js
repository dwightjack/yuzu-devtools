import { css } from 'emotion';

export const root = css`
  color: rgb(136, 136, 136);
  font-size: 0.75rem;
  white-space: nowrap;

  & > & {
    padding-left: 1em;
  }
`;

export const tag = css`
  color: rgb(136, 18, 128);
`;
