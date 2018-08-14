import React from 'react';
import PropTypes from 'prop-types';
import { transaction as transactionPropTypes } from '../propTypes';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';

const StyledTransaction = styled.div`
  display: flex;
  align-items: center;
  border-color: ${({ theme }) => theme.itemSeparatorColor};
  border-bottom-style: solid;
  border-width: ${props => (props.withSeparator ? '2px' : '0px')};
  padding-bottom: 5px;
  margin-bottom: 10px;
  .left-part {
    flex-grow: 1;
    margin-right: 10px;
    overflow: hidden;
  }
  .recipient-name,
  .recipient-email {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .recipient-email {
    font-size: 0.75em; /* 12px / 16px*/
  }
`;

/** Component displaying information for a single transaction */
export const TransactionInfo = ({
  id,
  amount,
  currency,
  recipientName,
  recipientEmail,
  withSeparator,
}) => (
  <StyledTransaction withSeparator={withSeparator}>
    <div className="left-part">
      <div className="recipient-name">{recipientName}</div>
      <div className="recipient-email">{recipientEmail}</div>
    </div>
    <div>
      <FormattedNumber
        value={amount}
        // eslint-disable-next-line react/style-prop-object
        style="currency"
        currency={currency}
      />
    </div>
  </StyledTransaction>
);

TransactionInfo.defaultProps = {
  withSeparator: false,
};

TransactionInfo.propTypes = {
  ...transactionPropTypes,
  /** Whether a bottom border is displayed or not. Useful as a separator */
  withSeparator: PropTypes.bool,
};
