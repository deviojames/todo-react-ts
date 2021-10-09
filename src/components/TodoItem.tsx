import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Button } from '@chakra-ui/react';

interface Props {
  title: string;
  isCompleted: boolean;
  checkBoxHandler: () => void;
  onDeleteTodo: () => void;
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  padding: 5px;
  justify-content: space-between;
`;

const TodoItem: React.FC<Props> = ({
  title,
  isCompleted,
  checkBoxHandler,
  onDeleteTodo,
}) => {
  const [checkedItem, setCheckedItem] = useState(isCompleted);

  const onCheckBoxChange = (checked: boolean): void => {
    setCheckedItem(checked);
    checkBoxHandler();
  };

  return (
    <Container>
      <Checkbox
        size="lg"
        isChecked={checkedItem}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckBoxChange(e.target.checked)}
      >
        {checkedItem ? <del>{title}</del> : title}
      </Checkbox>
      <Button colorScheme="red" size="sm" onClick={() => onDeleteTodo()}>
        Delete
      </Button>
    </Container>
  );
};

export default TodoItem;
