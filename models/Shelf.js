const Base = require('./Base');

/**
 * Shelf
 * @class
 * @extends Base
 */
class Shelf extends Base {
  /**
   * @constructor
   * @param {Object} config
   * @param {number} config.capacity Maximum number of orders shelf can support
   * @param {number} config.decayFactor Multiplier to apply to decay rates of
   *        shelf orders
   */
  constructor({ capacity, decayFactor = 1 }) {
    super();
    this.capacity = capacity;
    this.decayFactor = decayFactor;

    // Initialize orders array.
    this.orders = [];
  }

  get availableCapacity() {
    return this.capacity - this.orders.length;
  }

  get hasAvailability() {
    return this.availableCapacity > 0;
  }

  // eslint-disable-next-line class-methods-use-this
  isValidOrder() {
    return true;
  }

  add(order) {
    if (!this.hasAvailability || !this.isValidOrder(order)) {
      return null;
    }
    // eslint-disable-next-line no-param-reassign
    order.shelf = this;
    this.orders.push(order);
    return order;
  }

  reset() {
    this.orders = [];
  }
}

module.exports = Shelf;
