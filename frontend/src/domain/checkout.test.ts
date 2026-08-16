import { describe, expect, it } from 'vitest';
import { calculateDiscount, calculateTotal } from './checkout';
import type { CartItem } from '../types';

const items: CartItem[] = [
  { id: 1, title: 'Curso QA', category: 'Tecnología', price: 100, imageUrl: '', rating: 5, quantity: 1 }
];

describe('checkout discounts', () => {
  it('applies the approved 20 percent discount for MEDUCA20', () => {
    expect(calculateDiscount(100, 'MEDUCA20')).toBe(20);
    expect(calculateTotal(items, 'MEDUCA20')).toBe(80);
  });
});
