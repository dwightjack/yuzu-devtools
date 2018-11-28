import { css } from 'emotion';

export const root = css`
  color: var(--color-quiet);
  font-size: var(--font-size-m);
  padding-left: 1rem;
  line-height: 1.5em;
`;

export const childList = css``;

export const expander = css`
  display: inline-block;
  width: 1rem;
  margin-left: -1rem;
  padding: 0;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
  color: currentColor;
  font-size: 0.5rem;
  vertical-align: middle;
  text-align: center;
`;

export const isExpanded = css``;

export const tag = css`
  white-space: nowrap;
  color: var(--color-accent);

  &::after,
  &::before {
    content: '';
    color: var(--color-quiet);
  }

  &::after {
    content: '\\003e';
  }
  &::before {
    content: '\\003c';
  }

  &:last-child::after {
    content: '\\002f\\003e';
  }

  & ~ &::before {
    content: '\\003c\\002f';
  }

  & ~ &::after {
    content: '\\003e';
  }
`;
