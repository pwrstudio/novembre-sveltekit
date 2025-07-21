<script lang="ts">
  import type { MergedProduct } from "$lib/types"
  import { urlFor } from "$lib/modules/sanity"
  import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getProductPrice,
  } from "$lib/modules/cart"

  export let item: MergedProduct

  const src = urlFor(item.mainImage).width(200).url()

  function handleIncreaseQuantity() {
    increaseQuantity(item._id)
  }

  function handleDecreaseQuantity() {
    decreaseQuantity(item._id)
  }

  function handleRemoveFromCart() {
    removeFromCart(item._id)
  }

  const price = getProductPrice(item)
</script>

<div class="cart-item">
  <!-- THUMBNAIL -->
  <a href={`/shop/${item.slug?.current ?? ""}`}>
    <img {src} alt={item.title} class="thumbnail" />
  </a>
  <div class="details">
    <!-- TITLE -->
    <div class="title">{item.title}</div>
    <!-- QUANTITY -->
    <div class="quantity-controls">
      <button on:click={handleDecreaseQuantity}>-</button>
      <span class="quantity">{item.quantity}</span>
      <button on:click={handleIncreaseQuantity}>+</button>
    </div>
    <!-- PRICE -->
    <div class="price">€{price}</div>
    <!-- REMOVE BUTTON -->
    <button on:click={handleRemoveFromCart} class="remove-btn">Remove</button>
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .cart-item {
    display: flex;
    flex-wrap: nowrap;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    font-size: $body;
    font-family: $sans-stack;

    .thumbnail {
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 20px;
      object-fit: contain;
    }

    .details {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      @include screen-size("small") {
        flex-wrap: wrap;
        font-size: $mobile_small;
      }

      .title {
        @include screen-size("small") {
          width: 100%;
          font-size: $mobile_small;
        }
      }

      .price {
        @include screen-size("small") {
          order: 1;
          line-height: 40px;
          height: 40px;
        }
      }

      .quantity-controls {
        display: flex;
        align-items: center;

        @include screen-size("small") {
          order: 2;
        }

        button {
          border: 1px solid $black;
          padding: 5px;
          cursor: pointer;
          width: 20px;
          color: var(--black);

          @include screen-size("small") {
            height: 40px;
            width: 40px;
          }
        }

        .quantity {
          margin: 0 10px;
          font-size: 1em;
          width: 20px;
          text-align: center;
        }
      }

      .remove-btn {
        background: transparent;
        border: 1px solid #ccc;
        padding: 5px 10px;
        cursor: pointer;
        color: var(--black);

        &:hover {
          background: $white;
        }

        @include screen-size("small") {
          order: 3;
          height: 40px;
        }
      }
    }
  }
</style>
