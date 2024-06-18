import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList/TodoList';
import { useNavigate } from "react-router-dom";
import { getTasks, createTask } from '../api/taskApi';
import TodoForm from '../components/TodoForm/TodoForm';
import { authUser } from '../api/userApi';

const TodoPage = (props) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /*

    1. Перевіряємо, чи є у нас юзер у стейті реакту?
      1.1 Якщо юзер у нас є - все ок, працюємо
      1.2 Якщо юзера у нас немає - залазимо в localStorage і дивимось, чи є у юзера токен
        1.2.1 Якщо токен є - беремо цей токен і з його допомогою авторизуємо запит на отримання тасок.
        Сервер перевіряє, чи валідний токен, чи ні
          1.2.1.1 Якщо токен невалідний - на сервері повертаємо помилку, на фронті перенаправляємось на сторінку аутенфікації
          1.2.1.2 Якщо токен валідний - сервер просто виконує запит і повертає нам відповідь
        1.2.2 Якщо токена немає - перенаправляємось на сторінку аутенфікації і змушуємо користувача проходити аутенфікацію знову
    */

    if(!props.user) {
      const token = localStorage.getItem('token');
      if(token) {
        // робимо запит на отримання юзера
        authUser(token)
        .then(userData => {
          props.sendUser(userData.data);
        })
        .catch(error => {
          // перенаправляємось на аутенфікацію
          return navigate('/');
        });
      } else {
        // перенаправляємось на аутенфікацію
        return navigate('/');
      }
    } else {
      getTasks(props.user._id)
      .then(result => {
        setTodos(result.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [props.user]);

  const getNewTd = (data) => {
    createTask({
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
