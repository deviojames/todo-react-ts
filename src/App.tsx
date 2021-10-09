import {
  Container, Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import {
  addTodo,
  deleteTodo,
  selectCompletedTodoList,
  selectTodo,
  toggledTodo,
} from './redux/slices/todoSlice';
import { AppDispatch } from './redux/store';

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
`;

const AlertMessage = styled.h1`
  text-align: center;
`;

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoList = useSelector(selectTodo);
  const completedTodoList = useSelector(selectCompletedTodoList);

  const inputHandler = (text: string): void => {
    dispatch(addTodo({ text }));
  };

  const toggleHandler = (todoId: number): void => {
    dispatch(toggledTodo({ todoId }));
  };

  const onDeleteTodo = (todoId: number): void => {
    dispatch(deleteTodo({ todoId }));
  };

  return (
    <Container>
      <Title>TODO</Title>
      <TodoInput inputHandler={(value) => inputHandler(value)} />
      <Tabs isFitted>
        <TabList>
          <Tab>All</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {todoList.length > 0
              ? todoList.map((item) => (
                <TodoItem
                  title={item.text}
                  isCompleted={item.isCompleted}
                  checkBoxHandler={() => toggleHandler(item.id)}
                  onDeleteTodo={() => onDeleteTodo(item.id)}
                  key={item.id}
                />
              ))
              : <AlertMessage>Add your task.</AlertMessage>}
          </TabPanel>
          <TabPanel>
            {completedTodoList.length > 0
              ? completedTodoList.map((item) => (
                <TodoItem
                  title={item.text}
                  isCompleted={item.isCompleted}
                  checkBoxHandler={() => toggleHandler(item.id)}
                  onDeleteTodo={() => onDeleteTodo(item.id)}
                  key={item.id}
                />
              ))
              : <AlertMessage>Empty</AlertMessage>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default App;
