module.exports = {
  roots: ['_ui.0', '_ui.5'],
  watchers: [],
  tree: {
    '_ui.0': {
      uid: '_ui.0',
      Component: 'App',
      state: JSON.stringify({}),
      childIds: ['_ui.1', '_ui.2'],
    },
    '_ui.1': {
      uid: '_ui.1',
      Component: 'Form',
      parent: '_ui.0',
      state: JSON.stringify({}),
    },
    '_ui.2': {
      uid: '_ui.2',
      Component: 'TodoList',
      parent: '_ui.0',
      options: JSON.stringify({
        template:
          '<span class="todo-text"></span> <div class="btn-group" role="group"> <button type="button" data-action="complete" aria-label="Toggle completed"> <i class="fas fa-check"></i> </button> <button type="button" data-action="remove" aria-label="Delete"> <i class="fas fa-trash-alt"></i> </button> </div>',
      }),
      state: JSON.stringify({
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
      }),
      childIds: ['_ui.3', '_ui.4'],
    },
    '_ui.3': {
      uid: '_ui.3',
      Component: 'Todo',
      parent: '_ui.2',
      state: JSON.stringify({
        text: 'Test',
        completed: false,
        id: 'todo-1',
      }),
    },
    '_ui.4': {
      uid: '_ui.4',
      Component: 'Todo',
      parent: '_ui.2',
      options: JSON.stringify({ demo: true }),
      state: JSON.stringify({
        text: 'Test',
        completed: false,
        id: 'todo-2',
      }),
      ref: 'todo-2',
    },
    '_ui.5': {
      uid: '_ui.5',
      Component: 'Store',
      state: JSON.stringify({}),
      detached: true,
    },
  },
};
