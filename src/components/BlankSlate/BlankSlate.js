import { html } from 'lit-html';
import { component } from 'haunted';

export default function blankSlate() {
  return html`
    <style>
      .blank {
        margin: 0;
        padding: var(--gutter);
        color: var(--color-quiet);
        font-size: var(--font-size-m);
        font-style: italic;
      }
    </style>
    <p class="blank"><slot></slot></p>
  `;
}

customElements.define('yzdt-blank-slate', component(blankSlate));
