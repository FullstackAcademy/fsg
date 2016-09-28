'use strict';

import { parseJSON, parseData } from '../../utils'

export default () => next => action => {

  const { promise, types, ...rest } = action

  if (!promise) {
    return next(action)
  }

  const [REQUEST, SUCCESS, FAILURE] = types
  next({ ...rest, type: REQUEST })

  return promise
  .then(parseData)
  .then(
    result => next({ ...rest, result, type: SUCCESS }),
    error => next({ ...rest, error, type: FAILURE})
  )
  .catch(error => {
    next({
      ...rest,
      error: `MIDDLEWARE ERROR: ${error.message}`,
      type: FAILURE
    })
  })
}
