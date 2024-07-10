<script lang="ts">
  import type { Meta, Banner } from "$lib/types/sanity.types"
  import { isEmpty } from "lodash-es"
  import Navigation from "$lib/components/navigation/Navigation.svelte"
  import MailingListOverlay from "$lib/components/overlays/MailingListOverlay.svelte"
  import BannerOverlay from "$lib/components/overlays/BannerOverlay.svelte"
  import { getCookie, setCookie } from "$lib/modules/utils"
  import { onMount } from "svelte"

  export let data: {
    globalConfig: Meta
    menuBanners: Banner[]
    overlayBanners: Banner[]
  }
  const { globalConfig, menuBanners, overlayBanners } = data

  let overlayActive = false
  let mailingListOverlayActive = false

  onMount(() => {
    if (!getCookie("nov_seen-banner")) {
      setTimeout(() => {
        overlayActive = true
      }, 3000)
      setCookie("nov_seen-banner", "true", 1)
    }

    if (!getCookie("nov_seen-mailing-list")) {
      setTimeout(() => {
        mailingListOverlayActive = true
      }, 3000)
      setCookie("nov_seen-mailing-list", "true", 1)
    }
  })

  // $: if($menuActive) {
  //   document.querySelector("body").classList.add("no-scroll")
  // } else {
  //   document.querySelector("body").classList.remove("no-scroll")
  // }

  //   $: {
  //     menuActive
  //       ? document.querySelector("body").classList.add("no-scroll")
  //       : document.querySelector("body").classList.remove("no-scroll")
  //   }
</script>

<!-- MENU -->
<Navigation {menuBanners} />

<!-- OVERLAY BANNER -->
{#if !isEmpty(overlayBanners) && overlayActive}
  <BannerOverlay {overlayBanners} />
{/if}

<!-- MAILING LIST OVERLAY -->
{#if globalConfig.showMailingListOverlay && mailingListOverlayActive}
  <MailingListOverlay />
{/if}

<!-- MAIN CONTENT SLOT -->
<slot />
