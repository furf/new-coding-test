const Base = require('./Base');
const TempShelf = require('./TempShelf');
const HotShelf = require('./HotShelf');
const ColdShelf = require('./ColdShelf');
const FrozenShelf = require('./FrozenShelf');
const OverflowShelf = require('./OverflowShelf');
const WasteBin = require('./WasteBin');
const DeliveryWindow = require('./DeliveryWindow');
const { HOT, COLD, FROZEN, OVERFLOW, WASTE, DELIVERY } = require('./constants');

/**
 * Expeditor
 * @class
 * @extends Base
 */
class Expeditor extends Base {
  constructor({ orders = [] } = {}) {
    super();
    this.shelves = {
      [HOT]: new HotShelf(),
      [COLD]: new ColdShelf(),
      [FROZEN]: new FrozenShelf(),
      [OVERFLOW]: new OverflowShelf(),
      [WASTE]: new WasteBin(),
      [DELIVERY]: new DeliveryWindow(),
    };
    this.orders = orders;
  }

  /**
   * Expedite all orders in the "kitchen." Prioritize all "healthy" orders for
   * delivery, shelving, or disposal. Orders are prioritized by their chance
   * of successful delivery, a factor of their time-to-live and margin between
   * their time-to-live and their driver's arrival time.
   */
  expedite() {
    // Reset shelf containers.
    this.shelves[HOT].reset();
    this.shelves[COLD].reset();
    this.shelves[FROZEN].reset();
    this.shelves[OVERFLOW].reset();

    // Map objects to cache the computed `priority` property before sorting in
    // order to minimize the O-complexity to O(n).
    const priorities = this.orders
      .map(order => ({
        priority: order.priority,
        order,
      }))
      .sort((a, b) => a.priority - b.priority);

    // Put each order on the best available shelf.
    const orders = priorities.map(({ order }) => {
      return (
        this.shelves[DELIVERY].add(order) ||
        this.shelves[order.temp].add(order) ||
        this.shelves[OVERFLOW].add(order) ||
        this.shelves[WASTE].add(order)
      );
    });

    // Make waste bin return null
    this.orders = orders.filter(order => order.shelf instanceof TempShelf);
  }

  addOrder(order) {
    this.orders = this.orders.concat(order);
  }
}

module.exports = Expeditor;
