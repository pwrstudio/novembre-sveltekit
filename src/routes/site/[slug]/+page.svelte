<script lang="ts">
  import type { SatelliteSite } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"
  import SatelliteSiteComponent from "$lib/components/satelliteSite/SatelliteSite.svelte"

  export let data: {
    post: SatelliteSite
  }
  const { post } = data
</script>

<MetaData {post} />
<SatelliteSiteComponent {post} />
<Footer active />
