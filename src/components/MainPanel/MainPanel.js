import { html } from 'lit-html';
import { component } from 'haunted';
// import * as styles from './MainPanel.styles';

export default function MainPanel() {
  return html`
    <style>
      :host {
        display: block;
        overflow: auto;
        height: 100%;
      }
    </style>
    <div><slot></slot></div>
  `;
}

customElements.define('yzdt-main-panel', component(MainPanel));
