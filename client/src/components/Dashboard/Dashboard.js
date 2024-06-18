import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../api/userApi';
import TodoPage from '../../pages/TodoPage';

const Dashboard = (props) => {
  const [isUser, setIsUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(!props.user) {
      const token = localStorage.getItem('token');
      if(token) {
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
      setIsUser(true);
    }
  }, [props.user]);

  return (
    <>
      {isUser ? <TodoPage /> : null}
    </>
  );
}

export default Dashboard;
