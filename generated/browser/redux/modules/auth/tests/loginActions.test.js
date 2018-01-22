'use strict';

import { expect } from 'chai';
import reducer, { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../auth';

const successRes = {
  user: { email: 'test@test.com', password: 'test1234' }
};

const failureRes = {
  response: { data: 'ERROR' }
};

export default function () {
  describe('LOGIN', () => {
    const nextState = reducer(
      { loading: false, error: failureRes },
      { type: LOGIN }
    );

    it('by setting \'loading\' to true', () => {
      expect(nextState.loading).to.be.true;
    });

    it('by setting \'error\' to null', () => {
      expect(nextState.error).to.be.null;
    });
  });

  describe('LOGIN_SUCCESS', () => {
    const nextState = reducer(
      { loading: true, loaded: false },
      { type: LOGIN_SUCCESS, result: successRes }
    );

    it('by setting \'loading\' to false', () => {
      expect(nextState.loading).to.be.false;
    });

    it('by setting \'loaded\' to true', () => {
      expect(nextState.loaded).to.be.true;
    });

    it('by setting \'user\'', () => {
      expect(nextState.user).to.exist;
    });
  });

  describe('LOGIN_FAILURE', () => {
    const nextState = reducer(
      { loading: true, loaded: false },
      { type: LOGIN_FAILURE, error: failureRes}
    );

    it('by setting \'loading\' to false', () => {
      expect(nextState.loading).to.be.false;
    });

    it('by setting \'error\'', () => {
      expect(nextState.error).to.exist;
    });

    it('by not setting \'loaded\' to true', () => {
      expect(nextState.loaded).to.be.false;
    });

    it('by not setting \'user\'', () => {
      expect(nextState.user).to.not.exist;
    });
  });
}
