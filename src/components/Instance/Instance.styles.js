import { css } from 'emotion';

export const root = css`
  position: relative;
  color: var(--color-quiet);
  font-size: var(--font-size-m);
  padding-left: 1rem;
  line-height: 1.5em;
  cursor: default;

  &::before {
    content: '$yuzu0';
    position: absolute;
    top: 0;
    left: calc(50% - 50vw);
    right: 0;
    z-index: -1;
    height: 1.5em;
    padding-right: 1em;
    background: var(--color-lighter);
    visibility: hidden;
    text-align: right;
    font-style: italic;
  }
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

export const isSelected = css`
  &::before {
    visibility: visible;
  }
`;

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
