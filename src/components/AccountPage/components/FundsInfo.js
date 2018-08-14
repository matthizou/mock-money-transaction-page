import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import styled from 'styled-components';
import { DonutChart } from './DonutChart';

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5em; /* 80px / 16px */
  min-width: 20em; /* 320px / 16px */
`;

const Caption = styled.figcaption`
  text-align: ${props => (props.textAlignRight ? 'right' : 'left')};
  min-width: 6em; /* 96px / 16px */
`;

const DonutChartContainer = styled.figure`
  width: 4em;
  height: 4em;
  margin: 0 2em;
`;

/** Component that displays information about the funds in the account (available, sent)  */
export const FundsInfo = ({ balance, transferredFunds, currency }) => (
  <Section>
    <Caption textAlignRight>
      <FormattedNumber
        value={transferredFunds}
        // eslint-disable-next-line react/style-prop-object
        style="currency"
        currency={currency}
      />
      <br />
      <span>total sent</span>
    </Caption>
    <DonutChartContainer>
      <DonutChart value={balance} total={balance + transferredFunds} />
    </DonutChartContainer>
    <Caption>
      <FormattedNumber
        value={balance}
        // eslint-disable-next-line react/style-prop-object
        style="currency"
        currency={currency}
      />
      <br />
      <span>left available</span>
    </Caption>
  </Section>
);

FundsInfo.propTypes = {
  /** The account's balance */
  balance: PropTypes.number.isRequired,
  /** Amount transferred in previous transactions */
  transferredFunds: PropTypes.number.isRequired,
  /** Currency code (i.e: 'GBP') */
  currency: PropTypes.string.isRequired,
};
