<script lang="ts">
  import type { Color } from "$lib/types/sanity.types"

  import ImageItem from "$lib/components/modules/ImageItem.svelte"
  import MediaQuery from "$lib/components/MediaQuery.svelte"

  export let slides: any[] = []
  export let caption: string | false = false
  export let isListing = false
  export let isHeader = false
  export let noCropPhone = false
  export let backgroundColor: Color | undefined = undefined
  export let alignment = ""
  export let verticalAlignment = "vertical-center"
  export let fullwidth = false
  export let maxHeight = false
  export let inlineDisplay = false
  export let linkUrl = ""

  $: customStyles =
    (maxHeight ? "height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "")

  $: customStylesPhone = backgroundColor
    ? "background:" + backgroundColor.hex + ";"
    : ""
</script>

<MediaQuery query="(min-width: 800px)" let:matches>
  {#if linkUrl}
    <a
      href={linkUrl}
      target="_blank"
      class="image-group {alignment} {verticalAlignment || 'vertical-center'}"
      class:listing={isListing}
      class:header={isHeader}
      class:no-crop-phone={noCropPhone}
      class:fullwidth
      class:bottom-space={inlineDisplay}
      style={matches ? customStyles : customStylesPhone}
    >
      {#each slides as image}
        <ImageItem
          {image}
          {caption}
          {fullwidth}
          {noCropPhone}
          listing={isListing}
          header={isHeader}
          slidesLength={slides.length}
        />
      {/each}
    </a>
  {:else}
    <div
      class="image-group {alignment} {verticalAlignment || 'vertical-center'}"
      class:listing={isListing}
      class:header={isHeader}
      class:no-crop-phone={noCropPhone}
      class:fullwidth
      class:bottom-space={inlineDisplay}
      style={matches ? customStyles : customStylesPhone}
    >
      {#each slides as image}
        <ImageItem
          {image}
          {caption}
          {fullwidth}
          {noCropPhone}
          listing={isListing}
          header={isHeader}
          slidesLength={slides.length}
        />
      {/each}
    </div>
  {/if}
  {#if caption}
    <div class="caption {alignment}">{caption}</div>
  {/if}
</MediaQuery>

<style lang="scss">
  @use "../../styles/variables.scss" as *;

  .image-group {
    width: 100%;
    height: 100vh;
    display: inline-flex;
    align-items: flex-start;
    border-bottom: none;

    &.vertical-top {
      align-items: flex-start;
    }

    &.vertical-center {
      align-items: center;
    }

    &.vertical-bottom {
      align-items: flex-end;
    }

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
    letter-spacing: var(--standard-letter-spacing);

    &.left {
      text-align: left;
    }

    &.right {
      text-align: right;
    }

    &.center {
      text-align: center;
    }
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

      // On phones, crop the group into a single landscape strip (images
      // side by side) unless the "no crop on phone" option is set — then
      // fall back to whole images at natural height (see ImageItem).
      &:not(.no-crop-phone) {
        @include screen-size("small") {
          display: flex;
          flex-wrap: nowrap;
          height: 40vh;
          max-height: unset;
        }
      }

      // No-crop mode: whole images at natural height, wrapping. The imgs
      // have no whitespace between them, so inline-block cannot wrap here.
      &.no-crop-phone {
        @include screen-size("small") {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          height: auto;
          max-height: unset;
        }
      }
    }
  }
</style>
