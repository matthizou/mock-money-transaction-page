import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../style/media';
import { Button } from '../Button';
import { InputWithCurrency } from '../Input';
import { FormField } from './components/FormField';

const Header = styled.h1`
  margin-bottom: 35px;
`;

const Form = styled.form`
  label,
  input,
  button {
    display: block;
    width: 100%;
  }
`;

const SubmitButton = Button.extend.attrs({ type: 'submit' })`
  margin-top: 80px;
  ${media.phone`margin-top: 35px;`};
`;

/** Form component used to send money */
export const SendMoneyForm = ({
  handleSubmit,
  handleChange,
  data,
  currency,
}) => {
  const { name = {}, email = {}, amount = {} } = data;

  return (
    <section>
      <Header>Send money</Header>
      <Form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          type="text"
          name="name"
          value={name.value || ''}
          errorMessage={name.error || ''}
          onChange={handleChange}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={email.value}
          errorMessage={email.error}
          onChange={handleChange}
        />
        <FormField
          component={InputWithCurrency}
          currency={currency}
          label="Amount"
          type="number"
          name="amount"
          value={amount.value}
          errorMessage={amount.error}
          onChange={handleChange}
        />
        <SubmitButton>Send</SubmitButton>
      </Form>
    </section>
  );
};

const dataItemShape = PropTypes.shape({
  value: PropTypes.string,
  error: PropTypes.string,
});

SendMoneyForm.propTypes = {
  /** Currency code (i.e: 'GBP') */
  currency: PropTypes.string.isRequired,
  /**  */
  data: PropTypes.shape({
    name: dataItemShape,
    email: dataItemShape,
    amount: dataItemShape,
  }).isRequired,
  /** Handler for when the value of an input is changed */
  handleChange: PropTypes.func.isRequired,
  /** Handler for when the form is submitted */
  handleSubmit: PropTypes.func.isRequired,
};
