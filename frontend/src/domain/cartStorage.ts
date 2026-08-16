import type { CartItem } from '../types';

const CART_KEY = 'edumarket-cart';

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function loadCart(): CartItem[] {
  const rawCart = localStorage.getItem(CART_KEY);
  if (!rawCart) return [];

  try {
    const parsed = JSON.parse(rawCart) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

export { CART_KEY };
