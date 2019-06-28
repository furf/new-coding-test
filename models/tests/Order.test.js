const Order = require('../Order');
const HotShelf = require('../HotShelf');
const OverflowShelf = require('../OverflowShelf');
const { now } = require('../../lib/time');

describe('Order', () => {
  const falafel = {
    name: 'Falafel',
    temp: 'hot',
    shelfLife: 200,
    decayRate: 0.5,
  };

  test('does not decay immediately', () => {
    const order = new Order(falafel);
    expect(order.shelfLife).toBe(200);
  });

  test('decays at the expected rate of 1x on a priority shelf', () => {
    const order = new Order(falafel);
    order.shelf = new HotShelf();
    const { createdAt } = order.tickets_[0];

    // value = (shelf life - order age) - (decay rate * decay factor * order age)
    // value = (200 - 1) - (0.5 * 1 * 1) = 199 - 0.5 = 198.5
    const oneSecondLater = createdAt + 1;
    expect(order.getShelfLife_(oneSecondLater)).toBe(198.5);

    // value = (shelf life - order age) - (decay rate * decay factor * order age)
    // value = (200 - 2) - (0.5 * 1 * 2) = 198 - 1 = 197
    const twoSecondsLater = createdAt + 2;
    expect(order.getShelfLife_(twoSecondsLater)).toBe(197);
  });

  test('decays at the expected rate of 2x on an overflow shelf', () => {
    const order = new Order(falafel);
    order.shelf = new OverflowShelf();
    const { createdAt } = order.tickets_[0];

    // value = (shelf life - order age) - (decay rate * decay factor * order age)
    // value = (200 - 1) - (0.5 * 2 * 1) = 199 - 1 = 198
    const oneSecondLater = createdAt + 1;
    expect(order.getShelfLife_(oneSecondLater)).toBe(198);

    // value = (shelf life - order age) - (decay rate * decay factor * order age)
    // value = (200 - 2) - (0.5 * 2 * 2) = 198 - 2 = 196
    const twoSecondsLater = createdAt + 2;
    expect(order.getShelfLife_(twoSecondsLater)).toBe(196);
  });

  test('decays at the expected rate on mixed shelves', () => {
    const order = new Order(falafel);
    order.shelf = new HotShelf();
    order.shelf = new OverflowShelf();

    // Hack timestamps for testing
    const hotTicket = order.tickets_[0];
    const overflowTicket = order.tickets_[1];

    const oneSecondLater = order.createdAt + 1;
    const twoSecondsLater = order.createdAt + 2;

    hotTicket.createdAt = order.createdAt;
    overflowTicket.createdAt = oneSecondLater;

    // value = (shelf life - order age) - (decay rate * decay factor * order age)
    // value = (200 - 1) - (0.5 * 1 *  1) = 199 - 0.5 = 198.5
    // value = (198.5 - 1) - (0.5 * 2 * 1) = 197.5 - 1 = 196.5
    expect(order.getShelfLife_(twoSecondsLater)).toBe(196.5);
  });

  test('accurately records remaining health', () => {
    const order = new Order(falafel);
    order.shelf = new HotShelf();
    const { createdAt } = order.tickets_[0];

    // value = (shelf life - order age) - (decay rate * decay factor * order age)
    // value = (200 - 10) - (0.5 * 1 * 10) = 190 - 5 = 185
    // health = 185 / 200 = 0.925
    const tenSecondsLater = createdAt + 10;
    expect(order.getHealth_(tenSecondsLater)).toBe(0.925);
  });

  test('order.health returns a number', () => {
    const order = new Order(falafel);

    expect(order.health).toBe(1);
  });

  test('accurately reports expiration if healthy', () => {
    const order = new Order({
      name: 'Falafel',
      temp: 'hot',
      shelfLife: 200,
      decayRate: 0.5,
    });

    expect(order.isExpired).toBe(false);
  });

  test('accurately reports expiration if expired', () => {
    const order = new Order({
      name: 'Falafel',
      temp: 'hot',
      shelfLife: 0,
      decayRate: 0.5,
    });

    expect(order.isExpired).toBe(true);
  });

  test('accurately reports delivery if undelivered', () => {
    const order = new Order(falafel);

    expect(order.isDelivered).toBe(false);
  });

  test('accurately reports delivery if delivered', () => {
    const order = new Order(falafel);
    order.driver.willArriveAt = now();

    expect(order.isDelivered).toBe(true);
  });

  test('removes circular dependencies', () => {
    const order = new Order(falafel);
    order.shelf = new HotShelf();

    const json = JSON.stringify(order);
    const parsed = JSON.parse(json);

    expect(parsed.shelf).toBeUndefined();
    expect(parsed.tickets_).toBeUndefined();
  });
});
