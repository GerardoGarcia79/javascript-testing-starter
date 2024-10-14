import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';

vi.mock('../src/libs/currency')

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


    describe('getPriceInCurrency', () => {
        it('should return price in target currency', () => {
            vi.mocked(getExchangeRate).mockReturnValue(1.5);

            const price = getPriceInCurrency(10, 'AUD');

            expect(price).toBe(15);
        })
    })