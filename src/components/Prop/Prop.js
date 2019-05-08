import { html } from 'lit-html';
import { component } from 'haunted';
import { noop, parseValue } from '../utils';
import '../PropWatcher/PropWatcher';

export default function Prop({
  key,
  uid,
  value,
  watchable = false,
  watched = false,
  onWatchChange = noop,
}) {
  const { type, value: val /* , inspectable = false */ } = parseValue(value);
  return html`
    <style>
      :host {
        display: flex;
        align-items: flex-start;
        padding: 0 var(--gutter) calc(var(--gutter) / 2);
        font-family: var(--font-monospace);
        font-size: var(--font-size-s);
        font-weight: normal;
      }
      .label {
        display: inline-block;
        padding-right: 0.5em;
        color: var(--color-accent-secondary);
        line-height: 1.5;
        flex-shrink: 1;
        flex-grow: 0;
      }

      :host(:not([watchable])) .label {
        padding-left: 1.4em;
      }

      .value {
        display: inline-block;
        font-family: var(--font-monospace);
        font-size: var(--font-size-s);
        font-weight: normal;
        line-height: 1.5;
        border: none;
        flex: 1 1 auto;
      }

      .value[data-type='string']::after,
      .value[data-type='string']::before {
        content: '\\0022';
        display: inline-block;
      }
    </style>
    ${// prettier-ignore
    watchable
          ? html`
              <yzdt-watcher
                uid=${uid}
                key=${key}
                ?watched=${watched}
                @toggle=${({ detail }) => onWatchChange(uid, key, detail.watched)}
              ></yzdt-watcher>`
          : ''}<span
      class="label"
      >${key}: </span
    ><span class="value" data-type=${type}>${val}</span>
  `;
}

Prop.observedAttributes = ['key', 'uid', 'value', 'watched', 'watchable'];

customElements.define('yzdt-prop', component(Prop));
