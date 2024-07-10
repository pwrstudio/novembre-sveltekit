<script lang="ts">
  import { PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "$env/static/public"
  import type { Product } from "$lib/types/sanity.types"
  import emblaCarouselSvelte from "embla-carousel-svelte"
  import { renderBlockText, urlFor } from "$lib/modules/sanity"
  import { createStorefrontApiClient } from "@shopify/storefront-api-client"

  const shopifyClient = createStorefrontApiClient({
    storeDomain: "http://your-shop-name.myshopify.com",
    apiVersion: "2024-07",
    publicAccessToken: PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  })

  console.log(shopifyClient)

  export let post: Product

  const style = post.backgroundColor?.hex
    ? `background-color: ${post.backgroundColor.hex};`
    : ""
</script>

<div class="product">
  <div class="column left" {style}>
    <!-- SLIDESHOW -->
    <div class="slideshow">
      <div class="embla" use:emblaCarouselSvelte>
        <div class="embla__container">
          {#each post?.Slideshow ?? [] as slide}
            <div class="embla__slide">
              <img
                src={urlFor(slide).width(600).quality(80).auto("format").url()}
                alt={post.title}
              />
            </div>
          {/each}
        </div>
      </div>
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
    <div class="price">€20</div>
    <!-- ADD TO CART BUTTON -->
    <div class="add-to-cart">
      <button>Add to cart</button>
    </div>
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

  .embla {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
