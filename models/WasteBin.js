const Shelf = require('./Shelf');
const { WASTE_BIN_CAPACITY, WASTE_BIN_DECAY_FACTOR } = require('./constants');

/**
 * WasteBin
 * @class
 * @extends Shelf
 */
class WasteBin extends Shelf {
  /**
   * @constructor
   * @param {Object} config
   * @param {number} config.capacity Maximum number of orders shelf can support
   * @param {number} config.decayFactor Multiplier to apply to decay rates of
   *        shelf orders
   */
  constructor({
    capacity = WASTE_BIN_CAPACITY,
    decayFactor = WASTE_BIN_DECAY_FACTOR,
  } = {}) {
    super({ capacity, decayFactor });
  }
}

module.exports = WasteBin;
