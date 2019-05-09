import { html } from 'lit-html';

export default html`
  <style>
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid var(--color-light);
      font-size: var(--font-size-m);
      font-weight: bold;
      line-height: 1.2;
      background-color: var(--color-lighter);
    }
    a[role='tab'] {
      display: inline-block;
      padding: calc(var(--gutter) / 2) var(--gutter);
      text-decoration: none;
      color: var(--color-dark);
      font-weight: normal;
    }

    a[aria-selected='true'] {
      background: linear-gradient(
          to top,
          var(--color-quiet),
          var(--color-quiet)
        )
        no-repeat 0 bottom;
      background-size: 100% 1px;
      font-weight: bold;
    }

    a[role='tab'] sup {
      vertical-align: baseline;
      position: relative;
      top: -0.4em;
    }
  </style>
`;
