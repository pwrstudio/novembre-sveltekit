<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"

  export let slide: any
  export let isRelated: boolean
</script>

{#if isRelated}
  <div class="embla__slide slideshow__slide slideshow__slide--related">
    <a href="/{slide.category}/{slide.slug}">
      <img
        class="slideshow__slide-image slideshow__slide-image--related"
        src={urlFor(slide.relatedSlideshow?.image ?? slide.mainImage)
          .height(600)
          .quality(80)
          .auto("format")
          .url()}
        alt={slide.title}
      />
      <div
        class="slideshow__title"
        style="color: {slide.relatedSlideshow?.textColor?.hex ?? 'white'};"
      >
        {@html slide.title}
      </div>
    </a>
  </div>
{:else}
  <div class="embla__slide slideshow__slide">
    <img
      class="slideshow__slide-image"
      src={urlFor(slide).height(600).quality(80).auto("format").url()}
      alt={slide.caption}
    />
    {#if slide.caption}
      <div class="slideshow__slide-caption">{slide.caption}</div>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .slideshow {
    &__slideshow {
      height: 100%;
    }

    &__slide-image {
      height: 100%;

      @include screen-size("small") {
        height: 400px;
      }

      &--related {
        width: 100%;
        object-fit: cover;
      }
    }

    &__slide-caption {
      color: $white;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
      font-family: $sans-stack;
      font-size: $small;
      width: 100%;
      opacity: 0;
      transition-delay: 0s;
      transition: opacity 0.5s $transition;
    }

    &__slide {
      height: 100%;
      width: 50%;
      position: relative;

      @include screen-size("small") {
        height: 400px;
      }

      &--related {
        flex: 0 0 50vw;
        height: 600px;

        @include screen-size("small") {
          width: 100%;
          height: 400px;
        }
      }

      &:hover {
        .slideshow__slide-caption {
          opacity: 1;
          transition-delay: 0.85s;
        }
      }
    }

    &__slide-video {
      height: 100%;
    }

    &__title {
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

      &.double {
        @include screen-size("small") {
          font-size: $mobile_intro;
        }
      }
    }
  }
</style>
