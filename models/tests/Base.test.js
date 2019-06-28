const Base = require('../Base');

describe('Base', () => {
  test('adds constructor name to JSON', () => {
    const base = new Base();
    const json = JSON.stringify(base);
    const parsed = JSON.parse(json);

    expect(parsed.__type).toBe('Base');
  });

  test('adds constructor name to JSON, subclass', () => {
    class AllYourBaseAreBelongToUs extends Base {}

    const shelf = new AllYourBaseAreBelongToUs();
    const json = JSON.stringify(shelf);
    const parsed = JSON.parse(json);

    expect(parsed.__type).toBe('AllYourBaseAreBelongToUs');
  });
});
