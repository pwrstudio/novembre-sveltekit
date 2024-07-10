<script lang="ts">
  import type { Meta, Article } from "$lib/types/sanity.types"
  import { ListingType } from "$lib/enums/index.js"
  import { magazineTags } from "$lib/constants"
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
</script>

<MetaData />
<ScrollList tagArray={magazineTags} category="magazine" {activeItem} />
<Listing listingType={ListingType.MagazineCategory} {posts} {globalConfig} />
<Footer active />
