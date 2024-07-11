import type { MergedProduct } from '$lib/types';
import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const cart: Writable<MergedProduct[]> = writable([]);

export function addToCart(product: MergedProduct) {
    cart.update(items => {
        const item = items.find(item => item._id === product._id);
        if (item) {
            item.quantity = (item.quantity ?? 0) + 1;
        } else {
            items.push({ ...product, quantity: 1 });
        }
        return items;
    });
}

export function removeFromCart(productId: string) {
    cart.update(items => items.filter(item => item._id !== productId));
}

export function increaseQuantity(productId: string) {
    cart.update(items => {
        const item = items.find(item => item._id === productId);
        if (item) {
            item.quantity = (item.quantity ?? 0) + 1;
        }
        return items;
    });
}

export function decreaseQuantity(productId: string) {
    cart.update(items => {
        const item = items.find(item => item._id === productId);
        if (item) {
            item.quantity = Math.max((item.quantity ?? 0) - 1, 0);
            if (item.quantity === 0) {
                return items.filter(i => i._id !== productId);
            }
        }
        return items;
    });
}

export function clearCart() {
    cart.set([]);
}

// Derived store for the count of products in the cart
export const cartCount = derived(cart, $cart =>
    $cart.reduce((total, item) => total + (item.quantity ?? 0), 0)
);

// Derived store for the subtotal of the cart
export const cartSubtotal = derived(cart, $cart => 0
    // $cart.reduce((total, item) => total + (item.quantity ?? 0) * ((item.stripe.default_price?.unit_amount ?? 0) / 100), 0)
);

// Remove sanity specific properties
export const exportShopifyItems = (cartItems: MergedProduct[]) => {
    return cartItems.map(item => {
        return {
            ...item.shopify,
            quantity: item.quantity
        }
    });
}