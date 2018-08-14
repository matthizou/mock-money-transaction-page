import React from 'react';
import { connect } from 'react-redux';
import { addTransaction } from '../../services/transactionDuck';
import { accountSelector } from '../../services/accountDuck';
import { balanceSelector } from '../../services/transactionDuck';
import { validateField } from './utils/validateField';
import { SendMoneyForm } from './SendMoneyForm';
import { mapInputs } from './utils/mapInputs';

class Container extends React.Component {
  state = mapInputs(name => ({
    value: '',
    error: '',
  }));

  /** Handler for when the value of an input is changed */
  handleChange = event => {
    const { name, value } = event.target;

    if (name) {
      const { balance } = this.props;
      const error = validateField(name, value, { accountBalance: balance });

      this.setState({
        [name]: { value, error },
      });
    }
  };

  /** Function that will execute validation on each input, and update the state accordingly */
  validateForm = () => {
    const { balance } = this.props;
    const state = this.state;
    const extraData = { accountBalance: balance };

    // Validate each input
    const validatedInputs = mapInputs(name => {
      const { value } = state[name];
      return {
        value,
        error: validateField(name, value, extraData),
      };
    }, this);

    const isFormValid = Object.values(validatedInputs).every(
      data => data.error === '',
    );
    // Update state
    this.setState({
      ...validatedInputs,
    });

    return isFormValid;
  };

  /** Handler for when the form is submitted */
  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm()) {
      const state = this.state;
      const values = mapInputs(name => state[name].value);
      const { name: recipientName, email: recipientEmail } = values;
      const amount = parseFloat(values.amount, 10);
      // Submit the data
      this.props
        .handleSubmit({
          recipientName,
          recipientEmail,
          amount,
        })
        .then(() => {
          // Empty form
          const emptyFormData = mapInputs(name => ({
            value: '',
            error: '',
          }));
          this.setState(emptyFormData);
        });
    }
  };

  render() {
    const { currency } = this.props;
    const { name, email, amount } = this.state;
    const data = { name, email, amount };

    return (
      <SendMoneyForm
        data={data}
        currency={currency}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => {
  const accountInfo = accountSelector(state);
  const balance = balanceSelector(state);
  const { currency } = accountInfo;
  return {
    currency,
    balance,
  };
};

const mapDispatchToProps = { handleSubmit: values => addTransaction(values) };

export const SendMoneyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
