'use strict';

import { expect } from 'chai';
import reducer, { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../../auth';

const successRes = {
  user: { email: 'test@test.com', password: 'test1234' }
};

const failureRes = {
  response: { data: 'ERROR' }
};

export default function () {
  describe('SIGNUP', () => {
    const nextState = reducer(
      { loading: false, error: failureRes },
      { type: SIGNUP }
    );

    it('by setting \'loading\' to true', () => {
      expect(nextState.loading).to.be.true;
    });

    it('by setting \'error\' to null', () => {
      expect(nextState.error).to.be.null;
    });
  });

  describe('SIGNUP_SUCCESS', () => {
    const nextState = reducer(
      { loading: true, loaded: false },
      { type: SIGNUP_SUCCESS, result: successRes }
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

  describe('SIGNUP_FAILURE', () => {
    const nextState = reducer(
      { loading: true, loaded: false },
      { type: SIGNUP_FAILURE, error: failureRes}
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
