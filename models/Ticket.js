const Base = require('./Base');
const { now } = require('../lib/time');

/**
 * @class
 * @extends Base
 */
class Ticket extends Base {
  constructor({ shelf }) {
    super();
    this.shelf = shelf;
    this.createdAt = now();
  }
}

module.exports = Ticket;
