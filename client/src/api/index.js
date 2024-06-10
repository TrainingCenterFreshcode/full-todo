import CONSTANTS from '../constants';

export const registerUser = (data) => {
  return fetch(`${CONSTANTS.API_BASE}/user/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json());
}