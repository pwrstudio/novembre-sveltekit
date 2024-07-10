<script lang="ts">
  import { get } from "lodash-es"
  import { urlFor } from "$lib/modules/sanity"

  export let slides: any[]
  export let isRelated: boolean
</script>

<div class="static-related-single">
  {#if isRelated}
    <a href="/{slides[0].category}/{slides[0].slug}">
      <img
        src={urlFor(
          get(slides[0], "relatedSlideshow.image", slides[0].mainImage),
        )
          .width(1200)
          .quality(100)
          .auto("format")
          .url()}
        alt={slides[0].title}
      />
      <div
        class="slideshow__title"
        style="color: {get(
          slides[0],
          'relatedSlideshow.textColor.hex',
          'white',
        )};"
      >
        {@html slides[0].title}
      </div>
    </a>
  {:else}
    <img
      src={urlFor(slides[0].mainImage)
        .width(1200)
        .quality(100)
        .auto("format")
        .url()}
      alt={slides[0].title}
    />
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .static-related-single {
    width: 100%;
    height: 600px;

    a {
      position: relative;
      width: 100%;
      height: 100%;

      img {
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }
  }

  .slideshow__title {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
    line-height: 0.9em;
    position: absolute;
    bottom: $small-margin;
    left: $small-margin;
    max-width: 95%;
    color: $white;

    em {
      font-family: $serif-stack;
      font-style: italic;
    }

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }
</style>
