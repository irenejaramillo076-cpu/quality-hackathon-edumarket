import type { CartItem } from '../types';

const CART_KEY = 'edumarket-cart';

export function saveCart(_items: CartItem[]): void {
  // BUG FUN-02: el carrito no se persiste, por eso se pierde al actualizar la página.
  return;
}

export function loadCart(): CartItem[] {
  return [];
}

export { CART_KEY };
