'use strict';

import { expect } from 'chai';
import nock from 'nock';
import {
  login,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../../auth';

const credentials = {
  email: 'test@test.com',
  password: 'test1234'
};

export default function (mockStore) {
  describe('login', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ auth: {} });
    })

    afterEach(() => {
      nock.cleanAll();
    })

    const loginAPICall = () => nock(`http://localhost:${process.env.PORT || 1337}`)
                               .post('/login', credentials);

    it('creates LOGIN when initially dispatched', () => {
      loginAPICall().reply(200, credentials);

      return store.dispatch(login(credentials))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type)
          expect(actionTypes).to.include(LOGIN)
        });
    })

    it('creates LOGIN_SUCCESS when login was successfully done', () => {
      loginAPICall().reply(200, credentials);

      return store.dispatch(login(credentials))
        .then(() => {
          const actions = store.getActions().filter(action => {
            return action.result && action.type === LOGIN_SUCCESS
          });
          expect(actions).to.have.length(1);
          expect(actions[0].type).to.equal(LOGIN_SUCCESS);
          expect(actions[0].result).to.deep.equal(credentials);
        });
    })

    it('creates LOGIN_FAILURE when login request fails', () => {
      loginAPICall().replyWithError({ message: 'Invalid credentials' });

      return store.dispatch(login(credentials))
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type);
        expect(actionTypes).to.include(LOGIN_FAILURE);
      });
    });
  });
}


