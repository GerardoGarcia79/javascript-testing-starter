import { describe, it, expect } from 'vitest';

describe('test suite', () => {
    it("test case strings", () => {
        const result = 'The requested file was not found.';
        // Loose assertion (too general)
        expect(result).toBeDefined()
        // Tight assertion (too specific)
        expect(result).toBe('The requested file was not found.')
        // Better assertion
        expect(result).toMatch('not found')
    })
    it("test case arrays", () => {
        const result = [1, 2, 3];
        // Loose assertion (too general)
        expect(result).toBeDefined()
        // Tight assertion (too specific)
        expect(result).toEqual(expect.arrayContaining([1, 2, 3])) // Not depending on order, just that have the content
        // Better assertion
        expect(result.length).toBeGreaterThan(0)
    })
    it("test case objects", () => {
        const result = { name: 'Gerardo' };
        // Loose assertion (too general)
        expect(result).toMatchObject({ name: 'Gerardo'}) // Comparing objects content not references
        // Tight assertion (too specific)
        expect(result).toEqual({ name: 'Gerardo' })
        // Better assertion
        expect(result).toHaveProperty('name', 'Gerardo') // We can add value for the property using     , 'Gerardo'    for this example
    })
})