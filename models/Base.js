const id = require('./id');

/**
 * @class
 */
class Base {
  constructor() {
    this.id = id(this);
  }

  /**
   * Add constructor name to JSON output for all subclasses.
   */
  toJSON() {
    return Object.assign({
      __type: this.constructor.name,
      ...this,
    });
  }
}

module.exports = Base;
