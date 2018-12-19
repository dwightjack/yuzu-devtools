import isPlainObject from 'lodash/isPlainObject';

export const noop = () => {};

export const parseValue = (value) => {
  if (isPlainObject(value)) {
    return { type: 'object', value: '{...}', inspectable: true };
  }
  if (Array.isArray(value)) {
    return {
      type: 'array',
      value: `Array(${value.length})`,
      inspectable: true,
    };
  }
  if (typeof value === 'string') {
    if (value.startsWith('[function ')) {
      return { type: 'function', value };
    }
    return { type: 'string', value };
  }
  if (value === null || value === undefined) {
    return { type: 'other', value: String(value) };
  }
  return { type: 'other', value };
};
