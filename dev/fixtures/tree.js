module.exports = [
  {
    uid: '_ui.0',
    Component: 'App',
    state: {},
    children: [
      {
        uid: '_ui.1',
        Component: 'Form',
        parent: '_ui.0',
        state: {},
      },
      {
        uid: '_ui.2',
        Component: 'TodoList',
        parent: '_ui.0',
        state: {
          todos: [],
        },
        children: [
          {
            uid: '_ui.3',
            Component: 'Todo',
            parent: '_ui.2',
            state: {
              text: 'Test',
              completed: false,
              id: 'todo-1',
            },
          },
          {
            uid: '_ui.4',
            Component: 'Todo',
            parent: '_ui.2',
            state: {
              text: 'Test',
              completed: false,
              id: 'todo-2',
            },
          },
        ],
      },
    ],
  },
];
