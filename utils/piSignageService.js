//import { post, get } from 'axios';
import { USERNAME, PASSWORD, API_BASE } from '../config/credentials.js';
import axios from 'axios';
//const { USERNAME, PASSWORD, API_BASE } = require('../config/credentials');

let token = null;

async function login() {
  const response = await axios.post(`${API_BASE}/session`, {
    email: USERNAME,
    password: PASSWORD,
    getToken: true,
  });

  if (response.data?.token) {
    token = response.data.token;
    return token;
  } else {
    throw new Error('Token not received');
  }
}

async function getPlayers() {
  if (!token) {
    await login(); // auto login
  }

  const response = await axios.get(`${API_BASE}/players`, {
    headers: {
      'x-access-token': token
    }
  });

  return response.data;
}

export { login, getPlayers };
