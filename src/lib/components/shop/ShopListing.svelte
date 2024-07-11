<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import { ListingType } from "$lib/enums"
  import SplashText from "../splashText/SplashText.svelte"
  import ShopListingItem from "./ShopListingItem.svelte"
  import type { MergedProduct } from "$lib/types"

  export let posts: MergedProduct[]
  export let globalConfig: Meta
</script>

<SplashText listingType={ListingType.Shop} {globalConfig} />

<div class="shop-listing">
  {#each posts as post}
    <ShopListingItem {post} />
  {/each}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .shop-listing {
    display: flex;
    flex-wrap: wrap;
  }
</style>
