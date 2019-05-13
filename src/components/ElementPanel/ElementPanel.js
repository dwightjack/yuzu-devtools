import { html } from 'lit-html';
import { component, useContext } from 'haunted';
import '../SidePanel/SidePanel';
import '../BlankSlate/BlankSlate';
import '../PropList/PropList';
import { StateContext } from '../../store/stateContext';

export default function ElementPanel() {
  const {
    Component: name,
    uid,
    options = {},
    state = {},
    watchers,
    onPropCheck,
  } = useContext(StateContext);

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
            <div slot="body">
              <yzdt-prop-list name="Options" .props=${options}></yzdt-prop-list>
              <yzdt-prop-list
                name="State"
                uid=${uid}
                ?watchable=${true}
                .onSelect=${onPropCheck}
                .props=${state}
                .watchers=${watchers}
              ></yzdt-prop-list>
            </div>
          `}
    </yzdt-side-panel>
  `;
}

// ElementPanel.observedAttributes = ['name', 'uid'];
customElements.define('yzdt-element-panel', component(ElementPanel));
