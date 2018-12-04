import { css } from 'emotion';

export const root = css`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'title' 'wrap';
  height: 100%;
`;
export const title = css`
  grid-area: title;
  margin: 0;
  padding: 8px var(--gutter);
  font-size: var(--font-size-l);
  font-weight: bold;
  line-height: 1.2;
  background-color: var(--color-lighter);

  & > em {
    font-size: 0.75em;
  }
`;

export const blankSlate = css`
  margin: 0;
  padding: var(--gutter);
  color: var(--color-quiet);
  font-size: var(--font-size-m);
  font-style: italic;
`;

export const panelWrap = css`
  grid-area: wrap;
  min-height: 0;
`;

export const panelScroll = css`
  overflow-y: auto;
  height: 100%;
`;
