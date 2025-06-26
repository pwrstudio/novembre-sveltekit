<script lang="ts">
  import type { MergedProduct } from "$lib/types"
  import { renderBlockText } from "$lib/modules/sanity"
  import { getProductPrice, addToCart } from "$lib/modules/cart"
  import ShopSlideshow from "./ShopSlideshow.svelte"

  export let post: MergedProduct

  const style = post.backgroundColor?.hex
    ? `background-color: ${post.backgroundColor.hex};`
    : "background-color: var(--grey)"

  const price = getProductPrice(post)

  const getSlides = (product: MergedProduct) => {
    if (product.Slideshow && product.Slideshow.length > 0) {
      return product.Slideshow
    }

    if (product.mainImage) {
      return [product.mainImage]
    }

    return []
  }

  const slides = getSlides(post)

  const handleAddToCart = () => {
    addToCart(post)
  }
</script>

<div class="product">
  <div class="column right">
    <!-- TITLE -->
    <div class="title">
      <h1>{post.title}</h1>
      {#if post.subtitle}
        <h2>{post.subtitle}</h2>
      {/if}
    </div>
    <!-- PRICE -->
    {#if price}
      <div class="price">€{price}</div>
    {/if}
    <!-- TOP: ADD TO CART BUTTON -->
    {#if post.shopify}
      <div class="add-to-cart">
        <button on:click={handleAddToCart}>
          <div class="button-text">
            {#if post.preOrderItem}
              Pre-order
            {:else}
              Add to cart
            {/if}
          </div>
        </button>
        {#if post.preOrderItem && post.preOrderText}
          <div class="pre-order-text">
            {@html renderBlockText(post.preOrderText)}
          </div>
        {/if}
      </div>
    {/if}
    <!-- CONTENT -->
    {#if post.content}
      <div class="description">
        {@html renderBlockText(post.content)}
      </div>
    {/if}
  </div>
  <div class="column left" {style}>
    <div class="shop-slideshow-container">
      <!-- SLIDESHOW -->
      {#if slides.length > 0}
        <ShopSlideshow {slides} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .product {
    display: flex;
    flex-wrap: nowrap;
    font-family: $sans-stack;
    overflow-x: hidden;

    @include screen-size("small") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;

      @include screen-size("small") {
        width: 100%;
      }

      &.left {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        order: 1;
        min-height: 100vh;

        @include screen-size("small") {
          min-height: 70dvh;
        }

        .shop-slideshow-container {
          height: 100vh;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;

          @include screen-size("small") {
            height: 100%;
          }
        }
      }

      &.right {
        background: $grey;
        padding: 20px;
        padding-top: 120px;
        order: 2;
        height: auto;

        @include screen-size("small") {
          padding-top: 0;
          min-height: 50dvh;
        }

        .title {
          line-height: 1em;
          font-size: $intro;
          margin-bottom: 20px;

          h1 {
            font-weight: 300;
            margin-bottom: 0;
          }

          h2 {
            margin-top: 0;
            font-weight: 300;
            font-size: $body;
          }
        }

        .description {
          width: 100%;
          font-family: $serif-stack;
          font-size: var(--body);
          line-height: 1.2em;
        }

        .price {
          font-size: $intro;
        }

        .add-to-cart {
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

            .button-text {
              position: relative;
              top: 2px;
            }
          }
        }
      }
    }

    h1 {
      font-weight: 300;
      font-size: $intro;
    }
  }
</style>
