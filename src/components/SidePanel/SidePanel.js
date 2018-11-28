import { wire } from 'hyperhtml';
import PropList from '../PropList/PropList';
import * as styles from './SidePanel.styles';

const blankSlate = wire({ blank: true })`
  <p class="${
    styles.blankSlate
  }">Select a component on the left panel to inspect its properties</p>
`;

export default function SidePanel(props = {}) {
  const { uid, Component, state, options } = props;
  if (!uid) {
    return blankSlate;
  }
  return wire(props)`<section>
    <h2 class="${styles.title}">${Component || 'Component'}<em>#${uid}</em></h2>
    ${PropList({ title: 'Options', props: options })}
    ${PropList({ title: 'State', props: state })}
  </section>`;
}
