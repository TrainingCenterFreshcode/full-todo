import React from 'react';

const TodoList = (props) => {
  return (
    <ol>
      {props.todos.map(td => <li>{td}</li>)}
    </ol>
  );
}

export default TodoList;
