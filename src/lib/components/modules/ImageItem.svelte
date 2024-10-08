<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"

  export let slidesLength: number
  export let fullwidth = false
  export let caption: string | false = ""
  export let listing = false
  export let header = false
  export let image: any

  let loaded = true
  let groupSize = `group-size-${slidesLength}`
  let src = ""

  function getImageUrl(iO: any) {
    try {
      return fullwidth
        ? urlFor(iO).width(1800).height(1200).quality(100).auto("format").url()
        : urlFor(iO)
            .width(1800 / slidesLength)
            .quality(100)
            .auto("format")
            .url()
    } catch (e) {
      console.warn("Failed to load image:", e)
      return ""
    }
  }

  $: src = getImageUrl(image)
</script>

{#if src}
  <img
    class={groupSize}
    class:loaded
    class:listing
    class:header
    {src}
    alt={caption ? caption : "novembre.global"}
    on:load={_ => (loaded = true)}
  />
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  img {
    opacity: 0;
    transition: opacity 0.25s $transition;
    object-fit: contain;
    margin-left: $small-margin;
    height: 100%;

    @include screen-size("small") {
      max-height: unset;
      object-fit: unset;
      height: auto;
    }

    &.loaded {
      opacity: 1;
    }

    &.group-size-1 {
      height: 100%;

      @include screen-size("small") {
        max-width: unset;
        width: 85vw;
      }
    }

    &.group-size-2 {
      max-width: 40vw;
      @include screen-size("small") {
        max-width: unset;
        width: 45vw;
      }
    }

    &.group-size-3 {
      max-width: 30vw;

      @include screen-size("small") {
        display: inline-block;
        max-width: unset;
        width: 45vw;
        margin-bottom: 10px;
      }
    }

    &.group-size-4 {
      max-width: 23vw;
      @include screen-size("small") {
        display: inline-block;
        max-width: unset;
        width: 45vw;
        margin-bottom: 10px;
      }
    }

    &.fullwidth {
      height: 100%;
      width: 100%;
      object-fit: cover;
      max-width: unset;
      padding: 0;
      margin: 0;

      @include screen-size("small") {
        object-fit: contain;
      }
    }

    &.listing {
      margin-bottom: $small-margin;
      float: left;
      object-position: top;
      max-height: 435px;
      @include screen-size("small") {
        float: unset;
        max-height: unset;
      }
    }

    &.header {
      margin-bottom: $small-margin;
      float: left;
      object-position: top;
      max-height: 535px;
      @include screen-size("small") {
        float: unset;
      }
    }
  }
</style>
