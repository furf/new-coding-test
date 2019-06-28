const {
  P,
  getPoissonDistribution,
  getCumulativeSums,
  makeReverseProbability,
  getRandomizer,
  getPoissonRandomizer,
} = require('../poisson');

describe('poisson', () => {
  describe('P', () => {
    test('returns a function', () => {
      const p = P(4.6);
      expect(typeof p).toBe('function');
    });
  });

  describe('p', () => {
    test('returns original value between minimum and maximum', () => {
      // @see https://www.youtube.com/watch?v=jmqZG6roVqU for values
      const p = P(4.6);

      expect(p(0).toFixed(3)).toBe('0.010');
      expect(p(1).toFixed(3)).toBe('0.046');
      expect(p(2).toFixed(3)).toBe('0.106');
      expect(p(3).toFixed(3)).toBe('0.163');
    });
  });

  describe('getPoissonDistribution', () => {
    test('returns array of probabilities mapped to number of events (index)', () => {
      const distro = getPoissonDistribution(4.6);

      expect(distro[0].toFixed(3)).toBe('0.010');
      expect(distro[1].toFixed(3)).toBe('0.046');
      expect(distro[2].toFixed(3)).toBe('0.106');
      expect(distro[3].toFixed(3)).toBe('0.163');
    });

    test('returns array of probabilities mapped to number of events (index), breaks on Infinity or NaN', () => {
      const distro = getPoissonDistribution(100);

      expect(distro[100].toFixed(3)).toBe('0.040');
    });

    getPoissonDistribution(100);
  });

  describe('getCumulativeSums', () => {
    test('returns array of cumulative sums', () => {
      const sums = getCumulativeSums([0.1, 0.2, 0.5, 0.2]);

      expect(sums[0].toFixed(1)).toBe('0.1');
      expect(sums[1].toFixed(1)).toBe('0.3');
      expect(sums[2].toFixed(1)).toBe('0.8');
      expect(sums[3].toFixed(1)).toBe('1.0');
    });
  });

  describe('getReverseProbability', () => {
    test('returns number of events by probability', () => {
      const values = [0.1, 0.3, 0.7, 0.9];
      const getReverseProbability = makeReverseProbability(values);

      expect(getReverseProbability(0.05)).toBe(0); // less than the first prob
      expect(getReverseProbability(0.1)).toBe(0); // equal to the first
      expect(getReverseProbability(0.2)).toBe(1); // and so on…
      expect(getReverseProbability(0.3)).toBe(1);
      expect(getReverseProbability(0.5)).toBe(2);
      expect(getReverseProbability(0.7)).toBe(2);
      expect(getReverseProbability(0.8)).toBe(3);
      expect(getReverseProbability(0.9)).toBe(3);
      expect(getReverseProbability(0.95)).toBe(4);
    });

    test('throws an error for out of range values', () => {
      const values = [0.1, 0.3, 0.8, 1.0];
      const getReverseProbability = makeReverseProbability(values);
      const error = new RangeError('Value must be >= 0 and < 1.');

      expect(getReverseProbability.bind(null, -1)).toThrowError(error);
      expect(getReverseProbability.bind(null, 1)).toThrowError(error);
    });
  });

  describe('getRandomizer', () => {
    test('returns a function', () => {
      const random = getRandomizer([0.1, 0.4, 0.9]);
      expect(typeof random).toBe('function');
    });

    test('returns a function that returns numbers', () => {
      const random = getRandomizer([0.1, 0.4, 0.9]);
      const value = random();
      expect(typeof value).toBe('number');
    });
  });

  describe('getPoissonRandomizer', () => {
    test('returns a function', () => {
      const random = getPoissonRandomizer(4.6);
      expect(typeof random).toBe('function');
    });

    test('returns a function that returns numbers', () => {
      const random = getPoissonRandomizer(4.6);
      const value = random();
      expect(typeof value).toBe('number');
    });
  });
});
