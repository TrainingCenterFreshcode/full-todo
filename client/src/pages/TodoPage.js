import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList/TodoList';
import { useNavigate } from "react-router-dom";
import { getTasks, createTask } from '../api/taskApi';
import TodoForm from '../components/TodoForm/TodoForm';

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

  const getNewTd = (data) => {
    createTask({
      authorId: props.user._id,
      status: 'new',
      ...data
    })
    .then(({ data: createdTask }) => {
      const newTodo = [...todos, createdTask];
      setTodos(newTodo);
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm sendData={getNewTd} />
      <TodoList todos={todos} />
    </>
  );
}

export default TodoPage;
