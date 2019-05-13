import { html } from 'lit-html';
import { component } from 'haunted';
import '../SidePanel/SidePanel';
import '../BlankSlate/BlankSlate';

export default function ElementPanel({ uid, name } = {}) {
  return html`
    <style>
      .title {
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
    </style>
    <yzdt-side-panel>
      ${!uid
        ? html`
            <yzdt-blank-slate slot="body"
              >Select a component on the left panel to inspect its
              properties</yzdt-blank-slate
            >
          `
        : html`
            <h2 slot="header" class="title">
              ${name || 'Component'}<em>#${uid}</em>
            </h2>
            <slot slot="body"></slot>
          `}
    </yzdt-side-panel>
  `;
}

ElementPanel.observedAttributes = ['name', 'uid'];
customElements.define('yzdt-element-panel', component(ElementPanel));
