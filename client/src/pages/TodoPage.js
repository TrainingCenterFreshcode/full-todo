import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList/TodoList';
import { useNavigate } from "react-router-dom";
import { getTasks } from '../api/taskApi';

const TodoPage = (props) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!props.user) {
      return navigate('/');
    }
    getTasks(props.user._id)
    .then(result => {
      setTodos(result.data);
    })
    .catch(error => {
      console.error(error);
    })
  }, []);

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
    </>
  );
}

export default TodoPage;
