import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk-fsa';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import transactionReducer from '../services/transactionDuck';
import accountReducer, { sagas as accountSagas } from '../services/accountDuck';

const createRootReducer = () => {
  return combineReducers({
    account: accountReducer,
    transactions: transactionReducer,
  });
};

const createRootSaga = function*() {
  yield all([accountSagas()]);
};

/** Initialize the application store */
export const configureStore = () => {
  const rootReducer = createRootReducer();
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware, thunkMiddleware);
  const devToolsExtension = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;
  const enhancers = compose(
    middleware,
    devToolsExtension,
  );
  const store = createStore(rootReducer, {}, enhancers);
  sagaMiddleware.run(createRootSaga);
  return store;
};
