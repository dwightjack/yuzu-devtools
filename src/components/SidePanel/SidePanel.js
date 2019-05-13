import { html } from 'lit-html';
import { component } from 'haunted';

export default function SidePanel() {
  return html`
    <style>
      .root {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
        grid-template-areas: 'header' 'wrap';
        height: 100%;
      }
      slot[name='header'] {
        grid-area: header;
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
      <slot name="header"></slot>
      <div class="panelWrap">
        <div class="panelScroll">
          <slot name="body"></slot>
        </div>
      </div>
    </section>
  `;
}

customElements.define('yzdt-side-panel', component(SidePanel));
