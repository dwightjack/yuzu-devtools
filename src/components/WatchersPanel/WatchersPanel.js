import { html } from 'lit-html';
import { component, useContext } from 'haunted';
import { noop } from '../utils';
import '../SidePanel/SidePanel';
import '../BlankSlate/BlankSlate';
import { StateContext } from '../../store/stateContext';

export default function WatchersPanel() {
  const { watchers = [], onToggleWatch = noop, onShow = noop } = useContext(
    StateContext,
  );

  return html`
    <style>
      .group {
        padding: var(--gutter) var(--gutter) calc(var(--gutter) / 2);
      }
      .group:not(:first-child) {
        border-top: 1px solid var(--color-light);
      }
      p {
        margin: calc(var(--gutter) / 2) 0;
        padding: 0;
        font-family: var(--font-monospace);
        font-size: var(--font-size-s);
        font-weight: normal;
      }
      b {
        color: var(--color-accent);
        font-weight: normal;
      }
      header {
        display: flex;
        align-items: baseline;
      }
      h3 {
        margin: 0;
        font-size: var(--font-size-m);
      }
      .btn {
        margin-left: 0.5em;
        padding: 0;
        border: 0;
        background-color: none;
        text-decoration: underline;
        color: var(--color-accent);
        font-size: var(--font-size-s);
        cursor: pointer;
      }
    </style>
    <yzdt-side-panel>
      ${watchers.length === 0
        ? html`
            <yzdt-blank-slate slot="body"
              >No watchers listening</yzdt-blank-slate
            >
          `
        : html`
            <div class="wrap" slot="body">
              ${watchers.map(({ uid, keys = [], name }) => {
                return html`
                  <div class="group">
                    <header>
                      <h3>${name}#${uid}</h3>
                      <button
                        type="button"
                        class="btn"
                        @click=${() => onShow({ uid })}
                      >
                        show
                      </button>
                    </header>
                    ${keys.map(
                      (key) => html`
                        <p>
                          <yzdt-watcher
                            key=${key}
                            uid=${uid}
                            ?watched=${true}
                            @toggle=${() => onToggleWatch(uid, key, false)}
                          ></yzdt-watcher>
                          <b>${key === '*' ? '<all>' : key}</b>
                        </p>
                      `,
                    )}
                  </div>
                `;
              })}
            </div>
          `}
    </yzdt-side-panel>
  `;
}

WatchersPanel.observedAttributes = ['name', 'uid'];
customElements.define('yzdt-watchers-panel', component(WatchersPanel));
