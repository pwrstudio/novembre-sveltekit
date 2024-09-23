<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import { urlFor } from "$lib/modules/sanity"
  export let globalConfig: Meta

  const backgroundColor = globalConfig?.shopColor?.hex ?? ""

  const src = globalConfig.shopPlaceholderImage
    ? urlFor(globalConfig.shopPlaceholderImage).width(600).auto("format").url()
    : ""
</script>

<div class="shop-placeholder" style="background: {backgroundColor};">
  <div class="image">
    <img {src} alt="Shop Placeholder" />
  </div>
  <div class="text">NOVEMBRE SHOP COMING SOON</div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .shop-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    flex-direction: column;

    .image {
      img {
        width: 100%;
        height: auto;
      }
    }

    .text {
      text-align: center;
      font-family: var(--sans-stack);
      font-size: var(--body);
      line-height: 1em;
      margin-top: 1em;

      @include screen-size("small") {
        font-size: var(--mobile_body);
      }
    }
  }
</style>
