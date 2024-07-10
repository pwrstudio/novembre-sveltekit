<script lang="ts">
  import type { Meta, Article } from "$lib/types/sanity.types"
  import { ListingType } from "$lib/enums/index.js"
  import { bureauTags } from "$lib/constants"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Listing from "$lib/components/listing/Listing.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"
  import ScrollList from "$lib/components/scrollList/ScrollList.svelte"

  export let data: {
    posts: Article[]
    globalConfig: Meta
    activeItem: string
  }

  const globalConfig = data.globalConfig
  // Reactive, to reload on page navigation
  $: posts = data.posts
  $: activeItem = data.activeItem

  $: console.log("activeItem", activeItem)
</script>

<ScrollList tagArray={bureauTags} category="bureau" {activeItem} />
<MetaData />
<Listing listingType={ListingType.BureauCategory} {posts} {globalConfig} />
<Footer active />
