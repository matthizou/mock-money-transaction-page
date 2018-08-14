import styled from 'styled-components';

/** Generic input component to use in the application's forms */
export const Input = styled.input`
  border-width: 0 0 2px 0;
  border-color: ${props =>
    props.isInvalid
      ? props.theme.validationErrorColor
      : props.theme.inputBorderColor}
  padding-bottom: 6px;
  font-size: 1.25em;
  &:focus {
    outline: 0;
    border-color: ${props => props.theme.inputFocusBorderColor};
  }
`;
