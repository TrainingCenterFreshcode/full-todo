import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList/TodoList';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
    </>
  );
}

export default TodoPage;
