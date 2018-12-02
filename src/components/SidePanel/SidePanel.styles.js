import { css } from 'emotion';

export const root = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const title = css`
  margin: 0;
  padding: 8px var(--gutter);
  font-size: var(--font-size-l);
  font-weight: bold;
  line-height: 1.2;
  background-color: var(--color-lighter);
  flex: 0 0 auto;
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

export const options = css`
  padding: 4px var(--gutter);
  border-bottom: 1px solid var(--color-light);
  background: var(--color-lighter);
  flex: 0 0 auto;
  font-size: var(--font-size-m);
`;

export const option = css`
  display: flex;
  align-items: center;
`;

export const panelWrap = css`
  overflow-y: auto;
  flex-grow: 1;
`;
