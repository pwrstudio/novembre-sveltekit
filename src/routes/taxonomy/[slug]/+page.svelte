<script lang="ts">
  import type { Article, Meta } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Listing from "$lib/components/listing/Listing.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"
  import { ListingType } from "$lib/enums/index.js"

  export let data: {
    posts: Article[]
    globalConfig: Meta
  }
  const globalConfig = data.globalConfig
  // Reactive, to reload on page navigation
  $: posts = data.posts
</script>

<MetaData />
<Listing listingType={ListingType.Tag} {posts} {globalConfig} />
<Footer active />
