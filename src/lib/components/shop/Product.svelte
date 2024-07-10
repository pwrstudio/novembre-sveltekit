<script lang="ts">
  import type { Product } from "$lib/types/sanity.types"
  import emblaCarouselSvelte from "embla-carousel-svelte"
  import { renderBlockText, urlFor } from "$lib/modules/sanity"

  export let post: Product

  const style = post.backgroundColor?.hex
    ? `background-color: ${post.backgroundColor.hex};`
    : ""
</script>

<div class="product">
  <div class="column left" {style}>
    <!-- SLIDESHOW -->
    <div class="embla carousel slideshow" use:emblaCarouselSvelte>
      <div class="embla__container">
        {#each post?.Slideshow ?? [] as slide}
          <div class="embla__slide">
            <img
              src={urlFor(slide).height(600).quality(80).auto("format").url()}
              alt={post.title}
            />
          </div>
        {/each}
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
      }
    }

    h1 {
      font-weight: 300;
    }
  }

  .embla {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
