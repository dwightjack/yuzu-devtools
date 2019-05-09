import { html, nothing } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { classMap } from 'lit-html/directives/class-map';
import { component } from 'haunted';
import visibility from 'material-design-icons/action/svg/production/ic_visibility_24px.svg';
import { noop } from '../utils';
import * as styles from './Instance.styles';
import '../AttrList/AttrList';

if (process.env.NODE_ENV !== 'test') {
  customElements.define(
    'yzdt-tag',
    component(
      () => html`
        ${styles.tag}<span><slot></slot></span>
      `,
    ),
  );
}

export default function Instance(props = {}) {
  const {
    name,
    uid,
    expandable = false,
    onClick = noop,
    onSelect = noop,
    expanded = false,
    selected = false,
    watched = false,
    ref,
    detached,
  } = props;

  // prettier-ignore
  const watchMark = watched
    ? html`<span
          class="watchMark"
          aria-label="Watching Component State"
          >${unsafeHTML(visibility)}</span
        >`
    : nothing;

  const classes = classMap({
    root: true,
    isSelected: selected,
  });

  // prettier-ignore
  return html`
      ${styles.root}
      <div class=${classes}>
        ${expandable ?
          html`<button
                type="button"
                class="expander"
                @click="${() => onClick({ uid, expanded: !expanded })}"
                aria-label="Expand / collapse children"
                aria-expanded="${expanded}"
              ></button>`
         : nothing}
        <yzdt-tag
          ?watched=${watched}
          @click=${() => onSelect({ uid })}
          ?selfclose=${!expandable}
        >${name}${watchMark}<yzdt-attrs .ref=${ref} ?detached=${detached}></yzdt-attrs></yzdt-tag>
        ${
          expandable ? html`
            <div class="children" ?hidden=${!expanded}>
              <slot></slot>
            </div>
            <yzdt-tag ?watched=${watched} close>${name}</yzdt-tag>`
          : nothing
        }
      </div>
    `;
}
Instance.observedAttributes = [
  'name',
  'uid',
  'expanded',
  'expandable',
  'selected',
  'ref',
  'watched',
  'detached',
];
customElements.define('yzdt-component', component(Instance));
