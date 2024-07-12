<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  import type { MergedProduct } from "$lib/types"
  import { getProductPrice } from "$lib/modules/cart"

  export let post: MergedProduct

  const style = post.backgroundColor?.hex
    ? `background-color: ${post.backgroundColor.hex};`
    : ""

  const price = getProductPrice(post)
</script>

<a href={`/shop/${post.slug?.current ?? ""}`} class="shop-listing-item" {style}>
  <div class="title">
    {post.title}
    {#if price}- €{price}{/if}
  </div>
  <img
    src={urlFor(post.mainImage).width(800).quality(100).auto("format").url()}
    alt={post.title}
  />
</a>

<style lang="scss">
  @import "../../styles/variables.scss";

  .shop-listing-item {
    width: 50%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      position: absolute;
      top: 10px;
      left: 10px;
      font-family: $sans-stack;
      font-size: $body;
    }

    img {
      max-width: 80%;
      max-height: 80%;
      overflow: hidden;
      object-fit: cover;
    }
  }
</style>
