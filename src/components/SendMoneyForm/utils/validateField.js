import isEmail from 'validator/lib/isEmail';
import isDecimal from 'validator/lib/isDecimal';
import { defineMessages } from 'react-intl';
import { MINIMUM_AMOUNT } from '../constants';

export const ERROR_MESSAGE = defineMessages({
  required: 'Please enter a value',
  invalidEmail: 'Please enter a valid email',
  invalidNumber: 'Please enter a valid number',
  negativeNumber: 'Please enter a positive number',
  insufficientFunds: 'You do not have sufficient funds',
  amountTooSmall: 'The minimum amount for a transaction is: {minimal_amount}',
});

export const VALIDATION_PASSED = '';

export const validateField = (name, value, extraData = {}) => {
  if (value === '') {
    return ERROR_MESSAGE.required;
  }
  switch (name) {
    case 'email':
      if (!isEmail(value)) {
        return ERROR_MESSAGE.invalidEmail;
      }
      break;
    case 'amount':
      const { accountBalance = 0 } = extraData;
      if (!isDecimal(value)) {
        return ERROR_MESSAGE.invalidNumber;
      }
      const numberValue = parseFloat(value, 10);
      if (numberValue < 0) {
        return ERROR_MESSAGE.negativeNumber;
      }
      if (numberValue < MINIMUM_AMOUNT) {
        return ERROR_MESSAGE.amountTooSmall.replace(
          '{minimal_amount}',
          MINIMUM_AMOUNT,
        );
      }
      if (numberValue > accountBalance) {
        return ERROR_MESSAGE.insufficientFunds;
      }
      break;
    default:
      break;
  }
  return VALIDATION_PASSED;
};
