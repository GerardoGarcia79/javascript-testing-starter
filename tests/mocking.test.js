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

    describe('test suite exercise', () => {
        it('test suite exercise', () => {
            const sendText = vi.fn();
            sendText.mockReturnValue('ok');

            const result = sendText('message');

            expect(sendText).toHaveBeenCalledOnce();
            expect(result).toBe('ok');
            expect(sendText).toHaveBeenCalledWith('message');
        })
    })
