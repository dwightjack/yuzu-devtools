// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.devtools.panels.elements.createSidebarPane(
  'Yuzu Inspector',
  (sidebar) => {
    function getQuery() {
      // Data properties
      if (!$0 || !$0.$yuzu) {
        return {
          message: 'Select a Yuzu component',
        };
      }

      const instance = $0.$yuzu;

      const obj = () => Object.create(null);

      function getProps(props, inst) {
        Object.assign(props, {
          children: obj(),
          name: inst.constructor.name,
          $uid: inst.$uid,
          state: Object.assign(obj(), inst.state),
          _raw: inst,
        });
        return props;
      }

      function traverseTree(root, inst) {
        const props = getProps(root, inst);
        if (inst.$refsStore.size > 0) {
          inst.$refsStore.forEach((value, key) => {
            props.children[key] = obj();
            traverseTree(props.children[key], value);
          });
        }
        return props;
      }

      const root = obj();

      traverseTree(root, instance);

      return root;
    }

    /*
     *  Queries the name of the selected component and passes the result to updatePane
     */
    function update() {
      chrome.devtools.inspectedWindow.eval('$0.$yuzu', (instance) => {
        const query = `(${getQuery.toString()})()`;

        sidebar.setExpression(query, instance && instance.constructor.name);
      });
    }

    /*
     *  Parses the getQuery function to a string then wraps it to make it evaluate as an expression.
     *  Sends the result to the sidebar
     *  @param compName the name of the component being queried
     */

    /*
     * The chrome console query, can use all libraries available to the console as it is not called outside that context.
     */

    // runs initial update
    update();
    // every time the selection changes in the elements panel, update is called
    chrome.devtools.panels.elements.onSelectionChanged.addListener(update);
  },
);
