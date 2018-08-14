export const CURRENCY_SYMBOL = {
  GBP: '£', // British Pound Sterling
  EUR: '€', // Euro
};

export const UNKNOWN_CURRENCY_SYMBOL = '';

export const CURRENCY_CODE = {
  PoundSterling: 'GBP',
  euro: 'EUR',
};

/**
 *  Return the currency symbol corresponding to the specified currency code (ISO 4217).
 * i.e: getCurrencySymbol('GBP') will return '£'
 */
export const getCurrencySymbol = currency => {
  const symbol = CURRENCY_SYMBOL[currency];
  return symbol || UNKNOWN_CURRENCY_SYMBOL;
};
