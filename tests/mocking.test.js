import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency, getShippingInfo, renderPage } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';

vi.mock('../src/libs/currency')
vi.mock('../src/libs/shipping')
vi.mock('../src/libs/analytics')

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

    describe('getShippingInfo', () => {
        it('should return shipping unavailable if quote cannot be fetched', () => {
            vi.mocked(getShippingQuote).mockReturnValue(null);
            const quote = getShippingInfo('Mexico');

            expect(quote).toMatch(/unavailable/i)
        })
        it('should return shipping info if quote can be fetched', () => {
            vi.mocked(getShippingQuote).mockReturnValue({ cost: 20, estimatedDays: 2 });

            const quote = getShippingInfo('Mexico');

            expect(quote).toBe('Shipping Cost: $20 (2 Days)')
        })
    })

    describe('renderPage', () => {
        it('should return correct content', async () => {
            const result = await renderPage();

            expect(result).toMatch(/content/i);
        })
        it('should call analytics', async () => {
            await renderPage();

            expect(trackPageView).toHaveBeenCalledWith('/home');
        })
    })