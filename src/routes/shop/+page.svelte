<script lang="ts">
  import type { Product, Meta } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import ShopListing from "$lib/components/shop/ShopListing.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"

  export let data: {
    posts: Product[]
    globalConfig: Meta
  }
  const { posts, globalConfig } = data

  console.log(posts)
</script>

<MetaData post={{ title: "Shop" }} />
<ShopListing {posts} {globalConfig} />
<Footer active />
