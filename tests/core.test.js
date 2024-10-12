import { describe, it, expect } from 'vitest';
import { calculateDiscount, getCoupons, isPriceInRange, isValidUsername, validateUserInput } from '../src/core';
import { it, expect, describe } from 'vitest'

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
    })
    it('should return an array with valid coupon codes', () => {
        const coupons = getCoupons();
    coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code).toBeTruthy();
        })
    })
    it('should return an array with valid coupon discounts', () => {
        const coupons = getCoupons();
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeGreaterThanOrEqual(0);
            expect(coupon.discount).toBeLessThanOrEqual(1);
        })
    })
})



// Positive and negative tests

describe('calculateDiscount', () => {
    it('should return discounted price if given input', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9)
        expect(calculateDiscount(10, 'SAVE20')).toBe(8)
    })
    it('should handle non-numeric price', () => {
        expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i)
    })
    it('should handle negative price', () => {
        expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i)
    })
    it('should handle non-string discount code', () => {
        expect(calculateDiscount(10, 10)).toMatch(/invalid/i)
    })
    it('should handle invalid discount code', () => {
        expect(calculateDiscount(10, 'INVALID')).toBe(10)
    })
})

// Exercise

describe('group', () => {
    it('should return successful if given valid input', () => {
        expect(validateUserInput('Gerardo', 24)).toMatch(/successful/i)
    })
    it('should handle non-string username', () => {
        expect(validateUserInput(10, 24)).toMatch(/invalid/i)
    })
    it('should handle username is less than 3 characters', () => {
        expect(validateUserInput('Ge', 24)).toMatch(/invalid/i)
    })
    it('should handle username is longer than 255 characters', () => {
        expect(validateUserInput('G'.repeat(256), 24)).toMatch(/invalid/i)
    })
    it('should handle non-number age', () => {
        expect(validateUserInput('Gerardo', '24')).toMatch(/invalid/i)
    })
    it('should handle min age', () => {
        expect(validateUserInput('Gerardo', 17)).toMatch(/invalid/i)
    })
    it('should handle max age', () => {
        expect(validateUserInput('Gerardo', 101)).toMatch(/invalid/i)
    })
    it('should handle both username and age are invalid', () => {
        expect(validateUserInput('', 0)).toMatch(/invalid username/i)
        expect(validateUserInput('', 0)).toMatch(/invalid age/i)
    })
})



// Boundary Testing

    describe('isPriceInRange', () => {
        it('should return false when the price is outside the range', () => {
            expect(isPriceInRange(-10, 0, 100)).toBe(false)
            expect(isPriceInRange(200, 0, 100)).toBe(false)
        })
        it('should return true when the price is equal to the min or to the max', () => {
            expect(isPriceInRange(0, 0, 100)).toBe(true)
            expect(isPriceInRange(100, 0, 100)).toBe(true)
        })
        it('should return true when the price is within the range', () => {
            expect(isPriceInRange(50, 0, 100)).toBe(true)
        })
    })

// Exercise
// Too short, too long, length exactly to min or max
    describe('isValidUsername', () => {
        it('should return false when the username length is outside the range', () => {
            expect(isValidUsername('A'.repeat(16))).toBe(false)
            expect(isValidUsername('A'.repeat(4))).toBe(false)
        })
        it('should return true when the username length is equal to the min or to the max', () => {
            expect(isValidUsername('A'.repeat(15))).toBe(true)
            expect(isValidUsername('A'.repeat(5))).toBe(true)
        })
        it('should return true when the username length within the range', () => {
            expect(isValidUsername('A'.repeat(10))).toBe(true)
        })
        it('should return false for invalid input types', () => {
            expect(isValidUsername(1)).toBe(false)
            expect(isValidUsername(null)).toBe(false)
            expect(isValidUsername(undefined)).toBe(false)
        })
    })