import { wire } from 'hyperhtml';
import PropList from '../PropList/PropList';
import { noop } from '../utils';
import * as styles from './SidePanel.styles';

const blankSlate = wire({ blank: true })`
  <p class="${
    styles.blankSlate
  }">Select a component on the left panel to inspect its properties</p>
`;

export default function SidePanel(props = {}) {
  const { uid, Component, state, options, logged, toggleLog = noop } = props;

  if (!uid) {
    return blankSlate;
  }

  const Title = wire(props, ':uid')`<h2 class="${styles.title}">
    ${Component || 'Component'}<em>#${uid}</em>
  </h2>`;

  return wire(props)`<section class="${styles.root}">
    ${Title}
    <div class="${styles.options}">
      <label class="${
        styles.option
      }"><input type="checkbox" name="logger" checked=${logged} onclick="${() =>
    toggleLog({ uid })}" /> <span>Log state changes</span></label>
    </div>
    <div class="${styles.panelWrap}">
      ${PropList({ title: 'Options', props: options })}
      ${PropList({ title: 'State', props: state })}
    </div>
  </section>`;
}
