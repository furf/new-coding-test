const Shelf = require('../Shelf');
const Order = require('../Order');

describe('Shelf', () => {
  test('reports accurate available capacity', () => {
    const shelf = new Shelf({ capacity: 3 });
    const spam = {
      name: 'Spam',
      temp: 'cold',
      shelfLife: Number.MAX_SAFE_INTEGER,
      decayRate: 0.00001,
    };

    expect(shelf.availableCapacity).toBe(shelf.capacity);

    shelf.add(new Order(spam));
    expect(shelf.availableCapacity).toBe(shelf.capacity - 1);
  });

  test('reports accurately whether it has or does not have availability', () => {
    const shelf = new Shelf({ capacity: 3 });
    const spam = {
      name: 'Spam',
      temp: 'cold',
      shelfLife: Number.MAX_SAFE_INTEGER,
      decayRate: 0.00001,
    };

    expect(shelf.hasAvailability).toBe(true);

    shelf.add(new Order(spam));
    expect(shelf.hasAvailability).toBe(true);

    shelf.add(new Order(spam));
    expect(shelf.hasAvailability).toBe(true);

    shelf.add(new Order(spam));
    expect(shelf.hasAvailability).toBe(false);
  });

  test('can add order if it has availability', () => {
    const shelf = new Shelf({ capacity: 3 });
    const spam = {
      name: 'Spam',
      temp: 'cold',
      shelfLife: Number.MAX_SAFE_INTEGER,
      decayRate: 0.00001,
    };

    const order = new Order(spam);
    expect(shelf.add(order)).toBe(order);
  });

  test('cannot add order if it does not have availability', () => {
    const shelf = new Shelf({ capacity: 3 });
    const spam = {
      name: 'Spam',
      temp: 'cold',
      shelfLife: Number.MAX_SAFE_INTEGER,
      decayRate: 0.00001,
    };

    // Fill the shelf.
    for (let i = 0; i < shelf.capacity; i += 1) {
      shelf.add(new Order(spam));
    }

    expect(shelf.add(new Order(spam))).toBeNull();
  });

  test('can be reset', () => {
    const shelf = new Shelf({ capacity: 3 });
    const spam = {
      name: 'Spam',
      temp: 'cold',
      shelfLife: Number.MAX_SAFE_INTEGER,
      decayRate: 0.00001,
    };

    shelf.add(new Order(spam));
    shelf.reset();

    expect(shelf.availableCapacity).toBe(shelf.capacity);
  });
});
