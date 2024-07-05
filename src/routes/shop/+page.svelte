<script lang="ts">
  import type { Product } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import ShopListing from "$lib/components/shop/ShopListing.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"

  export let data: {
    posts: Product[]
  }
  const { posts } = data
</script>

<MetaData post={{ title: "Shop" }} />
<ShopListing {posts} />
<Footer active />
