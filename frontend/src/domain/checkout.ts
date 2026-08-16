import type { CartItem } from '../types';

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function calculateDiscount(subtotal: number, coupon: string): number {
  if (coupon.trim().toUpperCase() === 'MEDUCA20') {
    return subtotal * 0.20;
  }

  return 0;
}

export function calculateTotal(items: CartItem[], coupon: string): number {
  const subtotal = calculateSubtotal(items);
  return subtotal - calculateDiscount(subtotal, coupon);
}
