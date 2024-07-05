<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import Footer from "$lib/components/footer/Footer.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import Contact from "$lib/components/pages/Contact.svelte"

  export let data: {
    globalConfig: Meta
  }
  const { globalConfig } = data
</script>

<MetaData post={{ title: "Contact" }} />
<Contact {globalConfig} />
<Footer active />
