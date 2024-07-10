<script lang="ts">
  import Logo from "$lib/components/graphics/Logo.svelte"
  import MediaQuery from "svelte-media-query"

  export let active = false

  const scrollToTop = () => {
    if (document.body.clientHeight > 6000) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }
</script>

<footer class="footer" class:active>
  <MediaQuery query="(min-width: 800px)" let:matches>
    {#if matches}
      <a
        href="https://www.instagram.com/novembremagazine/"
        rel="noreferrer"
        class="footer__link footer__link--left"
        target="_blank"
      >
        <div class="footer__link--normal">INSTAGRAM</div>
        <div class="footer__link--hover left">INSTAGRAM</div>
      </a>

      <button on:click={scrollToTop} class="footer__link footer__link--right">
        <div class="footer__link--normal">BACK TO TOP</div>
        <div class="footer__link--hover right">BACK TO TOP</div>
      </button>
      <a class="footer__logo" href="/">
        <Logo black={true} />
      </a>
    {:else}
      <a class="footer__logo" href="/">
        <Logo black={true} />
      </a>
    {/if}
  </MediaQuery>
</footer>

<style lang="scss">
  @import "../../styles/variables.scss";

  .footer {
    user-select: none;
    width: 100vw;
    z-index: 10;
    background: transparent;
    font-family: $sans-stack;
    padding-top: $small-margin;
    margin-bottom: -$small-margin;
    overflow: hidden;

    opacity: 0;
    transition: none;

    @include screen-size("small") {
      padding-bottom: $small-margin;
    }

    &.active {
      opacity: 1;
    }

    &__logo {
      display: block;
      cursor: pointer;
      @include screen-size("small") {
        position: relative;
        left: -1%;
      }
    }

    &__link {
      position: relative;
      width: auto;
      color: $black;
      line-height: 1em;
      height: 100%;
      display: inline-block;
      font-size: $large;
      cursor: pointer;

      &--left {
        float: left;
        margin-left: $small-margin;
      }

      &--right {
        float: right;
        margin-right: $small-margin;
        background: transparent;
        border: 0;
        font-weight: 300;
        font-family: $sans-stack;
      }

      &--normal {
        opacity: 1;
        font-weight: 300;

        @include screen-size("small") {
          font-size: 45px;
        }
      }

      &--hover {
        position: absolute;
        top: 6px;
        font-family: $serif-stack;
        font-size: $large + 10px;
        font-weight: 500;
        font-style: italic;
        opacity: 0;
        z-index: 11;
        hyphens: none;
        white-space: nowrap;

        &.left {
          left: -2px;
        }

        &.right {
          left: -25px;
        }

        @include screen-size("small") {
          font-size: 45px;
          font-size: $mobile_large;
          font-family: $sans-stack;
          font-style: normal;
          font-weight: 300;
          position: absolute;
          top: 0px;
          left: 0px;
        }
      }

      &:hover,
      &:active {
        .footer__link--hover {
          opacity: 1;
        }

        .footer__link--normal {
          opacity: 0;
        }
      }
    }
  }
</style>
