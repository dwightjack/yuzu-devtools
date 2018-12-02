import { injectGlobal } from 'emotion';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  :root {
    --color-accent: rgb(136, 18, 128);
    --color-accent-secondary: rgb(200, 0, 0);
    --color-accent-ter: rgb(153, 69, 0);
    --color-quiet: rgb(136, 136, 136);
    --color-light: rgb(218, 218, 218);
    --color-dark: #333;
    --color-lighter: #efefef;

    --gutter: 16px;
    --font-size-s: 0.75rem;
    --font-size-m: 0.875rem;
    --font-size-l: 1rem;

    --font-default: sans-serif;
    --font-monospace: Menlo, Consolas, monospace;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: var(--font-default);
    font-size: 100%;
    color: var(--color-dark);
  }
`;
