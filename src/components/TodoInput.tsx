import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  inputHandler: (text: string) => void,
}

const Container = styled.div`
  border-width: 2px;
  padding: 10px;
`;

const SubmitButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const TodoInput: React.FC<Props> = ({ inputHandler }) => {
  const [text, setText] = useState<string>('');

  const addTodoHandler: () => void = () => {
    inputHandler(text);
    setText('');
  };

  return (
    <Container>
      <Input
        placeholder="Add a Task"
        value={text}
        onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
          }
      />
      <SubmitButton
        colorScheme="blue"
        onClick={() => addTodoHandler()}
      >
        Add
      </SubmitButton>
    </Container>
  );
};

export default TodoInput;
