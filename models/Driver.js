const Base = require('./Base');
const { now } = require('../lib/time');
const { random } = require('../lib/math');

/**
 * Driver
 * @class
 * @extends Base
 */
class Driver extends Base {
  constructor() {
    super();
    this.driveTime = random(2, 10);
    this.dispatchedAt = now();
    this.willArriveAt = this.dispatchedAt + this.driveTime;
  }

  get timeToArrival() {
    return Math.max(0, this.willArriveAt - now());
  }

  get hasArrived() {
    return this.timeToArrival === 0;
  }
}

module.exports = Driver;
