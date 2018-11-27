import { css } from 'emotion';

export const root = css`
  color: rgb(136, 136, 136);
  font-size: 0.875rem;
  white-space: nowrap;
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
  color: rgb(136, 136, 136);
  font-size: 0.5rem;
  vertical-align: middle;
  text-align: center;
`;

export const isExpanded = css``;

export const tag = css`
  color: rgb(136, 18, 128);
  &::after,
  &::before {
    content: '';
    color: rgb(136, 136, 136);
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
