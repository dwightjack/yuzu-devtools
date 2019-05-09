import { html } from 'lit-html';
import { component } from 'haunted';
import { noop } from '../utils';
import '../Prop/Prop';
import '../PropWatcher/PropWatcher';

export default function PropList({
  uid,
  name = '',
  onSelect = noop,
  props = {},
  watchers = [],
  watchable = false,
}) {
  const globalWatcher = watchable
    ? html`
        <yzdt-watcher
          key="*"
          uid=${uid}
          ?watched="${watchers.includes(`${uid}:*`)}"
          @toggle=${({ detail }) => onSelect(uid, '*', detail.watched)}
        ></yzdt-watcher>
      `
    : '';

  const entries = Object.entries(props);

  return html`
    <style>
      :host(:not(:first-of-type)) {
        display: block;
        margin-top: var(--gutter);
        border-top: 1px solid var(--color-light);
      }

      .title {
        margin: var(--gutter);
        font-size: var(--font-size-m);
        font-weight: bold;
        line-height: 1.2;
      }

      .empty {
        margin: 0;
        padding: 0 var(--gutter);
        color: var(--color-quiet);
        font-size: var(--font-size-m);
        font-style: italic;
      }
    </style>
    <section>
      <h3 class="title"><span>${name}</span>&nbsp;${globalWatcher}</h3>
      ${entries.length
        ? entries.map(
            ([key, value]) =>
              html`
                <yzdt-prop
                  uid=${uid}
                  key=${key}
                  .value=${value}
                  ?watchable=${watchable}
                  .onWatchChange=${onSelect}
                  ?watched=${watchers.includes(`${uid}:${key}`)}
                >
                </yzdt-prop>
              `,
          )
        : html`
            <p class="empty">empty object</p>
          `}
    </section>
  `;
}

PropList.observedAttributes = [
  'name',
  'uid',
  'watched',
  'watchable',
  'watchers',
  'props',
];
customElements.define('yzdt-prop-list', component(PropList));
