<script lang="ts">
  import { onMount } from "svelte"
  import { urlFor } from "$lib/modules/sanity"
  import EmblaCarousel from "embla-carousel"
  import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
  import ArrowRight from "$lib/components/graphics/ArrowRight.svelte"
  import ArrowLeft from "$lib/components/graphics/ArrowLeft.svelte"
  import type { ShopSlide } from "$lib/types/sanity.types"

  export let slides: ShopSlide[] = []

  let slideShowEl: HTMLDivElement

  let emblaApi: EmblaCarouselType | undefined = undefined

  const isMultiSlide = slides.length > 1

  const SharedEmblaOptions: EmblaOptionsType = {
    loop: true,
    watchDrag: isMultiSlide,
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
    let options: EmblaOptionsType = { ...SharedEmblaOptions }
    emblaApi = EmblaCarousel(slideShowEl, options)
  })
</script>

<div class="slideshow">
  <div class="embla" bind:this={slideShowEl}>
    <div class="embla__container">
      {#each slides as slide}
        <div class="embla__slide">
          <img src={urlFor(slide).url()} alt="slide" />
        </div>
      {/each}
    </div>
  </div>
</div>

{#if isMultiSlide}
  <!-- PREVIOUS SLIDE -->
  <button
    class="navigation previous"
    aria-label="Previous"
    on:click={previousSlide}
  >
    <ArrowLeft />
  </button>

  <!-- NEXT SLIDE -->
  <button class="navigation next" aria-label="Next" on:click={nextSlide}>
    <ArrowRight />
  </button>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .slideshow {
    height: 100%;
    width: 100%;
    cursor: grab;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .embla {
    width: 70%;
    height: 75%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    @include screen-size("small") {
      padding-top: 40px;
      width: 95%;
      height: 100%;
    }
  }

  .embla__container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .embla__slide {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .navigation {
    opacity: 1;
    position: absolute;
    top: 50%;
    height: 60px;
    margin-top: -30px;
    z-index: 99;
    cursor: pointer;
    transition: opacity 0.5s $transition;
    background: transparent;
    border: none;
    outline: none;
    color: black;
  }

  .previous {
    left: -10px;
    @include screen-size("small") {
      left: -20px;
    }
  }

  .next {
    right: -10px;
    @include screen-size("small") {
      right: -20px;
    }
  }
</style>
