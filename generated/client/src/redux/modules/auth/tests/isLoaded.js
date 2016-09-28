'use strict';

import { expect } from 'chai';
import { isLoaded } from '../../auth';

export default function (mockStore) {
  describe('isLoaded', () => {
    let store;

    it('returns true if session has been loaded', () => {
      store = mockStore({ session: { loaded: true }});
      console.log('STORE:', store);
      expect(isLoaded(store.getState())).to.be.true;
    });

    it('returns false if session has not been loaded', () => {
      store = mockStore({ session: { loaded: false }});
      expect(isLoaded(store.getState())).to.be.false;
    });
  });
}
