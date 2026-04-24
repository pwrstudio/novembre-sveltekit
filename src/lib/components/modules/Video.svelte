<script lang="ts">
  import type { Color } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { urlFor } from "$lib/modules/sanity"

  export let url = ""
  export let posterImage: unknown = undefined
  export let caption: string | boolean = false
  export let backgroundColor: Color | undefined = undefined
  export let alignment = ""
  export let maxHeight = false
  export let autoplay = false
  export let fullwidth = false
  export let inlineDisplay = false
  export let isListing = false
  export let loop = true

  $: poster =
    posterImage && (posterImage as { asset?: unknown }).asset
      ? urlFor(posterImage).width(1200).auto("format").url()
      : undefined

  $: customStyles =
    (maxHeight ? "height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "")

  let videoEl: HTMLVideoElement

  const VIDEO_ROOT = "https://res.cloudinary.com/pwr/video/upload/"
  const REMOTE_FOLDER = "novembre"

  // *** VARIABLES
  let time = 0
  let duration = 0
  let paused = true
  let showControls = true
  let showControlsTimeout: number
  let controlsTimeoutDuration = 2500
  let post = {}
  let videoUrl = ""
  let videoSrc = ""

  // --- Video controls
  function handleMousemove(this: HTMLVideoElement, e: MouseEvent) {
    // Make the controls visible, but fade out after
    // 2.5 seconds of inactivity
    clearTimeout(showControlsTimeout)
    showControlsTimeout = setTimeout(
      () => (showControls = false),
      controlsTimeoutDuration,
    )
    showControls = true

    if (e.which !== 1) return // mouse not down
    if (!duration) return // video not loaded yet

    const { left, right } = this.getBoundingClientRect()
    time = (duration * (e.clientX - left)) / (right - left)
  }

  function handleMousedown(e: MouseEvent) {
    const target = e.target as HTMLVideoElement | null
    if (!target) return

    function handleMouseup() {
      if (paused) {
        target!.play()
      } else {
        target!.pause()
      }
      cancel()
    }

    function cancel() {
      target!.removeEventListener("mouseup", handleMouseup)
    }

    target.addEventListener("mouseup", handleMouseup)

    setTimeout(cancel, 200)
  }

  function format(seconds: number) {
    if (isNaN(seconds)) return "..."

    const minutes = Math.floor(seconds / 60)
    const wholeSeconds = Math.floor(seconds % 60)
    const pad = wholeSeconds < 10 ? "0" + wholeSeconds : String(wholeSeconds)

    return `${minutes}:${pad}`
  }

  // *** ON MOUNT
  onMount(async () => {
    if (autoplay || isListing) {
      let promise = videoEl.play()
      if (promise !== undefined) {
        promise.catch((err) => {
          console.log(err)
        })
      }
    }
  })
</script>

<div
  class="video {alignment}"
  class:listing={isListing}
  class:video--full={fullwidth || isListing}
  class:bottom-space={inlineDisplay}
  style={customStyles}
>
  <video
    class="video-player {alignment}"
    preload="metadata"
    playsinline
    {loop}
    {poster}
    muted={autoplay || isListing}
    src={url}
    on:mousemove={handleMousemove}
    on:mousedown={handleMousedown}
    bind:currentTime={time}
    bind:duration
    bind:paused
    bind:this={videoEl}
  ></video>
  {#if !autoplay && !isListing}
    <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
      <!-- <progress value={time / duration || 0} /> -->

      <div class="buttons">
        {#if paused}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="0.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-play play"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="0.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-pause pause"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        {/if}
      </div>
    </div>
  {/if}
</div>

{#if caption}
  <div class="caption {alignment}">{caption}</div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .video {
    width: 100%;
    height: auto;

    color: $white;

    font-family: $sans-stack;
    font-size: $small;

    position: relative;
    display: flex;
    justify-content: center;

    &.left {
      justify-content: flex-start;
    }

    &.right {
      justify-content: flex-end;
    }

    &.center {
      justify-content: center;
    }

    margin-bottom: $large-vertical-margin;

    &--full {
      height: $full-height;
      width: 100vw;
      pointer-events: none;
      margin-bottom: $large-vertical-margin;

      @include screen-size("small") {
        // height: 70vh;
      }

      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &--inline {
      height: auto;
      width: 100%;
      height: $full-height;
      display: flex;
      justify-content: center;
      align-items: center;

      .inner {
        width: 800px;
        margin-left: auto;
        margin-right: auto;
        max-width: 95vw;
      }

      video {
        width: 100%;
      }
    }

    cursor: pointer;

    &--playing {
      cursor: grab;
    }

    &.listing {
      margin-bottom: 0;
    }
  }

  .controls {
    transition: opacity 1s;
  }

  .buttons {
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;

    width: 100px;
    height: 100px;

    transform: translateX(-50%) translateY(-50%);
    pointer-events: none;

    svg {
      width: 100%;
    }
  }

  .play {
    position: relative;
    left: 4px;
  }

  .time {
    position: absolute;
    bottom: 10px;
    right: 10px;
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
    color: black;

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
</style>
