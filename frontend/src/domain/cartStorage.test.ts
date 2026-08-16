import { beforeEach, describe, expect, it } from 'vitest';
import { CART_KEY, loadCart, saveCart } from './cartStorage';
import type { CartItem } from '../types';

const item: CartItem = {
  id: 1,
  title: 'Curso QA',
  category: 'Tecnología',
  price: 100,
  imageUrl: '',
  rating: 5,
  quantity: 1
};

describe('cart persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists cart items after reload', () => {
    saveCart([item]);
    expect(localStorage.getItem(CART_KEY)).toContain('Curso QA');
    expect(loadCart()).toEqual([item]);
  });
});
