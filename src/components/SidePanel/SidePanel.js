import { html } from 'lit-html';
import { component } from 'haunted';

const blankSlate = html`
  <style>
    .blank {
      margin: 0;
      padding: var(--gutter);
      color: var(--color-quiet);
      font-size: var(--font-size-m);
      font-style: italic;
    }
  </style>
  <p class="blank">
    Select a component on the left panel to inspect its properties
  </p>
`;

export default function SidePanel({ uid, name } = {}) {
  if (!uid) {
    return blankSlate;
  }

  return html`
    <style>
      .root {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
        grid-template-areas: 'title' 'wrap';
        height: 100%;
      }
      .title {
        grid-area: title;
        margin: 0;
        padding: 8px var(--gutter);
        font-size: var(--font-size-l);
        font-weight: bold;
        line-height: 1.2;
        background-color: var(--color-lighter);
      }
      .title > em {
        font-size: 0.75em;
      }
      .panelWrap {
        grid-area: wrap;
        min-height: 0;
      }
      .panelScroll {
        overflow-y: auto;
        height: 100%;
      }
    </style>
    <section class="root">
      <h2 class="title">${name || 'Component'}<em>#${uid}</em></h2>
      <div class="panelWrap">
        <div class="panelScroll"><slot></slot></div>
      </div>
    </section>
  `;
}

SidePanel.observedAttributes = ['name', 'uid'];
customElements.define('yzdt-side-panel', component(SidePanel));
