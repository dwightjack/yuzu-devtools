import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { component, useState } from 'haunted';
import styles from './Tabs.styles';

export default function Tabs({ tabs = [] }) {
  const [current, setCurrent] = useState(tabs[0].id);

  return html`
    ${styles}
    <ul role="tablist">
      ${
        tabs.map(
          ({ label, id }) => html`
            <li role="presentation">
              <a
                role="tab"
                href="#${id}-panel"
                id="${id}-tab"
                aria-selected=${current === id}
                @click=${(e) => e.preventDefault() || setCurrent(id)}
                >${unsafeHTML(label)}</a
              >
            </li>
          `,
        )
      }
    </ul>
    ${
      tabs.map(
        ({ id }) => html`
          <section
            role="tabpanel"
            id="${id}-panel"
            aria-labelledby="${id}-tab"
            ?hidden=${current !== id}
          >
            <slot name="${id}"></slot>
          </section>
        `,
      )
    }
  `;
}

customElements.define('yzdt-tabs', component(Tabs));
