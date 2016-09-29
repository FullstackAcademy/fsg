'use strict';

import { expect } from 'chai';
import nock from 'nock';
import {
  load,
  LOAD, LOAD_SUCCESS, LOAD_FAILURE
} from '../../auth';

const credentials = {
  email: 'test@test.com',
  password: 'test1234'
};

export default function (mockStore) {
  describe('load', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ auth: {} });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    const sessionAPICall = nock(`http://localhost:${process.env.PORT || 1337}`)
                          .get('/session');

    it('creates LOAD when initially dispatched', () => {
      sessionAPICall.reply(200, credentials);

      return store.dispatch(load())
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type)
          expect(actionTypes).to.include(LOAD)
        });
    });

    it('creates LOAD_SUCCESS with result when load was successfully done', () => {
      sessionAPICall.reply(200, credentials);

      return store.dispatch(load())
        .then(() => {
          const actions = store.getActions().filter(action => {
            return action.result && action.type === LOAD_SUCCESS
          });
          expect(actions).to.have.length(1);
          expect(actions[0].type).to.equal(LOAD_SUCCESS);
          expect(actions[0].result).to.deep.equal(credentials);
        });
    });

    it ('creates LOAD_FAILURE when load request fails', () => {
      sessionAPICall.replyWithError({ message: 'Error occured' });

      return store.dispatch(load())
        .then(() => {
          const actionTypes = store.getActions().map(action => action.type);
          expect(actionTypes).to.include(LOAD_FAILURE);
        });
    });
  });
}
