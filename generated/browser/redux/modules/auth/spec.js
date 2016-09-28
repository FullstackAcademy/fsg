'use strict';

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from '../../middleware/promise';
import reducer from '../auth';
import * as test from './tests';

const middlewares = [ thunk, promise ];
const mockStore = configureMockStore(middlewares);

describe('MODULE - auth:', () => {
  describe('ACTIONS', () => {
    let store = mockStore({ session: {} });

    // isLoaded action test
    test.isLoaded(mockStore);

    // load action tests
    test.load(mockStore);

    // login action tests
    test.login(mockStore);

    // logout action tests
    test.logout(mockStore);

  });

  describe('REDUCER', () => {

    const initialState = {
      loaded: false
    };

    it('returns the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState)
    });

    describe('handles actions', () => {
      // LOAD action tests
      test.loadActions();

      // LOGIN action tests
      test.loginActions();

      // LOGOUT action tests
      test.logoutActions();
    });

  });

});
