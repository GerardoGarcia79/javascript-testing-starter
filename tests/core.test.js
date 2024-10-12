import { describe, it, expect } from 'vitest';
import { getCoupons } from '../src/core';
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
