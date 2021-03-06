const TempShelf = require('./TempShelf');
const {
  TEMP_SHELF_CAPACITY,
  TEMP_SHELF_DECAY_FACTOR,
  HOT,
} = require('./constants');

/**
 * HotShelf
 * @class
 * @extends TempShelf
 */
class HotShelf extends TempShelf {
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
   * delivered and that it is "hot."
   * @param {Order} order Order to validate before adding to shelf
   * @returns {boolean} true if the order is valid for this shelf
   */
  isValidOrder(order) {
    return super.isValidOrder(order) && order.temp === HOT;
  }
}

module.exports = HotShelf;
