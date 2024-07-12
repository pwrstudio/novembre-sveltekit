<script lang="ts">
  import type { MergedProduct } from "$lib/types"
  import { renderBlockText } from "$lib/modules/sanity"
  import Slideshow from "$lib/components/modules/Slideshow.svelte"
  import { getProductPrice, addToCart } from "$lib/modules/cart"

  export let post: MergedProduct

  const style = post.backgroundColor?.hex
    ? `background-color: ${post.backgroundColor.hex};`
    : ""

  const price = getProductPrice(post)

  const handleAddToCart = () => {
    addToCart(post)
  }
</script>

<div class="product">
  <div class="column left" {style}>
    <!-- SLIDESHOW -->
    <div class="slideshow">
      <!-- <Slideshow slides={post.Slideshow} /> -->
    </div>
  </div>
  <div class="column right">
    <!-- TITLE -->
    <h1>{post.title}</h1>
    <!-- CONTENT -->
    {#if post.content?.content}
      <div class="content">
        {@html renderBlockText(post.content.content)}
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
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .product {
    height: 100vh;
    min-height: 800px;
    display: flex;
    flex-wrap: nowrap;
    font-family: $sans-stack;

    .column {
      width: 50%;
      height: 100%;

      &.right {
        background: $grey;
        padding: 20px;
        padding-top: 120px;

        .content {
          width: 100%;
        }

        .add-to-cart {
          button {
            background: transparent;
            font-family: $sans-stack;
            font-size: $large;
            border: 2px solid $black;
            outline: none;
            cursor: pointer;
            padding: 10px;
            text-transform: uppercase;
            margin-top: 20px;
          }
        }
      }

      &.left {
        display: flex;
        justify-content: center;
        align-items: center;

        .slideshow {
          width: 80%;
          height: 80%;
        }
      }
    }

    h1 {
      font-weight: 300;
    }
  }
</style>
