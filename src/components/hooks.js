import { useCallback } from 'haunted';
import { noop } from './utils';

export function useHostEvent(event, fn = noop, deps) {
  return useCallback((ev) => {
    let host;
    if (process.env.NODE_ENV === 'test') {
      host = ev.currentTarget;
      while (!host.isRoot) {
        host = host.parentElement;
      }
    } else {
      ({ host } = ev.currentTarget.getRootNode());
    }
    if (host) {
      host.dispatchEvent(
        new CustomEvent(event, {
          detail: fn(),
        }),
      );
    }
  }, deps);
}
