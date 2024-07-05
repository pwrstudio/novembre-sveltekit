<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import Footer from "$lib/components/footer/Footer.svelte"
  import About from "$lib/components/pages/About.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: {
    globalConfig: Meta
  }
  const { globalConfig } = data
</script>

<MetaData post={{ title: "About" }} />
<About {globalConfig} />
<Footer active />
