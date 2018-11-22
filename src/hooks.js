/**
 * Adds `__YUZU_DEVTOOLS_GLOBAL_HOOK__` hook to window object. This allows us to
 * initialize `InitialHookClass` and add methods to the hook object.
 */

const extractData = (instance) => ({
  uid: instance.$uid,
  Component: instance.constructor.name || 'Component',
});

const hook = () => {
  if (!window.__YUZU_DEVTOOLS_GLOBAL_HOOK__) {
    const _events = Object.create(null);
    _events['*'] = [];

    let started = false;

    const _queue = [];

    const _store = [];

    const hooks = {
      Component: null,
      on(type, handler) {
        if (!_events[type]) {
          _events[type] = [];
        }
        _events[type].push(handler);
      },
      off(type, handler) {
        if (!_events[type]) {
          return;
        }
        if (!handler) {
          _events[type].length = 0;
          return;
        }
        if (_events[type].includes(handler)) {
          _events[type].splice(_events[type].indexOf(handler), 1);
        }
      },
      once(type, handler) {
        if (!_events[type]) {
          _events[type] = [];
        }
        Object.defineProperty(handler, '_once', {
          value: true,
        });
        _events[type].push(handler);
      },
      emit(type, ...args) {
        if (_events[type]) {
          const handlers = [..._events[type]];
          for (let i = 0, l = handlers.length; i < l; i += 1) {
            handlers[i](...args);
            if (handlers[i]._once) {
              this.off(type, handlers[i]);
            }
          }
        }
        _events['*'].forEach((handler) => {
          if (handler._once) {
            this.off('*', handler);
          }
          handler(type, ...args);
        });
      },
      init(Component) {
        hooks.Component = Component;
        const self = this;
        const proto = Component.prototype;
        const { mount, init, setRef, destroy } = proto;

        proto.setRef = function __dev_setRef(...args) {
          return setRef.apply(this, args).then((ref) => {
            self.notify('ref', {
              parent: this.$uid,
              child: ref.$uid,
            });
            return ref;
          });
        };

        // proto.mount = function __dev_mount(...args) {
        //   self.emit('mount', {}, ...args);
        //   return mount.apply(this, args);
        // };

        proto.init = function __dev_init(state) {
          init.call(this, state);
          self.notify('init', {
            ...extractData(this),
            state,
          });
          return this;
        };

        proto.destroy = function __dev_destroy() {
          self.notify('destroy', {
            uid: this.$uid,
          });

          return destroy.call(this);
        };

        this.on('init', (component) => {
          _store.push(component);
        });

        this.on('destroy', (component) => {
          if (_store.includes(component)) {
            _store.splice(_store.indexOf(component), 1);
          }
        });
      },

      notify(type, ...args) {
        if (started === false) {
          _queue.push([type, ...args]);
          return;
        }
        this.emit(type, ...args);
      },
      start() {
        started = true;
        _queue.forEach((args) => {
          this.emit(...args);
        });
        _queue.length = 0;
      },
    };

    Object.defineProperty(window, '__YUZU_DEVTOOLS_GLOBAL_HOOK__', {
      get() {
        return hooks;
      },
    });
  }
};

hook();
