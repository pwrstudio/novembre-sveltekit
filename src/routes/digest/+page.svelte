<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import Footer from "$lib/components/footer/Footer.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Digest from "$lib/components/pages/Digest.svelte"

  export let data: {
    globalConfig: Meta
  }
  const { globalConfig } = data
</script>

<MetaData post={{ title: "Digest" }} />
<Digest {globalConfig} />
<Footer active />
