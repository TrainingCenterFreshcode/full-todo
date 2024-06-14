import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = (props) => {
  return (
    <ol>
      {props.todos.map(td => <TodoItem item={td} key={td._id} />)}
    </ol>
  );
}

export default TodoList;
