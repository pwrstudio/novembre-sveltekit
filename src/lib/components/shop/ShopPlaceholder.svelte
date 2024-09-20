<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  export let globalConfig: Meta

  const backgroundColor = globalConfig?.shopColor?.hex ?? ""
</script>

<div class="shop-placeholder" style="background: {backgroundColor};">
  <div class="text">NOVEMBRE SHOP<br />COMING SOON</div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .shop-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;

    .text {
      text-align: center;
      font-family: var(--sans-stack);
      font-size: var(--large);
      line-height: 1em;

      @include screen-size("small") {
        font-size: var(--mobile_large);
      }
    }
  }
</style>
