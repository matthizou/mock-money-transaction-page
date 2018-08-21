import { ERROR_MESSAGE } from '../../src/components/SendMoneyForm/utils/';
import { MINIMUM_AMOUNT } from '../../src/components/SendMoneyForm/constants';

describe('Send Money form', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('should initially not show any error messages', () => {
    cy.get('[data-test="error-message"]').should('have.length', 0);
  });

  it('should show error messages for required fields', () => {
    cy.get('form')
      .find('button[type=submit]')
      .click();
    cy.get('[data-test="error-message"]').should('have.length', 3);
  });

  describe('Name field', () => {
    beforeEach(function() {
      cy.get('[data-test="field-name"]')
        .as('field')
        .find('input')
        .as('input');
    });

    it('should be valid when the user entered something', () => {
      const INPUT_STRING = ' $%^& @~#'; // There aren't any restrictions on the characters for the name
      cy.get('@input')
        .type(INPUT_STRING)
        .should('have.value', INPUT_STRING);

      cy.get('@field')
        .get('[data-test="error-message"]')
        .should('not.exist');
    });

    it('should not accept a name made of spaces', () => {
      cy.get('@input').type(' ');
      cy.get('@field')
        .get('[data-test="error-message"]')
        .contains(ERROR_MESSAGE.required);
    });
  });

  describe('Email field', () => {
    beforeEach(function() {
      cy.get('[data-test="field-email"]')
        .as('field')
        .find('input')
        .as('input');
    });

    it('should be valid when the user enter a valid email', () => {
      const INPUT_STRING = 'hulk_hogan@wwf.com'; // There aren't any restrictions on the characters for the name
      cy.get('@input')
        .type(INPUT_STRING)
        .should('have.value', INPUT_STRING);

      cy.get('@field')
        .get('[data-test="error-message"]')
        .should('not.exist');
    });
  });

  describe('Email field', () => {
    beforeEach(function() {
      cy.get('[data-test="field-amount"]')
        .as('field')
        .find('input')
        .as('input');
    });
    it('should not allow typing non-numbers', () => {
      const INPUT_STRING = ' $%^&A@~#';
      cy.get('@input')
        .type(INPUT_STRING)
        .should('have.value', '');
    });

    it('should display an error for negative numbers', () => {
      cy.get('@input').type('-1');

      cy.get('@field')
        .get('[data-test="error-message"]')
        .contains(ERROR_MESSAGE.negativeNumber);
    });

    it('should display an error for negative numbers', () => {
      cy.get('@input').type('0');

      cy.get('@field')
        .get('[data-test="error-message"]')
        .contains(
          ERROR_MESSAGE.amountTooSmall.replace(
            '{minimal_amount}',
            MINIMUM_AMOUNT,
          ),
        );
    });

    it.only('should display an "insufficient funds" error if the entered amount is greater than the account balance', () => {
      cy.server();
      cy.route('GET', 'http://localhost:3004/transactions', [
        {
          recipientName: 'robot',
          recipientEmail: 'robot@automation.com',
          amount: 39000,
          id: 1,
        },
      ]);
      cy.get('@input').type('10000');

      cy.get('@field')
        .get('[data-test="error-message"]')
        .contains(ERROR_MESSAGE.insufficientFunds);
    });
  });
});
