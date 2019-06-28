const Shelf = require('./Shelf');

/**
 * TempShelf
 * @class
 * @extends Shelf
 *
 * This class primarily exists as a shorthand validation in the Expeditor class
 * to identify orders as healthy. It also provides order validation to ensure
 * all orders have a positive chance of successful delivery.
 */
class TempShelf extends Shelf {
  /**
   * Validate that an order is not expired and will not expire before it can be
   * delivered, for all classes inheriting from TempShelf.
   * @param {Order} order Order to validate before adding to shelf
   * @returns {boolean} true if the order is valid for this shelf
   */
  // eslint-disable-next-line class-methods-use-this
  isValidOrder(order) {
    return order.priority > 0;
  }
}

module.exports = TempShelf;
