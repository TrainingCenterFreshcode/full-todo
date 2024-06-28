import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList/TodoList';
import TodoForm from '../components/TodoForm/TodoForm';
import { getTasksRequest, createTaskRequest, deleteTaskRequest } from '../actions/actionCreator';
import { connect } from 'react-redux';

const TodoPage = (props) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    props.getTasksRequest();
  }, []);

  const getNewTd = (data) => {
    props.createTaskRequest({
      status: 'new',
      ...data
    });
  }

  const delTask = (id) => {
    props.deleteTaskRequest(id);
  }

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm sendData={getNewTd} />
      <TodoList todos={props.tasks} delCallback={delTask} />
    </>
  );
}

const mapStateToProps = ({ tasks }) => ({ tasks });

const mapDispatchToProps = {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
