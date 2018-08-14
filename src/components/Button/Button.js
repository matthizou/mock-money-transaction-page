import PropTypes from 'prop-types';
import styled from 'styled-components';

/** Generic button component */
export const Button = styled.button`
  background-color: ${props =>
    props.disabled
      ? props.theme.buttonDisabledBackgroundColor
      : props.theme.buttonBackgroundColor};
  color: ${props =>
    props.disabled ? props.theme.buttonDisabledColor : props.theme.buttonColor};
  border: none;
  border-radius: 100px;
  cursor: pointer;
  display: inline-block;
  font-size: 16;
  line-height: 2.5;
  padding: 0 12px;
  position: relative;
  text-align: center;
  &:focus {
    outline: 0;
  }
  &:disabled {
    cursor: default;
  }
`;

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: null,
  onClick: Function.prototype,
  disabled: false,
};
