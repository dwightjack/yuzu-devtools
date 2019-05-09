import { html } from 'lit-html';

export const root = html`
  <style>
    .root {
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: var(--color-quiet);
      font-family: var(--font-monospace);
      font-size: var(--font-size-m);
      padding-left: 1rem;
      line-height: 1.5em;
      cursor: default;
      user-select: none;
    }

    .expander {
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
    }

    .expander::before {
      content: '\\25b6';
    }

    .expander[aria-expanded='true']::before {
      content: '\\25bc';
    }

    .children {
      flex-grow: 1;
      flex-basis: 100%;
    }

    .root::before {
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

    .isSelected::before {
      visibility: visible;
    }

    .watchMark {
      display: inline-block;
      width: 0.8em;
      height: 0.8em;
      margin-top: -1em;
      margin-right: 0.2em;
      vertical-align: super;
      fill: currentColor;
    }
  </style>
`;

export const tag = html`
  <style>
    :host {
      color: var(--color-accent);
    }

    span::after,
    span::before {
      color: var(--color-quiet);
    }

    span::after {
      content: '\\003e';
    }
    span::before {
      content: '\\003c';
    }

    :host([selfclose]) span::after {
      content: '\\002f\\003e';
    }

    :host([close]) span::before {
      content: '\\003c\\002f';
    }

    :host([watched]) {
      font-weight: bold;
    }
  </style>
`;
