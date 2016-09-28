'use strict';

import { expect } from 'chai';
import nock from 'nock';
import {
  signup,
  SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../../auth';

const credentials = {
  email: 'test@test.com',
  password: 'test1234'
};

export default function (mockStore) {
  describe('signup', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ session: {} });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    const signupAPICall = nock(`http://localhost:8080`)
                          .post('/signup', credentials);

    it('creates SIGNUP when initially dispatched', () => {
      signupAPICall.reply(200, credentials);

      return store.dispatch(signup(credentials))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).to.include(SIGNUP);
        });
    });

    it('creates SIGNUP_SUCCESS with result when signup was successfully done', () => {
      signupAPICall.reply(200, credentials);

      return store.dispatch(signup(credentials))
        .then(() => {
          const actions = store.getActions().filter(action => {
            return action.result && action.type === SIGNUP_SUCCESS
          });
          expect(actions).to.have.length(1);
          expect(actions[0].type).to.equal(SIGNUP_SUCCESS);
          expect(actions[0].result).to.deep.equal(credentials);
        });
    });

    it ('creates SIGNUP_FAILURE when signup request fails', () => {
      signupAPICall.replyWithError({ message: 'Error occured' });

      return store.dispatch(signup(credentials))
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).to.include(SIGNUP_FAILURE);
        });
    });
  });
}
