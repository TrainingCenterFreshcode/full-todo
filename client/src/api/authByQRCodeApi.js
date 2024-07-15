import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: `http://${CONSTANTS.API_BASE}`, // http://10.1.131.46:5001/api
});

export const authByQRCode = async (refreshtoken) =>
  await httpClient.post('/users/authByQRCode', refreshtoken);

export default httpClient;
