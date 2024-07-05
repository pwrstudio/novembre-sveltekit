<script lang="ts">
  import type { Article, Meta, Banner } from "$lib/types/sanity.types"
  import { ListingType } from "$lib/enums/index.js"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Listing from "$lib/components/listing/Listing.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"

  export let data: {
    posts: Article[]
    globalConfig: Meta
    feedBanners: Banner[]
  }
  const { posts, globalConfig, feedBanners } = data
</script>

<MetaData />

<Listing
  listingType={ListingType.Landing}
  {posts}
  {globalConfig}
  {feedBanners}
/>

<Footer active />
