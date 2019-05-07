import { html } from 'lit-html';
import { useEffect, component } from 'haunted';
import Split from 'split-grid';

// import * as styles from './Panels.styles';

export default function Panels() {
  const gutter = document.createElement('div');
  gutter.className = 'gutter';

  useEffect(
    () => {
      Split({
        // breaks as a custom element
        // so explicitly set the initial value
        gridTemplateColumns: '1fr 6px 0.5fr',
        columnGutters: [
          {
            track: 1,
            element: gutter,
          },
        ],
      });
    },
    [gutter],
  );

  return html`
    <style>
      :host {
        display: block;
      }
      .root {
        display: grid;
        height: 100vh;
        grid-template-columns: 1fr 6px 0.5fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'main gutter side';
      }

      ::slotted([slot='main']) {
        grid-area: main;
        min-height: 0;
        border-right: 1px solid var(--color-light);
      }

      ::slotted([slot='side']) {
        grid-area: side;
        min-height: 0;
        border-left: 1px solid var(--color-light);
      }

      ::slotted([slot]) > * {
        height: 100%;
      }

      .gutter {
        grid-area: gutter;
        background: var(--color-lighter);
        background-image: linear-gradient(
          to top,
          var(--color-quiet),
          var(--color-quiet)
        );
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 2px 30px;
      }
    </style>
    <div class="root">
      <slot name="main"></slot> ${gutter} <slot name="side"></slot>
      <div></div>
    </div>
  `;
}

customElements.define('yzdt-panels', component(Panels));
