import { wire } from 'hyperhtml';
import cc from 'classcat';
import isPlainObject from 'lodash/isPlainObject';
import * as styles from './Prop.styles';

const getType = (value) => {
  if (isPlainObject(value)) {
    return 'object';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'string') {
    return 'string';
  }
  return null;
};

export default function Prop({ key, value }) {
  const type = getType(value);
  const typeStyle = type ? styles[`${type}Style`] : '';
  let val = value;
  let inspectable = false;

  if (type === 'object') {
    val = '{...}';
    inspectable = true;
  } else if (type === 'array') {
    val = `Array(${val.length})`;
    inspectable = true;
  }

  return wire({ key })`
    <div class="${styles.root}">
      <span class="${styles.label}">${key}: </span><span  class="${cc([
    styles.value,
    typeStyle,
  ])}">${val}${
    inspectable
      ? wire()`<button class="${
          styles.inspect
        }" type="button" aria-label="inspect">&#9660;</button>`
      : ''
  }</span>
    </div>
  `;
}
