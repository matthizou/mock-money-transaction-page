import * as api from './api';
import { put, call, takeEvery } from 'redux-saga/effects';
import { CURRENCY_CODE } from '../common/i18n';

// Actions types
export const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';
export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';

// Selectors
export const accountSelector = state => state.account;

// Initial values
const INITIAL_STATE = {
  currency: CURRENCY_CODE.PoundSterling,
  userDisplayName: '', // Not used, but just to have an idea of what is going there
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  const { payload } = action;
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return payload;
    default:
      return state;
  }
}

// Action Creators
export const getAccountInfo = () => ({ type: GET_ACCOUNT_INFO });

// Sagas
export function* getAccountInfoSaga() {
  try {
    const data = yield call(api.getAccountInfo);
    yield put({ type: SET_ACCOUNT_INFO, payload: data });
  } catch (e) {
    console.error('Error while loading the account data:' + e);
  }
}

export function* sagas() {
  yield takeEvery(GET_ACCOUNT_INFO, getAccountInfoSaga);
}

// Thunk version
// export const getAccountInfo_thunk = () => async dispatch => {
//   try {
//     const data = await api.getAccountInfo();
//     dispatch({ type: SET_ACCOUNT_INFO, payload: data });
//   } catch (e) {
//     console.error('Error while loading the account data:' + e);
//   }
// };
