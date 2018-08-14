import { mapInputs } from '../utils';

describe('mapInputs', () => {
  it('should apply the transform function to each input name', () => {
    const iteratee = name => name.toUpperCase();
    const results = mapInputs(iteratee);
    const expectedResults = {
      name: 'NAME',
      email: 'EMAIL',
      amount: 'AMOUNT',
    };
    expect(results).toEqual(expectedResults);
  });

  it('should apply the identity function by default, if no iteratee is specified', () => {
    const results = mapInputs();
    const areAllKeyEqualToTheirValues = Object.entries(results).every(
      ([key, value]) => key === value,
    );
    expect(areAllKeyEqualToTheirValues).toBe(true);
  });
});
