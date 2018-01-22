'use strict';

import { expect } from 'chai';
import reducer, { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../../auth';

const credentials = {
  email: 'test@test.com',
  password: 'test1234'
};

const failureRes = {
  response: { data: 'ERROR' }
};

export default function () {
  describe('LOGOUT', () => {
    const nextState = reducer(
      { loading: false, error: failureRes, user: credentials },
      { type: LOGOUT }
    );

    it('by setting \'loading\' to true', () => {
      expect(nextState.loading).to.be.true;
    });

    it('by setting \'error\' to null', () => {
      expect(nextState.error).to.be.null;
    });
  });

  describe('LOGOUT_SUCCESS', () => {
    const nextState = reducer(
      { loading: true, loaded: true, user: credentials },
      { type: LOGOUT_SUCCESS }
    );

    it('by setting \'loading\' to false', () => {
      expect(nextState.loading).to.be.false;
    });

    it('by setting \'loaded\' to false', () => {
      expect(nextState.loaded).to.be.false;
    });

    it('by setting \'user\' to null', () => {
      expect(nextState.user).to.be.null;
    });
  });

  describe('LOGOUT_FAILURE', () => {
    const nextState = reducer(
      { loading: true, loaded: true, user: credentials },
      { type: LOGOUT_FAILURE, error: failureRes }
    );

    it('by setting \'loading\' to false', () => {
      expect(nextState.loading).to.be.false;
    });

    it('by setting \'error\'', () => {
       expect(nextState.error).to.exist;
    });

    it('by not setting \'loaded\' to false', () => {
      expect(nextState.loaded).to.be.true;
    });

    it('by not setting \'user\' to null', () => {
      expect(nextState.user).to.exist;
    });
  });
}
