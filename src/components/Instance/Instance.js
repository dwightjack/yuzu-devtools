import { html, nothing } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { classMap } from 'lit-html/directives/class-map';
import { component } from 'haunted';
import visibility from 'material-design-icons/action/svg/production/ic_visibility_24px.svg';
import { noop } from '../utils';
import '../AttrList/AttrList';

// import * as styles from './Instance.styles';

const Tag = component(() => {
  return html`
    <style>
      :host {
        color: var(--color-accent);
      }

      span::after,
      span::before {
        color: var(--color-quiet);
      }

      span::after {
        content: '\\003e';
      }
      span::before {
        content: '\\003c';
      }

      :host([selfclose]) span::after {
        content: '\\002f\\003e';
      }

      :host([close]) span::before {
        content: '\\003c\\002f';
      }

      :host([watched]) {
        font-weight: bold;
      }
    </style>
    <span><slot></slot></span>
  `;
});

customElements.define('yzdt-tag', Tag);

// function TagOpen(props) {
//   const { Component, uid, onSelect, attrs, watched } = props;
//   // prettier-ignore
//   const watchMark = watched
//     ? html`<span class="${styles.watchMark}" aria-label="Watching Component State">${unsafeHTML(visibility)}</span>`
//     : '';
//   return html`
//     <span
//       class="${cc([styles.tag, { [styles.isWatched]: watched }])}"
//       @click="${() => onSelect({ uid })}"
//       >${Component}${watchMark}${attrs}</span
//     >
//   `;
// }

// function TagClose(props) {
//   return html`
//     <span class="${cc([styles.tag, { [styles.isWatched]: props.watched }])}"
//       >${props.Component}</span
//     >
//   `;
// }

function ExpandBtn(props) {
  const { onClick, expanded, uid } = props;
  return html`
    <style>
      :host {
        display: inline-block;
        width: 1rem;
        margin: -0.1em 0 0 -1rem;
      }
      button {
        display: block;
        width: 100%;
        padding: 0;
        border: none;
        border-radius: 0;
        background: none;
        box-shadow: none;
        color: currentColor;
        font-size: 0.5rem;
        vertical-align: middle;
        text-align: center;
      }

      button::before {
        content: '\\25b6';
      }

      button[aria-expanded='true']::before {
        content: '\\25bc';
      }
    </style>
    <button
      type="button"
      @click="${() => onClick({ uid, expanded: !expanded })}"
      aria-label="Expand / collapse children"
      aria-expanded="${expanded}"
    ></button>
  `;
}
ExpandBtn.observedAttributes = ['expanded', 'uid'];
customElements.define('yzdt-expand', component(ExpandBtn));

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
        >
      `
    : nothing;

  const classes = classMap({
    root: true,
    isSelected: selected,
  });

  // prettier-ignore
  return html`
      <style>
        .root {
          position: relative;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          color: var(--color-quiet);
          font-family: var(--font-monospace);
          font-size: var(--font-size-m);
          padding-left: 1rem;
          line-height: 1.5em;
          cursor: default;
          user-select: none;
        }

        .children {
          flex-grow: 1;
          flex-basis: 100%;
        }

        .root::before {
          content: '$yuzu0';
          position: absolute;
          top: 0;
          left: calc(50% - 50vw);
          right: 0;
          z-index: -1;
          height: 1.5em;
          padding-right: 1em;
          background: var(--color-lighter);
          visibility: hidden;
          text-align: right;
          font-style: italic;
        }

        .isSelected::before {
          visibility: visible;
        }

        .watchMark {
          display: inline-block;
          width: 0.8em;
          height: 0.8em;
          margin-top: -1em;
          margin-right: 0.2em;
          vertical-align: super;
          fill: currentColor;
        }
      </style>
      <div class=${classes}>
        ${expandable ? html`<yzdt-expand .onClick=${onClick} uid=${uid} ?expanded=${expanded}></yzdt-expand>` : nothing}
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
  'detached',
];
customElements.define('yzdt-component', component(Instance));
