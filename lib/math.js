/**
 * math
 * This module contains a few helpful math functions.
 */

/**
 * Returns a random value between the minimum value (inclusive) and the maximum
 * value (non-inclusive). If only one value is passed, the other is assumed to
 * be 0. If none are passed, the values are considered to be 0 and 1 (i.e. a
 * standard call to Math.random).
 * @param {number} from
 * @param {number} to
 */
function random(from = 1, to = 0) {
  // Normalize minimum and maximum values.
  const min = Math.min(from, to);
  const max = Math.max(from, to);
  return Math.random() * (max - min) + min;
}

/**
 * Clamp a number between two other numbers. If value is greater than or equal
 * to the maximum, the maximum will be returned. If value is less than or equal
 * to the minimum, the minimum will be returned. Otherwise, if value is between
 * minimum and maximum, the value will be returned.
 * @param {number} value number to clamp
 * @param {number} from minimum value
 * @param {number} to maximum value
 * @returns {number} value between from and to inclusive
 */
function clamp(value, from, to) {
  const min = Math.min(from, to);
  const max = Math.max(from, to);
  return Math.max(min, Math.min(value, max));
}

/**
 * Calculate the factorial of a given number.
 * @param {number} n
 * @returns {number} factorial of n
 */
const factorial = (function memoizeFactorial() {
  const memo = {
    0: 1,
    1: 1,
    2: 2,
    3: 6,
    4: 24,
    5: 120,
    6: 720,
    7: 5040,
    8: 40320,
    9: 362880,
    10: 3628800,
    11: 39916800,
    12: 479001600,
    13: 6227020800,
    14: 87178291200,
    15: 1307674368000,
    16: 20922789888000,
    17: 355687428096000,
    18: 6402373705728000,
    19: 121645100408832000,
    20: 2432902008176640000,
    21: 51090942171709440000,
    22: 1.1240007277776077e21,
    23: 2.585201673888498e22,
    24: 6.204484017332394e23,
    25: 1.5511210043330986e25,
    26: 4.0329146112660565e26,
    27: 1.0888869450418352e28,
    28: 3.0488834461171387e29,
    29: 8.841761993739702e30,
    30: 2.6525285981219107e32,
    31: 8.222838654177922e33,
    32: 2.631308369336935e35,
    33: 8.683317618811886e36,
    34: 2.9523279903960416e38,
    35: 1.0333147966386145e40,
    36: 3.7199332678990125e41,
    37: 1.3763753091226346e43,
    38: 5.230226174666011e44,
    39: 2.0397882081197444e46,
    40: 8.159152832478977e47,
    41: 3.345252661316381e49,
    42: 1.40500611775288e51,
    43: 6.041526306337383e52,
    44: 2.658271574788449e54,
    45: 1.1962222086548019e56,
    46: 5.502622159812089e57,
    47: 2.5862324151116818e59,
    48: 1.2413915592536073e61,
    49: 6.082818640342675e62,
    50: 3.0414093201713376e64,
    51: 1.5511187532873822e66,
    52: 8.065817517094388e67,
    53: 4.2748832840600255e69,
    54: 2.308436973392414e71,
    55: 1.2696403353658276e73,
    56: 7.109985878048635e74,
    57: 4.0526919504877214e76,
    58: 2.3505613312828785e78,
    59: 1.3868311854568984e80,
    60: 8.32098711274139e81,
    61: 5.075802138772248e83,
    62: 3.146997326038794e85,
    63: 1.98260831540444e87,
    64: 1.2688693218588417e89,
    65: 8.247650592082472e90,
    66: 5.443449390774431e92,
    67: 3.647111091818868e94,
    68: 2.4800355424368305e96,
    69: 1.711224524281413e98,
    70: 1.1978571669969892e100,
    71: 8.504785885678623e101,
    72: 6.1234458376886085e103,
    73: 4.4701154615126844e105,
    74: 3.307885441519386e107,
    75: 2.48091408113954e109,
    76: 1.8854947016660504e111,
    77: 1.4518309202828587e113,
    78: 1.1324281178206297e115,
    79: 8.946182130782976e116,
    80: 7.156945704626381e118,
    81: 5.797126020747368e120,
    82: 4.753643337012842e122,
    83: 3.945523969720659e124,
    84: 3.314240134565353e126,
    85: 2.81710411438055e128,
    86: 2.4227095383672734e130,
    87: 2.107757298379528e132,
    88: 1.8548264225739844e134,
    89: 1.650795516090846e136,
    90: 1.4857159644817615e138,
    91: 1.352001527678403e140,
    92: 1.2438414054641308e142,
    93: 1.1567725070816416e144,
    94: 1.087366156656743e146,
    95: 1.032997848823906e148,
    96: 9.916779348709496e149,
    97: 9.619275968248212e151,
    98: 9.426890448883248e153,
    99: 9.332621544394415e155,
    100: 9.332621544394415e157,
  };
  return function memoizedFactorial(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new RangeError('Only integers >= 0 are valid.');
    }
    if (!(n in memo)) {
      memo[n] = n * factorial(n - 1);
    }
    return memo[n];
  };
})();

module.exports = {
  random,
  clamp,
  factorial,
};
