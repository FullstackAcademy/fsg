'use strict';

import { push } from 'react-router-redux';
import { auth } from '../../../api';

export const LOAD           = 'LOAD';
export const LOAD_SUCCESS   = 'LOAD_SUCCESS';
export const LOAD_FAILURE   = 'LOAD_FAILURE';
export const LOGIN          = 'LOGIN';
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE  = 'LOGIN_FAILURE';
export const LOGOUT         = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function isLoaded (globalState) {
  return globalState.auth && globalState.auth.loaded
}

export const load = () => (dispatch, getState) => {
  dispatch({ type: LOAD });
  const { auth: { user } } = getState();

  if (user) {
    dispatch({ type: LOAD_SUCCESS, user });
  } else {
    return auth.fetchSession()
      .then(
        result => dispatch({ type: LOAD_SUCCESS, result }),
        error => dispatch({ type: LOAD_FAILURE, error })
      )
      .catch(error => {
        dispatch({
          type: LOAD_FAILURE,
          error: error.message || `An error occured`
        })
      });
  }
}

export function login (credentials) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: auth.tryLogin(credentials)
  }
}

export function logout () {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    promise: auth.tryLogout()
  }
}

const initialState = {
  loaded: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loadError: null
      }
    case LOGIN:
    case LOGOUT:
      return {
        ...state,
        loading: true,
        error: null
      }
    case LOAD_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.user
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: false,
        user: null
      }
    case LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        loadError: action.error.response
      }
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.response
      }
    default:
      return state
  }
}
