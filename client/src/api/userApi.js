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

  const { data: userData, tokens } = await response.json(); //  { data: {}, tokens: {} }
  // tokens -> localStorage
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);

  return userData;
}

export const authUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken) {
    const response = await fetch(`${CONSTANTS.API_BASE}/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    if(response.status === 403) {
      await refreshSession();
      return await authUser()
    } else {
      return response.json();
    }
  } else {
    return history.push('/');
  }
}


export async function refreshSession() {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${CONSTANTS.API_BASE}/users/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  });

  if(response.status === 401) {
    return history.push('/');
  }

  const { tokens } = await response.json();
  localStorage.setItem('refreshToken', tokens.refreshToken);
  localStorage.setItem('accessToken', tokens.accessToken);

  return;
}