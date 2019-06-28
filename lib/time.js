/**
 * time
 * This module contains a `now` function which normalizes time in seconds for
 * easier calculation of shelf life decay.
 */

/**
 * Normalizes the current time in seconds (vs. milliseconds). It is practical
 * for this assignment in the calculation of shelf life decay.
 * @returns {number} the number of seconds elapsed since the Unix epoch
 */
function now() {
  return Date.now() / 1000;
}

module.exports = {
  now,
};
