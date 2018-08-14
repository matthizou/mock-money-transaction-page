import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from './Input';
import { getCurrencySymbol } from '../../common/i18n';

const Wrapper = styled.span`
  position: relative;
  display: flex;

  &:before {
    position: absolute;
    top: 3px;
    content: '${props => getCurrencySymbol(props.currency)}';
  }
  input {
    padding-left: 0.875em; /* 14 / 16px */
  }
`;

/** Component that displays a input with a currency symbol in it */
export const InputWithCurrency = ({ currency, ...input }) => (
  <Wrapper currency={currency}>
    <Input type="number" {...input} />
  </Wrapper>
);

InputWithCurrency.propTypes = {
  /** Currency code (i.e: 'GBP') */
  currency: PropTypes.string.isRequired,
};
