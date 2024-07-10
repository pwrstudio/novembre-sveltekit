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
  }
  const { posts, globalConfig } = data
</script>

<MetaData />
<ScrollList tagArray={magazineTags} category="magazine" />
<Listing listingType={ListingType.Magazine} {posts} {globalConfig} />
<Footer active />
