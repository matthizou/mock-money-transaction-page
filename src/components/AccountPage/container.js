import React from 'react';

import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { AccountPage } from './AccountPage';
import { Spinner } from '../Spinner';
import {
  getTransactions,
  transactionsSelector,
  balanceSelector,
  transactionTotalAmountSelector,
} from '../../services/transactionDuck';
import { accountSelector } from '../../services/accountDuck';

const mapStateToProps = state => {
  const balance = balanceSelector(state);
  const transferredFunds = transactionTotalAmountSelector(state);
  const transactions = transactionsSelector(state);
  const accountInfo = accountSelector(state);
  const { currency } = accountInfo;
  return {
    balance,
    transferredFunds,
    transactions,
    currency,
  };
};

const mapDispatchToProps = {
  getTransactions,
};

// const enhance = compose(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   ),
//   lifecycle({
//     componentDidMount() {
//       this.props.getTransactions();
//     },
//   }),
// );
// export const AccountPageContainer = enhance(AccountPage);

class Container extends React.Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    return <AccountPage {...this.props} />;
  }
}

export const AccountPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
