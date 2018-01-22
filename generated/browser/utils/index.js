'use strict';

export function parseJSON (response) {
  return response.text()
  .then(text => text ? JSON.parse(text) : {})
}

export const parseData = res => res.data;
