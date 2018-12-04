class FakeComponent {
  constructor(uid) {
    this.uid = uid;
  }

  $$logStart() {
    console.log(`attached to ${this.uid}`);
  }

  $$logEnd() {
    console.log(`detached from ${this.uid}`);
  }
}

const $store = new Map();

export default {
  get(uid) {
    if (!$store.has(uid)) {
      $store.set(uid, new FakeComponent(uid));
    }
    return $store.get(uid);
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

  setCurrent() {},
};
