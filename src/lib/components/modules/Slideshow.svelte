<script lang="ts">
  import { onMount } from "svelte"
  import EmblaCarousel from "embla-carousel"
  import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
  import Autoplay from "embla-carousel-autoplay"
  import type { AutoplayOptionsType } from "embla-carousel-autoplay"

  import Ellipse from "$lib/components/ellipse/Ellipse.svelte"
  import ArrowRight from "../graphics/ArrowRight.svelte"
  import ArrowLeft from "../graphics/ArrowLeft.svelte"
  import SlideshowSlide from "./SlideshowSlide.svelte"

  export let slides: any[]
  export let isRelated = false
  export let isListing = false
  export let autoplay = false

  let slideShowEl: HTMLDivElement

  let emblaApi: EmblaCarouselType | undefined = undefined

  // const tickerSpeed = 0.4
  let isPaused = true
  let loaded = true
  let hovered = false

  const SharedEmblaOptions: EmblaOptionsType = {
    slidesToScroll: 2,
    loop: true,
    dragFree: true,
  }

  const EmblaAutoplayOptions: AutoplayOptionsType = {
    stopOnMouseEnter: true,
  }

  const pauseSlideshow = () => {
    isPaused = true
  }

  const playSlideshow = () => {
    isPaused = false
  }

  const handleMouseEnter = () => {
    hovered = true
    if (!autoplay || isRelated || isListing) return
    pauseSlideshow()
  }

  const handleMouseLeave = () => {
    hovered = false
    if (!autoplay || isRelated || isListing) return
    playSlideshow()
  }

  const previousSlide = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }

  const nextSlide = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }

  onMount(async () => {
    if (slides.length > 2) {
      if (autoplay && !isRelated) {
        let options: EmblaOptionsType = { ...SharedEmblaOptions }
        emblaApi = EmblaCarousel(slideShowEl, options, [
          Autoplay(EmblaAutoplayOptions),
        ])
      } else {
        let options: EmblaOptionsType = { ...SharedEmblaOptions }
        emblaApi = EmblaCarousel(slideShowEl, options)

        //     {#if !isListing && !isRelated}
        //   <div
        //     role="presentation"
        //     class="nav-container"
        //     on:mouseenter={handleMouseEnter}
        //     on:mouseleave={handleMouseLeave}
        //   >
        //     {#if loaded && !isListing && !isRelated}
        //       <NavShow {slides} navTarget={slideShowEl} />
        //     {/if}
        //   </div>
        // {/if}
      }
    }
  })
</script>

<!-- {#if slides.length > 2} -->
<!-- 
  container: 80vh => 
  slideshow: 100% => 
  embla: 100% 100% => 
  embla__container: 100% => 
  embla__slide slideshow__slide: 100%/auto
-->
<div
  role="presentation"
  class="container"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  {#if !loaded}
    <div class="loading">
      LOADING
      <Ellipse />
    </div>
  {/if}

  <!-- MAIN -->
  <div
    class="slideshow"
    class:slideshow--related={isRelated}
    class:slideshow--preview={isListing}
    class:loaded
  >
    <div class="embla" bind:this={slideShowEl}>
      <div class="embla__container">
        {#each slides as slide}
          <SlideshowSlide {slide} {isRelated} />
        {/each}
      </div>
    </div>
  </div>

  <!-- PREVIOUS SLIDE -->
  <button
    class="navigation previous"
    class:hovered
    aria-label="Previous"
    on:click={previousSlide}
  >
    <ArrowLeft />
  </button>

  <!-- NEXT SLIDE -->
  <button
    class="navigation next"
    class:hovered
    aria-label="Next"
    on:click={nextSlide}
  >
    <ArrowRight />
  </button>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .container {
    position: relative;
    margin-bottom: $large-vertical-margin;
    height: 80vh;
    overflow: hidden;

    @include screen-size("small") {
      height: 400px;
    }
  }

  .embla,
  .embla__container {
    height: 100%;
  }

  .nav-container {
    height: 140px;
    width: 100%;
    margin-top: $small-vertical-margin;
    margin-bottom: $large-vertical-margin;

    @include screen-size("small") {
      height: 120px;
    }
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 600px;
    text-align: center;
    line-height: 600px;
    font-size: $body;
    font-family: $sans-stack;
    display: block;
    background: rgba(0, 0, 0, 0.05);
    background: $grey;

    @include screen-size("small") {
      line-height: 400px;
      font-size: $mobile_body;
      height: 400px;
    }
  }

  .slideshow {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: grab;

    @include screen-size("small") {
      height: 400px;
    }

    &--related {
      max-height: unset;
    }

    &--preview {
      cursor: pointer;
    }

    &__slideshow {
      height: 100%;
    }

    &.first {
      max-height: unset;
    }

    &.loaded {
      opacity: 1;
    }
  }

  .hidden {
    opacity: 0;
  }

  .navigation {
    opacity: 0;
    position: absolute;
    top: 50%;
    height: 60px;
    margin-top: -50px;
    z-index: 99;
    cursor: pointer;
    transition:
      transform 0.3s $transition,
      opacity 0.5s $transition;
    background: transparent;
    border: none;
    outline: none;

    @include screen-size("small") {
      display: none;
    }

    &:hover {
      transform: scale(1.2);
    }

    &.hovered {
      opacity: 1;
    }
  }

  .previous {
    height: 100px;
    left: 10px;
  }

  .next {
    height: 100px;
    right: 10px;
  }

  .arrow {
    height: 100px;
  }

  // THUMBNAILS

  // .container {
  //   position: relative;
  //   height: 120px;

  //   @include screen-size("small") {
  //     height: 100px;
  //   }
  // }

  // .loading {
  //   text-align: center;
  //   line-height: 120px;
  //   font-size: $body;
  //   font-family: $sans-stack;
  //   display: block;
  //   background: $grey;

  //   @include screen-size("small") {
  //     line-height: 120px;
  //     font-size: $mobile_body;
  //     height: 100px;
  //   }
  // }

  // .loading {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 120px;
  //   text-align: center;
  //   line-height: 120px;
  //   font-size: $body;
  //   font-family: $sans-stack;
  //   display: block;
  //   background: $grey;

  //   @include screen-size("small") {
  //     line-height: 100px;
  //     font-size: $mobile_body;
  //     height: 100px;
  //   }
  // }

  // .slideshow {
  //   width: 100%;
  //   height: 100px;

  //   opacity: 0;

  //   @include screen-size("small") {
  //     height: 100px;
  //   }

  //   &__slideshow {
  //     height: 100%;
  //   }

  //   &__slide {
  //     height: auto;
  //     margin-left: $small-margin;
  //     margin-right: $small-margin;
  //     cursor: pointer !important;

  //     @include screen-size("small") {
  //       height: 100px;
  //     }
  //     &:hover {
  //       opacity: 0.8;
  //     }
  //   }

  //   &__slide-image {
  //     height: 100%;
  //   }

  //   &.loaded {
  //     opacity: 1;
  //   }
  // }
</style>
