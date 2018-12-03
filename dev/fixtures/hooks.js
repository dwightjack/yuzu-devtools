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
  logStart(uid) {
    const inst = this.get(uid);
    if (inst) {
      inst.$$logStart();
    }
  },

  logEnd(uid) {
    const inst = this.get(uid);
    if (inst) {
      inst.$$logEnd();
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
