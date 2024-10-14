import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest';
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  Stack,
  validateUserInput,
} from '../src/core';
import { it, expect, describe } from 'vitest';

// Explanation

// describe('test suite', () => {
//     it("test case strings", () => {
//         const result = 'The requested file was not found.';
//         // Loose assertion (too general)
//         expect(result).toBeDefined()
//         // Tight assertion (too specific)
//         expect(result).toBe('The requested file was not found.')
//         // Better assertion
//         expect(result).toMatch('not found')
//     })
//     it("test case arrays", () => {
//         const result = [1, 2, 3];
//         // Loose assertion (too general)
//         expect(result).toBeDefined()
//         // Tight assertion (too specific)
//         expect(result).toEqual(expect.arrayContaining([1, 2, 3])) // Not depending on order, just that have the content
//         // Better assertion
//         expect(result.length).toBeGreaterThan(0)
//     })
//     it("test case objects", () => {
//         const result = { name: 'Gerardo' };
//         // Loose assertion (too general)
//         expect(result).toMatchObject({ name: 'Gerardo'}) // Comparing objects content not references
//         // Tight assertion (too specific)
//         expect(result).toEqual({ name: 'Gerardo' })
//         // Better assertion
//         expect(result).toHaveProperty('name', 'Gerardo') // We can add value for the property using     , 'Gerardo'    for this example
//     })
// })

// Testing getCoupons - My solution

// describe('getCoupons', () => {
//     it('should not be an empty array', () => {
//         expect(getCoupons().length).toBeGreaterThan(0)
//     })
//     it('should have code property', () => {
//         expect(getCoupons()[0]).toHaveProperty('code')
//     })
//     it('should have discount property', () => {
//         expect(getCoupons()[0]).toHaveProperty('discount')
//     })
//     it('should have a string code property', () => {
//         expect(typeof getCoupons()[0].code).toBe('string')
//     })
//     it('should have a number discount property', () => {
//         expect(typeof getCoupons()[0].discount).toBe('number')
//     })
// })

// Testing getCoupons - Mosh

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });
  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });
  it('should return an array with valid coupon discounts', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});

// Positive and negative tests

describe('calculateDiscount', () => {
  it('should return discounted price if given input', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });
  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });
  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });
  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });
  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

// Exercise

describe('group', () => {
  it('should return successful if given valid input', () => {
    expect(validateUserInput('Gerardo', 24)).toMatch(/successful/i);
  });
  it('should handle non-string username', () => {
    expect(validateUserInput(10, 24)).toMatch(/invalid/i);
  });
  it('should handle username is less than 3 characters', () => {
    expect(validateUserInput('Ge', 24)).toMatch(/invalid/i);
  });
  it('should handle username is longer than 255 characters', () => {
    expect(validateUserInput('G'.repeat(256), 24)).toMatch(/invalid/i);
  });
  it('should handle non-number age', () => {
    expect(validateUserInput('Gerardo', '24')).toMatch(/invalid/i);
  });
  it('should handle min age', () => {
    expect(validateUserInput('Gerardo', 17)).toMatch(/invalid/i);
  });
  it('should handle max age', () => {
    expect(validateUserInput('Gerardo', 101)).toMatch(/invalid/i);
  });
  it('should handle both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

// Boundary Testing

describe('isPriceInRange', () => {
  it.each([
    { scenario: 'price < min', price: -10, result: false },
    { scenario: 'price = min', price: 0, result: true },
    { scenario: 'price between min and max', price: 50, result: true },
    { scenario: 'price = max', price: 100, result: true },
    { scenario: 'price > max', price: 200, result: false },
  ])('should return $result when $scenario', ({ price, result }) => [
    expect(isPriceInRange(price, 0, 100)).toBe(result),
  ]);
});

// Exercise

describe('isValidUsername', () => {
  it('should return false when the username length is too short', () => {
    expect(isValidUsername('A'.repeat(4))).toBe(false);
  });
  it('should return false when the username length is too long', () => {
    expect(isValidUsername('A'.repeat(16))).toBe(false);
  });
  it('should return true when the username length is equal to the min or to the max', () => {
    expect(isValidUsername('A'.repeat(15))).toBe(true);
    expect(isValidUsername('A'.repeat(5))).toBe(true);
  });
  it('should return true when the username length within the range', () => {
    expect(isValidUsername('A'.repeat(10))).toBe(true);
  });
  it('should return false for invalid input types', () => {
    expect(isValidUsername(1)).toBe(false);
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
  });
});

// Exercise

describe('canDrive', () => {
  it('should return error if is not a valid countryCode', () => {
    expect(canDrive(18, 'ES')).toMatch(/invalid/i);
  });

  // Parameterized test
  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: 'US', result: true },
    { age: 17, country: 'US', result: true },
    { age: 16, country: 'UK', result: false },
    { age: 17, country: 'UK', result: true },
    { age: 18, country: 'UK', result: true },
  ])('should return $result for $age, $country', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});

describe('fetchData', () => {
  // async - await method
  it('should return a promise that will resolve to an array of numbers', async () => {
    // test reject
    try {
      const result = await fetchData();
    } catch (error) {
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i);
    }
    // test success
    // expect(Array.isArray(result)).toBe(true)
    // expect(result.length).toBeGreaterThan(0);
  });
  // then - catch method
  // it('should return a promise that will resolve to an array of numbers', async () => {
  //     fetchData().then((result) => {
  //         expect(Array.isArray(result)).toBe(true)
  //         expect(result.length).toBeGreaterThan(0);
  //     })
  //     .catch((error) => {
  //         expect(error).toHaveProperty('reason')
  //         expect(error.reason).toMatch(/fail/i)
  //     })
  // })
});

// Setup and teardown

describe('test suite', () => {
  beforeAll(() => {
    console.log('beforeAll called');
  });

  beforeEach(() => {
    console.log('beforeEach called');
  });

  afterEach(() => {
    console.log('afterEach called');
  });

  afterAll(() => {
    console.log('afterAll called');
  });

  it('test suite 1', () => {});
  it('test suite 2', () => {});
});

// Exercise

describe('stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('push should add an item to the stack', () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });
  it('pop should remove and return the top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });
  // with callback syntax in expect(), the test function is not going to throw an error,
  // vitest/jest will catch the error and prevent our test from failing
  it('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });
  it('peek should return the top item from the stack without removing it', () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });
  it('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });
  it('isEmpty should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });
  it('isEmpty should return false if stack is not empty', () => {
    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });
  it('size should return the number of items in the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });
  it('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.size()).toBe(0);
  });
});
