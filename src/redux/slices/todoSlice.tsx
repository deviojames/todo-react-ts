import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the initial state using that type
interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

type Todos = Todo[];

interface InnitState {
  todos: Todos;
}

export const initialState: InnitState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state: InnitState, action: PayloadAction<{ text: string }>) => {
      const updateState = [
        ...state.todos,
        {
          id: state.todos.length + 1,
          text: action.payload.text,
          isCompleted: false,
        },
      ];

      state.todos = updateState;
    },
    deleteTodo: (state: InnitState, action: PayloadAction<{ todoId: number }>) => {
      const updateState = state.todos.filter(
        (todo) => todo.id !== action.payload.todoId,
      );
      state.todos = updateState;
    },
    toggledTodo: (state: InnitState, action: PayloadAction<{ todoId: number }>) => {
      const updateState = state.todos.map((todo) => (todo.id === action.payload.todoId
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo));
      state.todos = updateState;
    },
  },
});

export const { addTodo, deleteTodo, toggledTodo } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState): Todos => state.todo.todos;
export const selectCompletedTodoList = (state: RootState): Todos => state.todo.todos.filter((todo) => todo.isCompleted === true);

export default todoSlice.reducer;
