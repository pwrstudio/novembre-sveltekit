<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import EmblaCarousel from "embla-carousel"
  import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
  import Autoscroll from "embla-carousel-auto-scroll"
  import type { AutoScrollOptionsType } from "embla-carousel-auto-scroll"

  export let tagArray: { title: string; slug: string }[]
  export let category: "magazine" | "bureau"
  export let activeItem: string = ""

  let scrollListEl: HTMLElement
  let loaded = true
  let emblaApi: EmblaCarouselType | undefined = undefined

  // *** ON MOUNT
  onMount(async () => {
    let options: EmblaOptionsType = { loop: true, watchDrag: false }
    let autoscrollOptions: AutoScrollOptionsType = {
      startDelay: 0,
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }
    emblaApi = EmblaCarousel(scrollListEl, options, [
      Autoscroll(autoscrollOptions),
    ])
  })
</script>

<div class="taxonomy-scroller" in:fade>
  <div
    class:loaded
    class="main-carousel taxonomy-scroller__slideshow
    taxonomy-scroller__slideshow--large"
  >
    <div class="embla" bind:this={scrollListEl}>
      <div class="embla__container">
        {#each tagArray as t}
          <div class="embla__slide carousel-cell taxonomy-scroller__slide">
            <a
              href={`/${category}/category/${t.slug}`}
              class:active={t.slug === activeItem}
              class="taxonomy__item taxonomy-scroller__link"
            >
              {t.title}
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .taxonomy-scroller {
    height: 96px;
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 0.8em;
    padding-bottom: $small-margin;
    padding-top: $small-margin;
    position: fixed;
    top: 75px;
    width: 100%;
    left: 0;
    overflow: hidden;
    z-index: 99;

    @include screen-size("small") {
      font-size: $mobile_large;
      padding-bottom: $small-margin;
      padding-top: $small-margin;
      height: 67px;
    }

    width: 100%;
    background: $black;
    color: $white;
    opacity: 1;
    transition:
      opacity 0.3s ease-out,
      transform 0.3s ease-out;

    &__slide {
      display: inline-block;
      margin-right: 30px;
      white-space: nowrap;
      height: auto;
      overflow: visible;
      padding-top: 3px;

      a {
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }

      a:hover,
      a:active {
        border-bottom: 2px solid $grey;
      }

      a.active {
        border-bottom: 2px solid white;
      }

      @include screen-size("small") {
        margin-right: 20px;
      }
    }

    &__slideshow {
      height: 96px;
      width: 100%;
      font-family: $sans-stack;
      font-size: $large;
      font-weight: 300;
      line-height: 1.4em;
      opacity: 0;

      &.loaded {
        opacity: 1;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
        padding-bottom: 3px;
      }
    }
  }
</style>
