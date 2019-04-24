import { html } from 'lit-html';
import { noop } from '../utils';
import * as styles from './SidePanel.styles';
import '../PropList/PropList';
import '../Prop/Prop';

const blankSlate = html`
  <p class="${styles.blankSlate}">
    Select a component on the left panel to inspect its properties
  </p>
`;

export default function SidePanel(props = {}) {
  const {
    uid,
    Component,
    state = {},
    options = {},
    watchers,
    onPropCheck = noop,
  } = props;

  if (!uid) {
    return blankSlate;
  }

  const optionProps = Object.entries(options).map(
    ([key, value]) =>
      html`
        <yzdt-prop key=${key} .value=${value}></yzdt-prop>
      `,
  );

  const stateProps = Object.entries(state).map(
    ([key, value]) =>
      html`
        <yzdt-prop
          uid=${uid}
          key=${key}
          .value=${value}
          watchable
          .onWatchChange=${onPropCheck}
          ?watched=${watchers.includes(`${key}:${uid}`)}
        >
        </yzdt-prop>
      `,
  );

  return html`
    <section class="${styles.root}">
      <h2 class="${styles.title}">
        ${Component || 'Component'}<em>#${uid}</em>
      </h2>
      <div class="${styles.panelWrap}">
        <div class="${styles.panelScroll}">
          <yzdt-prop-list title="Options">${optionProps}</yzdt-prop-list>
          <yzdt-prop-list
            title="State"
            uid=${uid}
            ?watchable=${true}
            .onSelect=${onPropCheck}
            >${stateProps}</yzdt-prop-list
          >
        </div>
      </div>
    </section>
  `;
}
