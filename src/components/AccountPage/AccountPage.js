import React from 'react';
import styled from 'styled-components';
import { TransactionList, FundsInfo } from './components';

const Header = styled.h1`
  margin-bottom: 35px;
`;

export const AccountPage = ({
  balance,
  transferredFunds,
  transactions,
  currency,
}) => (
  <article>
    <Header>My account</Header>
    <FundsInfo
      balance={balance}
      transferredFunds={transferredFunds}
      currency={currency}
    />
    <section>
      <h2>Transactions</h2>
      <TransactionList transactions={transactions} currency={currency} />
    </section>
  </article>
);
