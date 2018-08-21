import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from '../../Input';

export const Label = styled.label`
  font-size: 0.9375em;
  margin-bottom: 8px;
`;

const StyledField = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
`;

export const ErrorMessage = styled.div`
  font-size: 0.875em; /* 14px / 16px */
  color: ${props => props.theme.validationErrorColor};
  margin-top: 5px;
`;

/** Component showing a field (a label, an input, and a placeholder for an error message) */
export const FormField = ({
  name,
  label,
  errorMessage,
  component,
  onChange,
  ...input
}) => {
  const InputComponent = component;
  return (
    <StyledField data-test={`field-${name}`}>
      {label && <Label>{label}</Label>}
      <InputComponent
        name={name}
        onChange={onChange}
        isInvalid={errorMessage && errorMessage !== ''}
        {...input}
      />
      {errorMessage && (
        <ErrorMessage data-test="error-message">{errorMessage}</ErrorMessage>
      )}
    </StyledField>
  );
};

FormField.defaultProps = {
  label: '',
  value: '',
  errorMessage: '',
  component: Input,
};

FormField.propTypes = {
  /** Component for the input control used */
  component: PropTypes.func,
  /** Error message for when the validation fails */
  errorMessage: PropTypes.string,
  /** Label for the input */
  label: PropTypes.string,
  /** Name of the field */
  name: PropTypes.string.isRequired,
  /** Handler for when the value of an input is changed */
  onChange: PropTypes.func.isRequired,
  /** Value of the input */
  value: PropTypes.string,
};
