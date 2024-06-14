import CONSTANTS from '../constants';

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