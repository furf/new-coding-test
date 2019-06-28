const Base = require('./Base');
const Driver = require('./Driver');
const Ticket = require('./Ticket');
const { now } = require('../lib/time');

/**
 * Order
 * @class
 * @extends Base
 */
class Order extends Base {
  /**
   * @constructor
   * @param {Object} config
   * @param {string} config.name Name of dish
   * @param {string} config.temp /hot|cold|frozen/ temperature of order, used
   *        to determine shelf placement
   * @param {number} config.shelfLife Health of dish
   * @param {number} config.decayRate Rate of decay to apply each second
   */
  constructor({ name, temp, shelfLife, decayRate }) {
    super();
    this.name = name;
    this.temp = temp;
    this.shelfLife = shelfLife;
    this.decayRate = decayRate;
    this.driver = new Driver();
    this.tickets_ = [];
    this.shelf = null;
    this.createdAt = now();
  }

  /**
   * Overwrite toJSON method to remove circular dependencies.
   */
  toJSON() {
    return Object.assign(super.toJSON(), {
      shelf: undefined,
      tickets_: undefined,
    });
  }

  set shelf(shelf) {
    // Only add a ticket if the order has moved.
    if (!shelf || shelf === this.shelf) return;
    this.tickets_.push(new Ticket({ shelf }));
  }

  get shelf() {
    if (!this.tickets_.length) return null;
    // The current shelf can be found in the last ticket.
    return this.tickets_[this.tickets_.length - 1].shelf;
  }

  set shelfLife(shelfLife) {
    this.shelfLife_ = shelfLife;
  }

  getShelfLife_(time) {
    // Compute the order's current shelf life by iterating through its history
    // and reducing the accumulated shelf life by the decay incurred on each
    // shelf.
    const remainingShelfLife = this.tickets_.reduce(
      (shelfLife, ticket, index, tickets) => {
        // Calculate ticket age by comparing its timestamp to the next ticket.
        const next = tickets[index + 1];
        const endedAt = next ? next.createdAt : time;
        const age = endedAt - ticket.createdAt;

        // Decay rate is the product of the order's decay rate and the shelf's
        // decay factor.
        const decayRate = this.decayRate * ticket.shelf.decayFactor;

        // Decay and remaining shelf life are derived using the following
        // provided formula:
        // value = (shelfLife - orderAge) - (decayRate * orderAge)
        // Which can be simplified to:
        // value = shelfLife - ((decayRate + 1) * orderAge)
        const decay = (decayRate + 1) * age;
        return shelfLife - decay;
      },
      this.shelfLife_,
    );
    return Math.max(0, remainingShelfLife);
  }

  get shelfLife() {
    return this.getShelfLife_(now());
  }

  getHealth_(time) {
    return this.getShelfLife_(time) / this.shelfLife_;
  }

  get health() {
    return this.getHealth_(now());
  }

  get isExpired() {
    return this.shelfLife <= 0;
  }

  get isDelivered() {
    return !this.isExpired && this.driver.hasArrived;
  }

  get priority() {
    // Time-to-live is calculated without shelf decay factor to control for
    // decay under optimal conditions. The lower this number, the closer this
    // order is to expiration.
    const timeToLive = this.shelfLife / (this.decayRate + 1);
    // Driver margin is the difference between how long the food _will_ live and
    // how long it _needs_ to live. The lower this number, the less margin for
    // driver error the order can support.
    const driverMargin = timeToLive - this.driver.timeToArrival;
    // Multiplying these values returns a seemingly good indicator of an order's
    // chance of success. The smaller the number, the more "at-risk" an order is
    // and therefore the higher its priority should be.
    const priority = timeToLive * driverMargin;
    return priority;
  }
}

module.exports = Order;
