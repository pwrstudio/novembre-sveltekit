<script lang="ts">
  import type { MergedProduct } from "$lib/types"
  import { urlFor } from "$lib/modules/sanity"
  import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } from "$lib/modules/cart"

  export let item: MergedProduct

  const src = urlFor(item.mainImage).width(80).height(80).url()

  function handleIncreaseQuantity() {
    increaseQuantity(item._id)
  }

  function handleDecreaseQuantity() {
    decreaseQuantity(item._id)
  }

  function handleRemoveFromCart() {
    removeFromCart(item._id)
  }
</script>

<div class="cart-item">
  <img {src} alt={item.title} class="thumbnail" />
  <div class="details">
    <div class="title">{item.title}</div>
    <div class="quantity-controls">
      <button on:click={handleDecreaseQuantity}>-</button>
      <span class="quantity">{item.quantity}</span>
      <button on:click={handleIncreaseQuantity}>+</button>
    </div>
    <div class="price">
      PRICE
      <!-- €{(item.stripe.default_price?.unit_amount ?? 0) / 100} -->
    </div>
    <button on:click={handleRemoveFromCart} class="remove-btn">Remove</button>
  </div>
</div>

<style lang="scss">
  .cart-item {
    display: flex;
    flex-wrap: nowrap;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;

    .thumbnail {
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 20px;
    }

    .details {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      .title {
        font-weight: bold;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        margin: 10px 0;

        button {
          background: #eee;
          border: 1px solid #ccc;
          padding: 5px;
          cursor: pointer;
          width: 20px;
        }

        .quantity {
          margin: 0 10px;
          font-size: 1em;
        }
      }

      .price {
        font-weight: bold;
        margin-top: 10px;
      }

      .remove-btn {
        margin-top: 10px;
        background: #f44336;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }
</style>
