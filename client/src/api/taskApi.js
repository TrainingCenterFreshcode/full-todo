import CONSTANTS from '../constants';

export const getTasks = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if(response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}

export const createTask = async (data) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if(response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}