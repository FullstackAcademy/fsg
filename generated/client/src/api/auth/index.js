'use strict';

import axios from 'axios';
import { parseJSON, parseData } from '../../utils';

const BASE_URL = process.env.URL || `http://localhost:${process.env.PORT || 1337}`;

export const fetchSession = () => {
  return axios.get(`${BASE_URL}/session`).then(parseData);
}

export const tryLogin = (credentials) => {
  return axios.post(`${BASE_URL}/login`, credentials);
}

export const tryLogout = () => {
  return axios.get(`${BASE_URL}/logout`);
}

const auth = {
  fetchSession,
  tryLogin,
  tryLogout
}

export default auth;
