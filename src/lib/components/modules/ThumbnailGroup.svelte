<script lang="ts">
  import type { Color } from "$lib/types/sanity.types"
  import { urlFor } from "$lib/modules/sanity"
  import { fade } from "svelte/transition"

  export let slides: any[] = []
  export let backgroundColor: Color | undefined = undefined

  export let fullwidth = false

  let activeImage = false

  const customStyles = backgroundColor
    ? "background:" + backgroundColor.hex + ";"
    : ""

  const customStylesPhone = backgroundColor
    ? "background:" + backgroundColor.hex + ";"
    : ""

  let loaded = true
</script>

<div class="thumbnail-group" style={customStyles}>
  {#each slides as image}
    <img
      alt=""
      class:loaded
      role="presentation"
      src={urlFor(image).width(300).quality(100).auto("format").url()}
      on:load={e => (loaded = true)}
      on:click={e => {
        activeImage = image
      }}
    />
  {/each}
</div>

{#if activeImage}
  <div
    class="image-popup"
    role="presentation"
    in:fade
    on:click={e => {
      activeImage = false
    }}
  >
    <img
      alt=""
      src={urlFor(activeImage).width(1200).quality(100).auto("format").url()}
    />
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .thumbnail-group {
    width: 100%;
    height: 100vh;
    display: inline-flex;
    padding-bottom: 2 * $small-margin;
    align-items: flex-start;
    border-bottom: none;

    @include screen-size("small") {
      height: auto;
    }

    img {
      opacity: 0;
      transition: opacity 0.25s $transition;
      object-fit: contain;
      margin-left: $small-margin;
      margin-top: $small-margin;
      display: block;

      @include screen-size("small") {
        max-height: unset;
        object-fit: unset;
        height: auto;
      }

      &.loaded {
        opacity: 1;
      }

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }

    &.bottom-space {
      margin-bottom: $large-vertical-margin;
      img {
        margin-top: -$small-margin;
      }
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

    // img {
    //   height: 100%;
    //   width: 100%;
    //   object-fit: cover;
    //   max-width: unset;
    //   padding: 0;
    //   margin: 0;

    //   @include screen-size("small") {
    //     object-fit: contain;
    //   }
    // }
  }

  .image-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;

    img {
      max-width: 90%;
      max-height: 90%;
    }
  }
</style>
