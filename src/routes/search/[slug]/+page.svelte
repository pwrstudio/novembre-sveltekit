<script lang="ts">
  import type { Article, Meta } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Listing from "$lib/components/listing/Listing.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"
  import { ListingType } from "$lib/enums/index.js"
  import TagBar from "$lib/components/tagBar/TagBar.svelte"

  export let data: {
    posts: Article[]
    globalConfig: Meta
    text: string
  }
  const globalConfig = data.globalConfig
  // Reactive, to reload on page navigation
  $: posts = data.posts
  $: text = data.text
</script>

<MetaData />
<TagBar {text} />
<Listing listingType={ListingType.Search} {posts} {globalConfig} {text} />
<Footer active />
