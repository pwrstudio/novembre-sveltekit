<script lang="ts">
  import type { Color } from "$lib/types/sanity.types"

  import ImageItem from "$lib/components/modules/ImageItem.svelte"
  import MediaQuery from "svelte-media-query"

  export let slides: any[] = []
  export let caption: string | false = false
  export let isListing = false
  export let isHeader = false
  export let backgroundColor: Color | undefined = undefined
  export let alignment = ""
  export let fullwidth = false
  export let maxHeight = false
  export let inlineDisplay = false
  export let linkUrl = ""

  const customStyles =
    (maxHeight ? "height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "")

  const customStylesPhone = backgroundColor
    ? "background:" + backgroundColor.hex + ";"
    : ""
</script>

<MediaQuery query="(min-width: 800px)" let:matches>
  {#if linkUrl}
    <a
      href={linkUrl}
      target="_blank"
      class="image-group {alignment}"
      class:listing={isListing}
      class:header={isHeader}
      class:fullwidth
      class:bottom-space={inlineDisplay}
      style={matches ? customStyles : customStylesPhone}
    >
      {#each slides as image}
        <ImageItem
          {image}
          {caption}
          {fullwidth}
          listing={isListing}
          header={isHeader}
          slidesLength={slides.length}
        />
      {/each}
    </a>
  {:else}
    <div
      class="image-group {alignment}"
      class:listing={isListing}
      class:header={isHeader}
      class:fullwidth
      class:bottom-space={inlineDisplay}
      style={matches ? customStyles : customStylesPhone}
    >
      {#each slides as image}
        <ImageItem
          {image}
          {caption}
          {fullwidth}
          listing={isListing}
          header={isHeader}
          slidesLength={slides.length}
        />
      {/each}
    </div>
  {/if}
  {#if caption}
    <div class="caption">{caption}</div>
  {/if}
</MediaQuery>

<style lang="scss">
  @import "../../styles/variables.scss";

  .image-group {
    width: 100%;
    height: 100vh;
    display: inline-flex;
    // padding-bottom: 2 * $small-margin;
    align-items: flex-start;
    border-bottom: none;

    @include screen-size("small") {
      height: auto;
      flex-wrap: wrap;
    }

    &.bottom-space {
      margin-bottom: $large-vertical-margin;
    }
  }

  .caption {
    font-family: $sans-stack;
    font-size: $xsmall;
    font-weight: 300;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-bottom: $large-vertical-margin;
    letter-spacing: 0.1em;
  }

  .left {
    justify-content: flex-start;
  }

  .right {
    justify-content: flex-end;
  }

  .center {
    justify-content: center;
  }

  .fullwidth {
    height: $full-height;
    width: 100vw;
    padding: 0;

    @include screen-size("small") {
      height: auto;
    }
  }

  .image-group {
    &.listing {
      margin-top: 0px;
      margin-bottom: 0px;
      padding-bottom: 0;
      display: inline-block;
      max-height: 440px;
      @include screen-size("small") {
        height: auto;
        width: 100vw;
        max-height: unset;
      }
    }
  }

  .image-group {
    &.header {
      margin-top: 0px;
      margin-bottom: 0px;
      padding-bottom: 0;
      display: inline-block;
      max-height: 540px;
      @include screen-size("small") {
        height: auto;
        width: 100vw;
      }
    }
  }
</style>
