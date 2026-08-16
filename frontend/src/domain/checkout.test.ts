import { describe, expect, it } from 'vitest';
import { calculateTotal } from './checkout';
import type { CartItem } from '../types';

const items: CartItem[] = [
  { id: 1, title: 'Curso QA', category: 'Tecnología', price: 100, imageUrl: '', rating: 5, quantity: 1 }
];

describe('checkout smoke test', () => {
  it('calculates a total without coupon', () => {
    expect(calculateTotal(items, 'SIN-CUPON')).toBe(100);
  });
});
