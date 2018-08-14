import {
  validateField,
  ERROR_MESSAGE,
  VALIDATION_PASSED,
} from '../utils/validateField';
import { MINIMUM_AMOUNT } from '../constants';

describe('validateField()', () => {
  // EMAIL
  describe('When validating the email field', () => {
    const validateEmail = value => validateField('email', value);

    it('should fail if no value has been entered', () => {
      const validationMessage = validateEmail('');
      expect(validationMessage).toBe(ERROR_MESSAGE.required);
    });

    it('should fail for malformed email addresses', () => {
      const { invalidEmail } = ERROR_MESSAGE;
      // Email validation is quite complex and has been deleguated to a 3rd party library (validator.js),
      // which is in charge of testing all cases. We just double check here a few common cases.
      // List from: http://www.2ndimpression.co.uk/tips/typical-typos-in-email-addresses

      // Full stop at end of address
      expect(validateEmail('lukaModric@worldcup.cr.')).toBe(invalidEmail);
      // Comma instead of full stop
      expect(validateEmail('lukaModric@worldcup,cr')).toBe(invalidEmail);
      // Semi-colon instead of @
      expect(validateEmail('lukaModric;worldcup.cr')).toBe(invalidEmail);
      // Spaces in middle or at end of address
      expect(validateEmail('luka Modric@worldcup.cr')).toBe(invalidEmail);
      // Double periods
      expect(validateEmail('lukaModric@worldcup..cr')).toBe(invalidEmail);
    });

    it('should succeed if for properly formed email', () => {
      const validationMessage = validateEmail('lukaModric@worldcup.cr');
      expect(validationMessage).toBe(VALIDATION_PASSED);
    });
  });

  // AMOUNT
  describe('When validating the amount field,', () => {
    const validateAmount = value =>
      validateField('amount', value, { accountBalance: 1000 });

    it('should fail if no value has been entered', () => {
      const validationMessage = validateAmount('');
      expect(validationMessage).toBe(ERROR_MESSAGE.required);
    });

    it('should fail if the value is an invalid number', () => {
      const validationMessage = validateAmount('8A0O');
      expect(validationMessage).toBe(ERROR_MESSAGE.invalidNumber);
    });

    it('should fail if the value is negative', () => {
      const validationMessage = validateAmount('-10');
      expect(validationMessage).toBe(ERROR_MESSAGE.negativeNumber);
    });

    it('should fail if the value is too low', () => {
      const validationMessage = validateAmount('0');
      expect(validationMessage).toBe(
        ERROR_MESSAGE.amountTooSmall.replace(
          '{minimal_amount}',
          MINIMUM_AMOUNT,
        ),
      );
    });

    it('should fail with an "insufficient funds" error if the entered amount is greater than the account balance', () => {
      const validationMessage = validateAmount('1001');
      expect(validationMessage).toBe(ERROR_MESSAGE.insufficientFunds);
    });

    it('should succeed if the entered amount is equal to the account balance', () => {
      const validationMessage = validateAmount('1000');
      expect(validationMessage).toBe(VALIDATION_PASSED);
    });

    it('should succeed if the entered amount is lower than the account balance', () => {
      const validationMessage = validateAmount('999');
      expect(validationMessage).toBe(VALIDATION_PASSED);
    });
  });
});
