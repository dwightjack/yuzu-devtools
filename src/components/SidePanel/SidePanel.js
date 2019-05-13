import { html } from 'lit-html';
import { component } from 'haunted';

export default function SidePanel() {
  return html`
    <style>
      :host {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
        grid-template-areas: 'header' 'wrap';
        height: 100%;
      }
      [slot='header'] {
        grid-area: header;
      }

      .panelWrap {
        grid-area: wrap;
        overflow-y: auto;
        min-height: 0;
        padding-bottom: var(--gutter);
      }
    </style>
    <slot name="header"></slot>
    <div class="panelWrap">
      <slot name="body"></slot>
    </div>
  `;
}

customElements.define('yzdt-side-panel', component(SidePanel));
