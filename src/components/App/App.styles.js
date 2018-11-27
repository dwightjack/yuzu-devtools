import { injectGlobal } from 'emotion';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    box-sizing: border-box;
  }
  
  html,
  body {
    font-family: sans-serif;
    font-size: 100%;
  }

  :root {
    --color-accent: rgb(136, 18, 128);
    --color-quiet: rgb(136, 136, 136);
  }
`;
