<script lang="ts">
  import type { MergedProduct } from "$lib/types"
  import { renderBlockText } from "$lib/modules/sanity"
  import { getProductPrice, addToCart } from "$lib/modules/cart"
  import ShopSlideshow from "./ShopSlideshow.svelte"

  export let post: MergedProduct

  console.log("post", post)

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
    <h1>{post.title}</h1>
    <!-- CONTENT -->
    {#if post.content}
      <div class="description">
        {@html renderBlockText(post.content)}
      </div>
    {/if}
    <!-- PRICE -->
    {#if price}
      <div class="price">€{price}</div>
    {/if}
    <!-- ADD TO CART BUTTON -->
    {#if post.shopify}
      <div class="add-to-cart">
        <button on:click={handleAddToCart}>Add to cart</button>
      </div>
    {/if}
  </div>
  <div class="column left" {style}>
    <!-- SLIDESHOW -->
    {#if slides.length > 0}
      <ShopSlideshow {slides} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .product {
    height: 100vh;
    min-height: 800px;
    display: flex;
    flex-wrap: nowrap;
    font-family: $sans-stack;

    @include screen-size("small") {
      flex-wrap: wrap;
      height: unset;
    }

    .column {
      width: 50%;
      height: 100%;

      @include screen-size("small") {
        width: 100%;
      }

      &.right {
        background: $grey;
        padding: 20px;
        padding-top: 120px;
        order: 2;

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
          }
        }
      }

      &.left {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        order: 1;

        @include screen-size("small") {
          height: 800px;
        }
      }
    }

    h1 {
      font-weight: 300;
      font-size: $intro;
    }
  }
</style>
