import type { MergedProduct } from '$lib/types';
import Client from 'shopify-buy';
import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const cart: Writable<MergedProduct[]> = writable([]);

// 24 hours in milliseconds
const CART_EXPIRY_TIME = 24 * 3600 * 1000;

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

export function getProductPrice(product: MergedProduct): number | undefined {
    if (product?.shopify?.variants[0].price.amount) {
        return Math.round(product?.shopify?.variants[0].price.amount);
    }
    // If no price is found, return undefined or throw an error
    console.warn(`No price found for product: ${product.title}`);
    return undefined;
}

// Derived store for the subtotal of the cart
export const cartSubtotal = derived(cart, $cart =>
    $cart.reduce((total, item) => total + (item.quantity ?? 0) * (getProductPrice(item) ?? 0), 0)
);

// Export cart in format for checkout
export const cartToCheckoutLineItems = (cartItems: MergedProduct[]): Client.CheckoutLineItemInput[] => {
    let lineItems: Client.CheckoutLineItemInput[] = [];

    cartItems.forEach(item => {
        // Abort if no variant id is found
        if (!item.shopify?.variants[0]?.id) return;

        // Abort if quantity is 0
        if (!item.quantity) return;

        lineItems.push({
            variantId: item.shopify.variants[0].id,
            quantity: item.quantity
        });
    });

    return lineItems
}

// Save cart to local storage with expiry
export function saveCartToLocalStorage(cart: MergedProduct[]) {
    const now = new Date().getTime();
    const expiryTime = now + CART_EXPIRY_TIME;
    const cartData = {
        cart,
        expiryTime
    };
    localStorage.setItem('cart', JSON.stringify(cartData));
}

// Load cart from local storage and check expiry
export function loadCartFromLocalStorage(): MergedProduct[] {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        const { cart, expiryTime } = JSON.parse(storedCart);
        const now = new Date().getTime();
        if (now < expiryTime) {
            return cart;
        } else {
            localStorage.removeItem('cart');
        }
    }
    return [];
}
