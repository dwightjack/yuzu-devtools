module.exports = {
  roots: ['_ui.0', '_ui.5'],
  tree: {
    '_ui.0': {
      uid: '_ui.0',
      Component: 'App',
      state: {},
      childIds: ['_ui.1', '_ui.2'],
    },
    '_ui.1': {
      uid: '_ui.1',
      Component: 'Form',
      parent: '_ui.0',
      state: {},
    },
    '_ui.2': {
      uid: '_ui.2',
      Component: 'TodoList',
      parent: '_ui.0',
      state: {
        todos: [
          {
            text: 'Test',
            completed: false,
            id: 'todo-1',
          },
          {
            text: 'Test',
            completed: false,
            id: 'todo-2',
          },
        ],
      },
      childIds: ['_ui.3', '_ui.4'],
    },
    '_ui.3': {
      uid: '_ui.3',
      Component: 'Todo',
      parent: '_ui.2',
      state: {
        text: 'Test',
        completed: false,
        id: 'todo-1',
      },
    },
    '_ui.4': {
      uid: '_ui.4',
      Component: 'Todo',
      parent: '_ui.2',
      state: {
        text: 'Test',
        completed: false,
        id: 'todo-2',
      },
    },
    '_ui.5': {
      uid: '_ui.5',
      Component: 'Store',
      state: {},
      detached: true,
    },
  },
};
