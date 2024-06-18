import CONSTANTS from '../constants';
import history from '../BrowserHistory';

export const registerUser = async (data) => {
  const response = await fetch(`${CONSTANTS.API_BASE}/users/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if(response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}

export const loginUser = async (data) => {
  const response = await fetch(`${CONSTANTS.API_BASE}/users/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if(response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}

export const authUser = async (token) => {
  const response = await fetch(`${CONSTANTS.API_BASE}/users`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if(response.status === 403) {
    const error = await response.json();
    history.push('/');
    return Promise.reject(error);
  }

  return response.json();
}