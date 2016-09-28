'use strict';

import axios from 'axios';
import { parseData } from '../../utils';

const BASE_URL = process.env.URL || `http://localhost:${process.env.PORT || 1337}`;

export const getStash = () => {
  return axios.get(`${BASE_URL}/api/members/secret-stash`).then(parseData);
}

const secretStash = {
  getStash
}

export default secretStash;
