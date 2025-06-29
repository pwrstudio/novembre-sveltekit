<script lang="ts">
  import type { Color } from "$lib/types/sanity.types"
  import { onMount } from "svelte"

  export let url = ""
  export let posterImage = {}
  export let caption: string | boolean = false
  export let backgroundColor: Color | undefined = undefined
  export let alignment = ""
  export let maxHeight = false
  export let autoplay = false
  export let fullwidth = false
  export let inlineDisplay = false
  export let isListing = false
  export let loop = true
  export let muted = true
  export let controls = false

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
  function handleMousemove(e: MouseEvent) {
    // Make the controls visible, but fade out after
    // 2.5 seconds of inactivity
    clearTimeout(showControlsTimeout)
    showControlsTimeout = setTimeout(
      () => (showControls = false),
      controlsTimeoutDuration
    )
    showControls = true

    if (e.which !== 1) return // mouse not down
    if (!duration) return // video not loaded yet

    const { left, right } = this.getBoundingClientRect()
    time = (duration * (e.clientX - left)) / (right - left)
  }

  function handleMousedown(e: MouseEvent) {
    function handleMouseup() {
      if (paused) {
        e.target.play()
      } else {
        e.target.pause()
      }
      cancel()
    }

    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup)
    }

    e.target.addEventListener("mouseup", handleMouseup)

    setTimeout(cancel, 200)
  }

  function format(seconds: number) {
    if (isNaN(seconds)) return "..."

    const minutes = Math.floor(seconds / 60)
    seconds = Math.floor(seconds % 60)
    if (seconds < 10) seconds = "0" + seconds

    return `${minutes}:${seconds}`
  }

  // *** ON MOUNT
  onMount(async () => {
    if (autoplay || isListing) {
      let promise = videoEl.play()
      if (promise !== undefined) {
        promise.catch(err => {
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
  style={customStyles}
>
  <video
    class="video-player {alignment}"
    preload="metadata"
    playsinline
    {loop}
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

  progress {
    position: absolute;
    bottom: 0px;
    left: -2px;
    display: block;
    width: 100%;
    height: 7px;
    -webkit-appearance: none;
    appearance: none;

    pointer-events: none;

    &::-webkit-progress-value {
      background-color: rgba(255, 255, 255, 1);
    }

    &::-webkit-progress-bar {
      background-color: rgba(0, 0, 0, 1);
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
