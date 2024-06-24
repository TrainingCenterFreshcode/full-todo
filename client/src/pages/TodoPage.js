import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList/TodoList';
// import { getTasks, createTask, deleteTask } from '../api/taskApi';
import { getTasks, createTask, deleteTask } from '../api/axiosApi';
import TodoForm from '../components/TodoForm/TodoForm';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTasks()
    .then(({ data: { data } }) => {
      setTodos(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const getNewTd = (data) => {
    createTask({
      status: 'new',
      ...data
    })
    .then(({ data: { data: createdTask } }) => {
      const newTodo = [...todos, createdTask];
      setTodos(newTodo);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const delTask = (id) => {
    deleteTask(id)
    .then(({ data: { data: deletedTask } }) => {
      const filteredArray = todos.filter(td => td._id !== deletedTask._id);
      setTodos(filteredArray);
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm sendData={getNewTd} />
      <TodoList todos={todos} delCallback={delTask} />
    </>
  );
}

export default TodoPage;
