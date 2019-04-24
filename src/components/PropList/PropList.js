import { html } from 'lit-html';
// import Prop from '../Prop/Prop';
import { component } from 'haunted';
import { noop } from '../utils';
import '../Prop/Prop';
import '../PropWatcher/PropWatcher';
// import * as styles from './PropList.styles';

export default function PropList({
  uid,
  title = '',
  onSelect = noop,
  // props = {},
  watched = false,
  // watchers = [],
  watchable = false,
}) {
  // const keys = Object.keys(props);
  // const list =
  //   keys.length > 0
  //     ? keys.map((key) => {
  //         return Prop({
  //           key,
  //           uid,
  //           watchable,
  //           value: props[key],
  //           onSelect,
  //           watched: watchable && watchers.includes(`${uid}:${key}`),
  //         });
  //       })
  //     : html`
  //         <p class="${styles.empty}">empty object</p>
  //       `;

  const globalWatcher = watchable
    ? html`
        <yzdt-watcher
          key="*"
          uid=${uid}
          ?watched="${watched}"
          .onToggle=${onSelect}
        ></yzdt-watcher>
      `
    : '';

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
      <h3 class="title"><span>${title}</span>&nbsp;${globalWatcher}</h3>
      <slot> <p class="empty">empty object</p> </slot>
    </section>
  `;
}

PropList.observedAttributes = ['uid', 'watched', 'watchable'];
customElements.define('yzdt-prop-list', component(PropList));
