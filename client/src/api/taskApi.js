import CONSTANTS from '../constants';

export const getTasks = async (userId) => {
  const response = await fetch(`${CONSTANTS.API_BASE}/tasks/${userId}`);

  if(response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response.json();
}