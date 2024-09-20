<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import { ListingType } from "$lib/enums"
  import type { MergedProduct } from "$lib/types"

  import SplashText from "../splashText/SplashText.svelte"
  import ShopListingItem from "./ShopListingItem.svelte"
  import ShopPlaceholder from "./ShopPlaceholder.svelte"

  export let posts: MergedProduct[]
  export let globalConfig: Meta

  const shopIsEmpty = (posts ?? []).length === 0
</script>

{#if shopIsEmpty}
  <ShopPlaceholder {globalConfig} />
{:else}
  <SplashText listingType={ListingType.Shop} {globalConfig} />
  <div class="shop-listing">
    {#each posts as post}
      <ShopListingItem {post} />
    {/each}
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .shop-listing {
    display: flex;
    flex-wrap: wrap;
  }
</style>
