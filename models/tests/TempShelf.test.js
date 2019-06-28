const TempShelf = require('../TempShelf');
const Order = require('../Order');

describe('TempShelf', () => {
  test('should return true for healthy orders with priority > 0', () => {
    const shelf = new TempShelf({ capacity: 15 });
    const order = new Order({
      name: 'Falafel',
      temp: 'hot',
      shelfLife: 200,
      decayRate: 0.5,
    });

    expect(shelf.isValidOrder(order)).toBe(true);
  });

  test('should return false for healthy orders with priority < 0 (will expire before their drivers arrive)', () => {
    const shelf = new TempShelf({ capacity: 15 });
    const order = new Order({
      name: 'Falafel',
      temp: 'hot',
      shelfLife: 200,
      decayRate: 0.5,
    });
    const timeToLive = order.shelfLife / (order.decayRate + 1);
    order.driver.willArriveAt = order.createdAt + timeToLive + 1;

    expect(shelf.isValidOrder(order)).toBe(false);
  });

  test('should return false for expired orders', () => {
    const shelf = new TempShelf({ capacity: 15 });
    const order = new Order({
      name: 'Falafel',
      temp: 'hot',
      shelfLife: 0,
      decayRate: 0.5,
    });

    expect(shelf.isValidOrder(order)).toBe(false);
  });
});
