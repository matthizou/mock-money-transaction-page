import React from 'react';
import PropTypes from 'prop-types';
import { transaction as transactionPropTypes } from '../propTypes';
import { TransactionInfo } from './TransactionInfo';

export const NoTransactions = () => <p>No transactions</p>;

/** Component to display a list of transactions */
export const TransactionList = ({ transactions, currency }) => {
  const length = transactions.length;
  if (!length) {
    return <NoTransactions />;
  }
  return (
    <div>
      {transactions.map((transaction, index) => (
        <TransactionInfo
          key={transaction.id}
          {...transaction}
          currency={currency}
          withSeparator={index !== length - 1}
        />
      ))}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape(transactionPropTypes))
    .isRequired,
};
