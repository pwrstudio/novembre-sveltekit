<script lang="ts">
  import type { Color } from "$lib/types/sanity.types"
  import MediaQuery from "svelte-media-query"
  import { urlFor } from "$lib/modules/sanity"

  // *** PROPS
  export let imageObject = {}
  export let caption = ""
  export let backgroundColor: Color | undefined = undefined
  export let alignment = ""
  export let maxHeight = false
  export let fullwidth = false
  export let isListing = false
  export let inlineDisplay = false
  export let linkUrl = ""

  const customStyles =
    (maxHeight ? "max-height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "")

  const figureCustomStyles = maxHeight ? "max-height:" + maxHeight + "vh; " : ""

  let loaded = true

  // *** VARIABLES

  function getImageUrl(iO: any) {
    try {
      return fullwidth
        ? urlFor(iO).width(1600).height(1100).quality(100).auto("format").url()
        : urlFor(iO).width(800).quality(100).auto("format").url()
    } catch (e) {
      console.warn("Failed to load image:", e)
      return ""
    }
  }

  function getPortraitUrl(iO: any) {
    try {
      return urlFor(iO).width(800).quality(100).auto("format").url()
    } catch (e) {
      console.warn("Failed to load image:", e)
      return ""
    }
  }

  $: src = getImageUrl(imageObject)
  $: srcPortrait = getPortraitUrl(imageObject)
</script>

{#if linkUrl}
  <a
    href={linkUrl}
    target="_blank"
    class="single-image {alignment}"
    class:fullwidth
    class:listing={isListing}
    class:bottom-space={inlineDisplay}
    style={customStyles}
  >
    <MediaQuery query="(min-width: 800px)" let:matches>
      <figure style={figureCustomStyles}>
        <img
          class:loaded
          style={figureCustomStyles}
          src={matches ? src : srcPortrait}
          alt={caption ? caption : "novembre.global"}
          on:load={e => (loaded = true)}
        />
        {#if caption}
          <figcaption>{caption}</figcaption>
        {/if}
      </figure>
    </MediaQuery>
  </a>
{:else}
  <div
    class="single-image {alignment}"
    class:fullwidth
    class:listing={isListing}
    class:bottom-space={inlineDisplay}
    style={customStyles}
  >
    <MediaQuery query="(min-width: 800px)" let:matches>
      <figure style={figureCustomStyles}>
        <img
          class:loaded
          style={figureCustomStyles}
          src={matches ? src : srcPortrait}
          alt={caption ? caption : "novembre.global"}
          on:load={e => (loaded = true)}
        />
        {#if caption}
          <figcaption>{caption}</figcaption>
        {/if}
      </figure>
    </MediaQuery>
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .single-image {
    height: 100vh;
    width: 100%;
    display: block;
    border-bottom: unset;

    @include screen-size("small") {
      height: auto;
      width: 100%;
    }
  }

  .bottom-space {
    margin-bottom: $large-vertical-margin;
  }

  img {
    opacity: 0;
    transition: opacity 0.25s $transition;
    height: 100%;
    width: 800px;
    object-fit: contain;
    max-width: 95vw;
    display: block;

    @include screen-size("small") {
      height: auto;
      width: 100%;
      max-height: 100%;
    }

    &.loaded {
      opacity: 1;
    }
  }

  figure {
    display: block;
    height: 100%;
    margin: 0;
  }

  figcaption {
    font-family: $sans-stack;
    font-size: $small;
    font-weight: 300;
    width: 100%;
    text-align: center;
    letter-spacing: var(--standard-letter-spacing);
  }

  .center {
    text-align: center;
    figure {
      margin-left: auto;
      margin-right: auto;
    }
  }

  .left {
    text-align: left;
    @include screen-size("small") {
      text-align: center;
    }

    figure {
      margin-left: $small-margin;
      margin-right: auto;
      display: block;

      @include screen-size("small") {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  .right {
    text-align: right;

    @include screen-size("small") {
      text-align: center;
    }

    figure {
      margin-left: auto;
      margin-right: $small-margin;
      display: block;

      @include screen-size("small") {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  .fullwidth {
    height: $full-height;
    width: 100vw;
    padding: 0;

    @include screen-size("small") {
      height: 100%;
      // padding-top: 100px;
      // padding-bottom: 40px;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      max-width: unset;

      @include screen-size("small") {
        object-fit: contain;
      }
    }

    figure {
      height: $full-height;
      width: 100vw;
      display: block;

      @include screen-size("small") {
        height: 100%;
      }
    }

    figcaption {
      height: auto;
      width: 800px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
      margin-bottom: $large-vertical-margin;
    }
  }

  .listing {
    img {
      object-fit: cover;
      @include screen-size("small") {
        object-fit: contain;
      }
    }
  }
</style>
