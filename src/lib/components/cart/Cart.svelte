<script lang="ts">
  import {
    cart,
    cartCount,
    cartSubtotal,
    cartToCheckoutLineItems,
    clearCart,
  } from "$lib/modules/cart"
  import { SHOPIFY_DOMAIN, SHOPIFY_API_VERSION } from "$lib/constants"
  import { PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "$env/static/public"
  import Client from "shopify-buy"

  import CartItem from "./CartItem.svelte"
  import Ellipse from "../ellipse/Ellipse.svelte"

  let checkoutInProgress = false
  let currentCart = $cart

  const shopifyClient = Client.buildClient({
    domain: SHOPIFY_DOMAIN,
    apiVersion: SHOPIFY_API_VERSION,
    storefrontAccessToken: PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  })

  async function handleCheckout() {
    checkoutInProgress = true
    try {
      // Create a checkout
      const checkout = await shopifyClient.checkout.create()

      // Add items to the checkout
      const lineItems = cartToCheckoutLineItems(currentCart)
      const updatedCheckout = await shopifyClient.checkout.addLineItems(
        checkout.id,
        lineItems
      )

      if (updatedCheckout?.webUrl) {
        clearCart()
        window.location.href = updatedCheckout.webUrl
      } else {
        throw new Error("No checkout URL found")
      }
    } catch (error) {
      console.error("Error during checkout:", error)
      checkoutInProgress = false
    }
  }
</script>

<div class="cart">
  <div class="cart-content">
    {#if checkoutInProgress}
      <div class="cart-checkout-in-progress">
        Checkout in progress <Ellipse />
      </div>
    {:else if $cartCount === 0}
      <div class="cart-header">Your cart is empty</div>
    {:else}
      <!-- HEADER -->
      <div class="cart-header">YOUR CART</div>

      <!-- ITEMS -->
      <div class="cart-items">
        {#each $cart as item}
          <CartItem {item} />
        {/each}
      </div>

      <!-- SUBTOTAL -->
      <div class="cart-subtotal">
        <p>Subtotal: <strong>€{$cartSubtotal}</strong></p>
      </div>

      <!-- TEXT -->
      <div class="cart-text">
        Tax included. Shipping calculated at checkout.
      </div>

      <!-- CHECKOUT -->
      <div class="cart-checkout">
        <button on:click={handleCheckout}>Checkout</button>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .cart {
    width: 100%;
    min-height: 100vh;
    background: var(--grey);
    padding: 20px;
    padding-top: 120px;
    font-family: $sans-stack;

    .cart-checkout-in-progress {
      font-size: $intro;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }

    .cart-header {
      font-size: $intro;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }

    .cart-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .cart-subtotal {
      font-size: $intro;
    }

    .cart-text {
      font-size: $small;
      margin-top: 10px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
    }

    .cart-checkout {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ccc;

      button {
        background: transparent;
        font-family: $sans-stack;
        font-size: $intro;
        border: 2px solid $black;
        outline: none;
        cursor: pointer;
        padding: 10px;
        text-transform: uppercase;
        margin-top: 20px;

        &:hover {
          background: $white;
        }
      }
    }
  }
</style>
