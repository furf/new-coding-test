const ColdShelf = require('../ColdShelf');
const Order = require('../Order');

describe('ColdShelf', () => {
  test('isValidOrder will return true for a valid order', () => {
    const shelf = new ColdShelf();
    const order = new Order({
      name: 'Cereal',
      temp: 'cold',
      shelfLife: 200,
      decayRate: 0.5,
    });

    expect(shelf.isValidOrder(order)).toBe(true);
  });

  test('isValidOrder will return false for an invalid order', () => {
    const shelf = new ColdShelf();
    const order = new Order({
      name: 'Ice Cream',
      temp: 'frozen',
      shelfLife: 200,
      decayRate: 0.5,
    });

    expect(shelf.isValidOrder(order)).toBe(false);
  });
});
