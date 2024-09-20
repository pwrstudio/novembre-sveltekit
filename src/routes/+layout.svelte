<script lang="ts">
  import type { Meta, Banner } from "$lib/types/sanity.types"
  import { isEmpty } from "lodash-es"
  import { menuActive } from "$lib/modules/stores"
  import { getCookie, setCookie } from "$lib/modules/utils"
  import { onMount } from "svelte"
  import {
    cart,
    saveCartToLocalStorage,
    loadCartFromLocalStorage,
  } from "$lib/modules/cart"
  import Navigation from "$lib/components/navigation/Navigation.svelte"
  import MailingListOverlay from "$lib/components/overlays/MailingListOverlay.svelte"
  import BannerOverlay from "$lib/components/overlays/BannerOverlay.svelte"
  import MobileCart from "$lib/components/navigation/MobileCart.svelte"

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

    // Load cart from local storage
    cart.set(loadCartFromLocalStorage())

    // Write to local storage whenever the cart changes
    cart.subscribe(value => {
      saveCartToLocalStorage(value)
    })

    // Prevent scrolling when the menu is active
    menuActive.subscribe(value => {
      if (value) {
        document.querySelector("body")?.classList.add("no-scroll")
      } else {
        document.querySelector("body")?.classList.remove("no-scroll")
      }
    })
  })
</script>

<!-- MENU -->
<Navigation {menuBanners} />

<!-- MOBILE CART -->
<MobileCart />

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
