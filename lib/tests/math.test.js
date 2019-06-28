const { random, clamp, factorial } = require('../math');

// Modified range matcher
// @see https://jestjs.io/docs/en/expect#expectextendmatchers
expect.extend({
  toBeWithinRandomRange(received, floor, ceiling) {
    const pass = received >= floor && received < ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

describe('math', () => {
  describe('random', () => {
    test('returns random value between minimum (inclusive) and maximum (non-inclusive), two arguments', () => {
      // 1000 runs should be sufficient for testing
      for (let i = 0; i < 1000; i += 1) {
        expect(random(2, 10)).toBeWithinRandomRange(2, 10);
      }
    });

    test('returns random value between minimum (inclusive) and maximum (non-inclusive), one argument', () => {
      // 1000 runs should be sufficient for testing
      for (let i = 0; i < 1000; i += 1) {
        expect(random(4)).toBeWithinRandomRange(0, 4);
      }
    });

    test('returns random value between minimum (inclusive) and maximum (non-inclusive), zero arguments', () => {
      // 1000 runs should be sufficient for testing
      for (let i = 0; i < 1000; i += 1) {
        expect(random()).toBeWithinRandomRange(0, 1);
      }
    });
  });

  /**
   * clamp
   */
  describe('clamp', () => {
    test('returns original value between minimum and maximum', () => {
      expect(clamp(1, 0, 2)).toBe(1);
    });

    test('returns original value between minimum and maximum, unsorted', () => {
      expect(clamp(1, 2, 0)).toBe(1);
    });

    test('returns minimum value for out-of-range below minimum', () => {
      expect(clamp(-1, 0, 1)).toBe(0);
    });

    test('returns minimum value for out-of-range below minimum, unsorted', () => {
      expect(clamp(-1, 1, 0)).toBe(0);
    });

    test('returns maximum value for out-of-range above maximum', () => {
      expect(clamp(2, 0, 1)).toBe(1);
    });

    test('returns maximum value for out-of-range above maximum, unsorted', () => {
      expect(clamp(2, 1, 0)).toBe(1);
    });
  });

  /**
   * factorial
   */
  describe('factorial', () => {
    test('returns correct factorial', () => {
      expect(factorial(3).toFixed(1)).toBe('6.0');
    });

    test('throws an error when value is out of range', () => {
      expect(() => {
        factorial(-1);
      }).toThrow(RangeError);
    });
  });
});
