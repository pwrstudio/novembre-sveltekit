<script lang="ts">
  import type { Product } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import ProductComponent from "$lib/components/shop/Product.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"

  export let data: {
    post: Product
  }
  const { post } = data
</script>

<MetaData {post} />
<ProductComponent {post} />
<Footer active />
