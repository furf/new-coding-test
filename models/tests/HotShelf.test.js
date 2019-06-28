const HotShelf = require('../HotShelf');
const Order = require('../Order');

describe('HotShelf', () => {
  test('isValidOrder will return true for a valid order', () => {
    const shelf = new HotShelf();
    const order = new Order({
      name: 'Falafel',
      temp: 'hot',
      shelfLife: 200,
      decayRate: 0.5,
    });

    expect(shelf.isValidOrder(order)).toBe(true);
  });

  test('isValidOrder will return false for an invalid order', () => {
    const shelf = new HotShelf();
    const order = new Order({
      name: 'Ice Cream',
      temp: 'frozen',
      shelfLife: 200,
      decayRate: 0.5,
    });

    expect(shelf.isValidOrder(order)).toBe(false);
  });
});
