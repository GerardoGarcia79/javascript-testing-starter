import { vi, it, expect, describe } from 'vitest';

describe('test suit', () => {
    it('test case', () => {
        const greet = vi.fn();
        // mockReturnValue
        // mockResolvedValue - promises
        // mockImplementation

        greet.mockImplementation(name => 'Hello ' + name);

        const result = greet('mosh');

        expect(greet).toHaveBeenCalledOnce('mosh');
    }
    );
    })
