import { createSelector } from 'reselect';
import * as api from './api';

// ACTIONS TYPES
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

// SELECTORS
export const transactionsSelector = state => state.transactions;

export const transactionTotalAmountSelector = createSelector(
  transactionsSelector,
  transactions =>
    transactions.reduce((res, transaction) => res + transaction.amount, 0),
);

// Notes: Obviously, in real life we'll query the server to know the account balance.
// I am taking a shortcut here to have it as derived state data, getting the value
// using a hardcoded initial amount and the total amount of the transactions
export const INITIAL_AMOUNT = 40000;
export const balanceSelector = createSelector(
  transactionTotalAmountSelector,
  transactionTotal => INITIAL_AMOUNT - transactionTotal,
);

// REDUCER
export const INITIAL_STATE = [];
export default function reducer(state = INITIAL_STATE, action = {}) {
  const { payload } = action;
  switch (action.type) {
    case GET_TRANSACTIONS:
      return payload;
    case ADD_TRANSACTION:
      return [payload, ...state];
    default:
      return state;
  }
}

// ACTION CREATORS
/** Get list of transactions */
export const getTransactions = () => async dispatch => {
  try {
    const data = await api.getTransactions();
    dispatch({
      type: GET_TRANSACTIONS,
      payload: data,
    });
  } catch (e) {
    console.error('Error while loading the transaction list:' + e);
  }
};

/** Add a transaction */
export const addTransaction = transaction => async dispatch => {
  try {
    const transactionServerData = await api.addTransaction(transaction);
    dispatch({
      type: ADD_TRANSACTION,
      payload: transactionServerData,
    });
  } catch (e) {
    console.error('Error while adding transaction:' + e);
  }
};
