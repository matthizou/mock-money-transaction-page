import { getCurrencySymbol, UNKNOWN_CURRENCY_SYMBOL } from '../i18n';

describe('getCurrencySymbol()', () => {
  it('return the correct symbols for supported currencies', () => {
    expect(getCurrencySymbol('GBP')).toBe('£');
    expect(getCurrencySymbol('EUR')).toBe('€');
  });

  it('return the unknown currency symbol for unsupported/unknown currencies', () => {
    const actual = getCurrencySymbol('CAD');
    expect(actual).toBe(UNKNOWN_CURRENCY_SYMBOL);
  });
});
