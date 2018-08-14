import { call, put } from 'redux-saga/effects';
import fetchMock from 'fetch-mock';

import reducer, { getAccountInfoSaga, SET_ACCOUNT_INFO } from '../accountDuck';
import { ACCOUNT_URL, getAccountInfo } from '../api';

const MOCK_ACCOUNT_DETAILS = {
  currency: 'GBP',
  userDisplayName: 'Hulk Hogan',
};

describe('accountDuck', () => {
  describe('action creators', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    describe('getAccountInfoSaga', () => {
      it('should ', () => {
        const gen = getAccountInfoSaga();
        expect(gen.next().value).toEqual(call(getAccountInfo));
        expect(gen.next(MOCK_ACCOUNT_DETAILS).value).toEqual(
          put({ type: SET_ACCOUNT_INFO, payload: MOCK_ACCOUNT_DETAILS }),
        );
      });
    });
  });

  describe('reducers', () => {
    it(`should handle ${SET_ACCOUNT_INFO}`, () => {
      const state = {};
      expect(
        reducer(state, {
          type: SET_ACCOUNT_INFO,
          payload: MOCK_ACCOUNT_DETAILS,
        }),
      ).toEqual(MOCK_ACCOUNT_DETAILS);
    });
  });
});
