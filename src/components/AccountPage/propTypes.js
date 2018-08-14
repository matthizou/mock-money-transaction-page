import PropTypes from 'prop-types';

export const transaction = {
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  recipientName: PropTypes.string.isRequired,
  recipientEmail: PropTypes.string.isRequired,
};
