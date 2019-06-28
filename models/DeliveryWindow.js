const Shelf = require('./Shelf');
const {
  DELIVERY_WINDOW_CAPACITY,
  DELIVERY_WINDOW_DECAY_FACTOR,
} = require('./constants');

/**
 * DeliveryWindow
 * @class
 * @extends Shelf
 */
class DeliveryWindow extends Shelf {
  /**
   * @constructor
   * @param {Object} config
   * @param {number} config.capacity Maximum number of orders shelf can support
   * @param {number} config.decayFactor Multiplier to apply to decay rates of
   *        shelf orders
   */
  constructor({
    capacity = DELIVERY_WINDOW_CAPACITY,
    decayFactor = DELIVERY_WINDOW_DECAY_FACTOR,
  } = {}) {
    super({ capacity, decayFactor });
  }

  /**
   * Validate that an order is has been delivered.
   * @param {Order} order Order to validate before adding to shelf
   * @returns {boolean} true if the order is valid for this shelf
   */
  // eslint-disable-next-line class-methods-use-this
  isValidOrder(order) {
    return order.isDelivered;
  }
}

module.exports = DeliveryWindow;
