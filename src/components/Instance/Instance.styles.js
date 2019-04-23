import { css } from 'emotion';

export const root = css`
  position: relative;
  color: var(--color-quiet);
  font-family: var(--font-monospace);
  font-size: var(--font-size-m);
  padding-left: 1rem;
  line-height: 1.5em;
  cursor: default;
  user-select: none;

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
  margin: -0.1em 0 0 -1rem;
  padding: 0;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
  color: currentColor;
  font-size: 0.5rem;
  vertical-align: middle;
  text-align: center;

  &::before {
    content: '\\25b6';
  }
`;

export const tag = css`
  position: relative;
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

export const watchMark = css`
  display: inline-block;
  width: 0.8em;
  height: 0.8em;
  margin-top: -1em;
  margin-right: 0.2em;
  vertical-align: super;
  fill: currentColor;
`;

export const isExpanderActive = css`
  &::before {
    content: '\\25bc';
  }
`;

export const isExpanded = css``;

export const isWatched = css`
  font-weight: bold;
`;

export const isSelected = css`
  &::before {
    visibility: visible;
  }
`;
