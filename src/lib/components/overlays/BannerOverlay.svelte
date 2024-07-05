<script lang="ts">
  import { fade } from "svelte/transition"
  import { urlFor } from "$lib/modules/sanity"
  import type { Banner } from "$lib/types/sanity.types"

  let overlayActive = true
  export let overlayBanners: Banner[]
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="overlay-banner"
  on:click={e => {
    overlayActive = false
  }}
  in:fade
>
  <a
    href={overlayBanners[0].link}
    target="_blank"
    rel="noreferrer"
    class="inner"
  >
    <img
      alt="novembre.global"
      src={urlFor(overlayBanners[0].image)
        .width(1000)
        .quality(90)
        .auto("format")
        .url()}
    />
  </a>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svg
    on:click={e => {
      overlayActive = false
    }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    class="close"
    viewBox="0 0 1000 1000"
    enable-background="new 0 0 1000 1000"
    xml:space="preserve"
  >
    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
      <path
        d="M146.3,4961c-27.2-27.2-46.3-73.5-46.3-103.5c0-32.7,876.6-928.3,2346.6-2398.3L4795.8,110L2446.6-2239.3C840.4-3845.4,100-4604.9,100-4643c0-68.1,81.7-147,152.4-147c32.7,0,928.3,876.6,2398.3,2346.6L5000-94.2l2349.3-2349.3C8955.4-4049.6,9714.9-4790,9753-4790c68.1,0,147,81.7,147,152.4c0,32.7-876.6,928.3-2346.6,2398.3L5204.2,110l2349.3,2349.3C9159.5,4065.4,9900,4824.9,9900,4863c0,68.1-81.7,147-152.4,147c-32.7,0-928.3-876.6-2398.3-2346.6L5000,314.2L2650.7,2663.4C1044.6,4269.6,285.1,5010,247,5010C214.3,5010,170.8,4988.2,146.3,4961z"
      />
    </g>
  </svg>
</div>
