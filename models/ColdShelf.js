const TempShelf = require('./TempShelf');
const {
  TEMP_SHELF_CAPACITY,
  TEMP_SHELF_DECAY_FACTOR,
  COLD,
} = require('./constants');

/**
 * ColdShelf
 * @class
 * @extends TempShelf
 */
class ColdShelf extends TempShelf {
  /**
   * @constructor
   * @param {Object} config
   * @param {number} config.capacity Maximum number of orders shelf can support
   * @param {number} config.decayFactor Multiplier to apply to decay rates of
   *        shelf orders
   */
  constructor({
    capacity = TEMP_SHELF_CAPACITY,
    decayFactor = TEMP_SHELF_DECAY_FACTOR,
  } = {}) {
    super({ capacity, decayFactor });
  }

  /**
   * Validate that an order is not expired and will not expire before it can be
   * delivered and that it is "cold."
   * @param {Order} order Order to validate before adding to shelf
   * @returns {boolean} true if the order is valid for this shelf
   */
  isValidOrder(order) {
    return super.isValidOrder(order) && order.temp === COLD;
  }
}

module.exports = ColdShelf;
