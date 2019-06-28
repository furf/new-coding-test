const TempShelf = require('./TempShelf');
const {
  OVERFLOW_SHELF_CAPACITY,
  OVERFLOW_SHELF_DECAY_FACTOR,
} = require('./constants');

/**
 * OverflowShelf
 * @class
 * @extends TempShelf
 */
class OverflowShelf extends TempShelf {
  /**
   * @constructor
   * @param {Object} config
   * @param {number} config.capacity Maximum number of orders shelf can support
   * @param {number} config.decayFactor Multiplier to apply to decay rates of
   *        shelf orders
   */
  constructor({
    capacity = OVERFLOW_SHELF_CAPACITY,
    decayFactor = OVERFLOW_SHELF_DECAY_FACTOR,
  } = {}) {
    super({ capacity, decayFactor });
  }
}

module.exports = OverflowShelf;
