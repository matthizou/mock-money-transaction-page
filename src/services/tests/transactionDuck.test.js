import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk-fsa';
import configureMockStore from 'redux-mock-store';
import { TRANSACTION_URL } from '../api';
import reducer, {
  INITIAL_STATE,
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  getTransactions,
  addTransaction,
  transactionsSelector,
  transactionTotalAmountSelector,
  balanceSelector,
  INITIAL_AMOUNT,
} from '../transactionDuck';

describe('transaction action creators', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it(`creates a ${GET_TRANSACTIONS} action when fetching transactions has been done`, () => {
    fetchMock.getOnce(TRANSACTION_URL, {
      body: MOCK_TRANSACTIONS,
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({ transactions: [] });

    return store.dispatch(getTransactions()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: GET_TRANSACTIONS,
        payload: MOCK_TRANSACTIONS,
      });
    });
  });

  it(`creates a ${ADD_TRANSACTION} action after posting the new transaction has been done`, () => {
    fetchMock.postOnce(TRANSACTION_URL, {
      body: MOCK_TRANSACTION_1,
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({ transactions: [] });

    return store.dispatch(addTransaction(MOCK_TRANSACTION_1)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: ADD_TRANSACTION,
        payload: MOCK_TRANSACTION_1,
      });
    });
  });
});

describe('transaction reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it(`should handle ${GET_TRANSACTIONS}`, () => {
    const state = [];
    const transactions = [MOCK_TRANSACTION_1, MOCK_TRANSACTION_2];

    expect(
      reducer(state, {
        type: GET_TRANSACTIONS,
        payload: transactions,
      }),
    ).toEqual(transactions);
  });

  it(`should handle ${ADD_TRANSACTION}`, () => {
    const state = [MOCK_TRANSACTION_1];
    const newTransaction = MOCK_TRANSACTION_2;

    expect(
      reducer(state, {
        type: ADD_TRANSACTION,
        payload: newTransaction,
      }),
    ).toEqual([MOCK_TRANSACTION_2, MOCK_TRANSACTION_1]);
  });
});

describe('Selectors', () => {
  describe('transactionsSelector', () => {
    it('should return expected value', () => {
      expect(transactionsSelector(MOCK_STATE)).toBe(MOCK_TRANSACTIONS);
    });
  });

  describe('transactionTotalAmountSelector', () => {
    it('should return expected value', () => {
      const actual = transactionTotalAmountSelector(MOCK_STATE);
      const expected = MOCK_TRANSACTIONS.reduce(
        (res, transaction) => res + transaction.amount,
        0,
      );
      expect(actual).toBe(expected);
    });
  });

  describe('transactionTotalAmountSelector', () => {
    it('should return expected value', () => {
      const actual = balanceSelector(MOCK_STATE);
      const expected =
        INITIAL_AMOUNT - transactionTotalAmountSelector(MOCK_STATE);
      expect(actual).toBe(expected);
    });
  });
});

//
// MOCK DATA
//
const MOCK_TRANSACTION_1 = {
  amount: 5500,
  recipientName: 'Jason Bourne',
  recipientEmail: 'jb@toughDude.com',
};

const MOCK_TRANSACTION_2 = {
  amount: 3000,
  recipientName: 'John Wick',
  recipientEmail: 'jw@toughDude.com',
};

const MOCK_TRANSACTIONS = [MOCK_TRANSACTION_1, MOCK_TRANSACTION_2];
const MOCK_STATE = { transactions: MOCK_TRANSACTIONS };
