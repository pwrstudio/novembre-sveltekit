<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  import type { MergedProduct } from "$lib/types"
  import { getProductPrice } from "$lib/modules/cart"

  export let post: MergedProduct

  const style = post.backgroundColor?.hex
    ? `background-color: ${post.backgroundColor.hex};`
    : "background-color: var(--grey)"

  const price = getProductPrice(post)
</script>

<a
  href={`/shop/${post.slug?.current ?? ""}`}
  class="shop-listing-item {post.listingSize ?? 'third'}"
  {style}
>
  <div class="information">
    <div class="title-section">
      <div class="title">{post.title}</div>
      {#if post.subtitle}
        <div class="subtitle">{post.subtitle}</div>
      {/if}
    </div>
  </div>
  {#if price}
    <div class="price">€{price}</div>
  {/if}
  <img
    src={urlFor(post.mainImage).width(800).quality(100).auto("format").url()}
    alt={post.title}
  />
</a>

<style lang="scss">
  @import "../../styles/variables.scss";

  .shop-listing-item {
    height: 600px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    position: relative;

    .information {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px;
      padding-inline: 20px;
      font-family: $sans-stack;
      font-size: $body;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title-section {
        display: flex;
        flex-direction: column;

        .title {
          font-size: $body;
        }

        .subtitle {
          font-size: $small;
        }
      }
    }

    .price {
      position: absolute;
      bottom: 0;
      left: 0;
      font-family: $sans-stack;
      font-size: $intro;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }

    img {
      max-width: 65%;
      max-height: 65%;
      overflow: hidden;
      object-fit: cover;
    }

    &.full {
      width: 100%;

      @include screen-size("small") {
        width: 100%;
      }
    }

    &.half {
      width: 50%;

      @include screen-size("small") {
        width: 100%;
      }
    }

    &.third {
      width: 33.3333%;

      @include screen-size("small") {
        width: 100%;
      }
    }

    &:hover {
      img,
      .information {
        opacity: 0.7;
      }
      .price {
        opacity: 0.7;
      }
    }
  }
</style>
