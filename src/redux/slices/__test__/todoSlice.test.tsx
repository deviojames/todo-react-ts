import reducer, {
  addTodo,
  deleteTodo,
  initialState,
  selectCompletedTodoList,
  selectTodo,
  toggledTodo,
} from '../todoSlice';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: 'todo/addTodo',
      payload: {
        text: 'test',
      },
    };
    expect(addTodo({ text: 'test' })).toEqual(expectedAction);
  });
  it('should create an action to remove a todo', () => {
    const expectedAction = {
      type: 'todo/deleteTodo',
      payload: {
        todoId: 1,
      },
    };
    expect(deleteTodo({ todoId: 1 })).toEqual(expectedAction);
  });
  it('should create an action to toggle a todo', () => {
    const expectedAction = {
      type: 'todo/toggledTodo',
      payload: {
        todoId: 1,
      },
    };
    expect(toggledTodo({ todoId: 1 })).toEqual(expectedAction);
  });
});

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { payload: {}, type: 'init' })).toEqual(
      initialState,
    );
  });

  it('should handle action addTodo', () => {
    const expectedState = {
      todos: [{ text: 'test', isCompleted: false, id: 1 }],
    };
    expect(reducer({ todos: [] }, addTodo({ text: 'test' }))).toEqual(
      expectedState,
    );
  });

  it('should handle action deleteTodo', () => {
    const previousState = {
      todos: [{ text: 'test', isCompleted: false, id: 1 }],
    };
    expect(reducer(previousState, deleteTodo({ todoId: 1 }))).toEqual({
      todos: [],
    });
  });

  it('should handle action toggleTodo', () => {
    const previousState = {
      todos: [{ text: 'test', isCompleted: false, id: 1 }],
    };

    const expectedState = {
      todos: [{ text: 'test', isCompleted: true, id: 1 }],
    };
    expect(reducer(previousState, toggledTodo({ todoId: 1 }))).toEqual(
      expectedState,
    );
  });
});

describe('selector', () => {
  it('select todos', () => {
    const state = { todo: { todos: [] } };
    const expectedStateSelect = { todos: [] };

    expect(reducer({ todos: [] }, selectTodo(state))).toEqual(
      expectedStateSelect,
    );
  });

  it('select completed todos', () => {
    const state = {
      todo: {
        todos: [
          { text: 'todo 1', isCompleted: false, id: 1 },
          { text: 'todo 2', isCompleted: true, id: 2 },
        ],
      },
    };
    const expectedStateSelect = [{ text: 'todo 2', isCompleted: true, id: 2 }];

    expect(selectCompletedTodoList(state)).toEqual(
      expectedStateSelect,
    );
  });
});
