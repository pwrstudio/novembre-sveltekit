<script lang="ts">
  import type { Meta, Article } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Listing from "$lib/components/listing/Listing.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"
  import { ListingType } from "$lib/enums/index.js"

  export let data: {
    posts: Article[]
    globalConfig: Meta
  }
  const { posts, globalConfig } = data
</script>

<MetaData />
<Listing listingType={ListingType.MagazineCategory} {posts} {globalConfig} />
<Footer active />
