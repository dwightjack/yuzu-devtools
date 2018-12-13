(() => {
  const serialize = (obj) => {
    const cleaned = Object.keys(obj).reduce((acc, key) => {
      let value = obj[key];
      if (typeof obj[key] === 'function') {
        value = `[function ${obj[key].name || '...'}]`;
      }
      acc[key] = value;
      return acc;
    }, {});
    return JSON.stringify(cleaned);
  };

  const extractData = (instance) => {
    try {
      const obj = {
        uid: instance.$uid,
        Component:
          instance.constructor.displayName ||
          instance.constructor.name ||
          'Component',
        parent: instance.$parent && instance.$parent.$uid,
        options: serialize(instance.options),
        state: serialize(instance.state),
        detached: instance.detached,
      };

      if (instance.$parent) {
        // try to retrieve the id used in the parent
        let refId;
        instance.$parent.$refsStore.forEach((child, ref) => {
          if (child === instance) {
            refId = ref;
          }
        });
        obj.parent = instance.$parent.$uid;
        obj.ref = refId;
      }

      return obj;
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
    }
    return {};
  };

  const hook = () => {
    if (!window.__YUZU_DEVTOOLS_GLOBAL_HOOK__) {
      const _events = Object.create(null);
      _events['*'] = [];

      let started = false;

      const _queue = [];

      const _store = [];

      let selected = null;

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
          const { init, destroy } = proto;

          proto.init = function __dev_init(state) {
            init.call(this, state);
            self.notify('hooks:init', {
              ...extractData(this),
            });
            _store.push(this);
            return this;
          };

          proto.destroy = function __dev_destroy() {
            self.notify('hooks:destroy', {
              uid: this.$uid,
              parent: this.$parent && this.$parent.$uid,
            });

            const idx = _store.findIndex((c) => c === this);
            if (idx !== -1) {
              _store.splice(idx, 1);
            }

            return destroy.call(this);
          };
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

        stop() {
          started = false;
          this.setGlobal(null);
          this.setCurrent(null);
        },

        stateChangeListener(newState) {
          try {
            if (selected) {
              hooks.notify('hooks:statechange', {
                uid: selected.$uid,
                state: serialize(newState),
              });
            }
          } catch (e) {
            console.warn(e); // eslint-disable-line no-console
          }
        },

        get(uid) {
          return _store.find((inst) => inst.$uid === uid);
        },

        parseWatcher(hash = '') {
          const matches = hash.match(/^([^:]+):(.+)$/);
          if (matches) {
            const [, uid, prop = '*'] = matches;
            return {
              uid,
              event: `change:${prop}`,
              inst: this.get(uid),
            };
          }
          return {};
        },
        logStart(hash) {
          const { inst, event } = this.parseWatcher(hash);
          if (inst) {
            inst.$$logStart(null, event);
          }
        },

        logEnd(hash) {
          const { inst, event } = this.parseWatcher(hash);
          if (inst) {
            inst.$$logEnd(event);
          }
        },

        setGlobal(uid) {
          const inst = uid && this.get(uid);
          if (inst) {
            window.$yuzu0 = inst;
          } else if (window.$yuzu0) {
            delete window.$yuzu0;
          }
        },

        setCurrent(uid) {
          if (selected) {
            selected.off('change:*', this.stateChangeListener);
          }
          selected = uid && this.get(uid);
          if (selected) {
            selected.on('change:*', this.stateChangeListener);
            this.stateChangeListener(selected.state);
          }
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

  setTimeout(() => {
    try {
      if (window.__YUZU_DEVTOOLS_GLOBAL_HOOK__.Component) {
        window.postMessage(
          {
            source: 'yuzu-devtools',
            payload: {
              type: 'yuzu-detected',
            },
          },
          '*',
        );
      }
    } catch (e) {
      // silently fail
      window.postMessage(
        {
          source: 'yuzu-devtools',
          payload: {
            type: 'yuzu-idle',
          },
        },
        '*',
      );
    }
  }, 1000);
})();
