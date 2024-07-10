<script lang="ts">
  import type { Product } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import ProductComponent from "$lib/components/shop/Product.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"

  export let data: {
    post: Product
  }

  // Reactive, to reload on page navigation
  $: post = data.post
</script>

<MetaData {post} />
<ProductComponent {post} />
<Footer active />
