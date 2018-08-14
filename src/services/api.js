import { post, get, sleep } from '../common/http';

const BASE_API_URL = 'http://localhost:3004';
export const TRANSACTION_URL = `${BASE_API_URL}/transactions`;
export const ACCOUNT_URL = `${BASE_API_URL}/profile`;

export const addTransaction = async transaction =>
  await post(TRANSACTION_URL, transaction);
export const getTransactions = async () => {
  await sleep(2000);
  return await get(TRANSACTION_URL);
};
export const getAccountInfo = async () => await get(ACCOUNT_URL);
