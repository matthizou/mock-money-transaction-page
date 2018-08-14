import { INPUT_NAMES } from '../constants';

const identity = x => x;

/** Util function to facilitate creating data for the form's inputs
 * @param {function} iteratee The function invoked for each input name
 * @return {Object} A object whose keys are the names of the inputs, and whose values are the result of the iteratee applied of those keys
 */
export const mapInputs = (iteratee = identity) => {
  return Object.values(INPUT_NAMES).reduce(
    (res, name) => ({
      ...res,
      [name]: iteratee(name),
    }),
    {},
  );
};
