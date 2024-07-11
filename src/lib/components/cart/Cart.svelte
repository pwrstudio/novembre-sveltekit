<script lang="ts">
  import { cartActive } from "$lib/modules/stores/"
  import { cart, cartCount, cartSubtotal } from "$lib/modules/cart"
  //   import { loadStripe } from "@stripe/stripe-js"
  //   import { PUBLIC_TEST_STRIPE_TOKEN } from "$env/static/public"
  import { fade } from "svelte/transition"

  import CartItem from "./CartItem.svelte"

  let checkoutInProgress = false

  //   const stripePromise = loadStripe(PUBLIC_TEST_STRIPE_TOKEN)

  const closeCart = () => {
    cartActive.set(false)
  }

  async function handleCheckout() {
    // checkoutInProgress = true
    // const stripe = await stripePromise
    // const items = exportStripeItems($cart)
    // const res = await fetch("/api/create-checkout-session", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ items }),
    // })
    // const { id } = await res.json()
    // await stripe?.redirectToCheckout({ sessionId: id })
  }
</script>

<div class="cart" in:fade>
  <div class="cart-close">
    <button on:click={closeCart}>Close</button>
  </div>

  <div class="cart-content">
    {#if checkoutInProgress}
      <div class="cart-checkout-in-progress">
        <p>Checkout in progress...</p>
      </div>
    {:else if $cartCount === 0}
      <p>Your cart is empty</p>
    {:else}
      <!-- ITEMS -->
      <div class="cart-items">
        {#each $cart as item}
          <CartItem {item} />
        {/each}
      </div>

      <div class="cart-subtotal">
        <p>Subtotal: <strong>€{$cartSubtotal}</strong></p>
      </div>

      <div class="cart-text">
        Tax included. Shipping calculated at checkout.
      </div>

      <div class="cart-checkout">
        <button on:click={handleCheckout}>Checkout</button>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .cart {
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
    width: 600px;
    height: 100vh;
    background: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(black, 0.1);

    .cart-close {
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
    }

    .cart-text {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
      font-size: 12px;
    }

    .cart-checkout {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
    }
  }
</style>
