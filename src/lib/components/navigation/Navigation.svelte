<script lang="ts">
  import type { Banner } from "$lib/types/sanity.types"
  import { page } from "$app/stores"
  import { isEmpty } from "lodash-es"
  import { urlFor } from "$lib/modules/sanity"
  import { menuItems } from "$lib/constants"
  import { cartCount } from "$lib/modules/cart"
  import Logo from "$lib/components/graphics/Logo.svelte"
  import SearchBox from "$lib/components/navigation/SearchBox.svelte"

  import { menuActive, searchActive } from "$lib/modules/stores"

  export let menuBanners: Banner[]

  // Show cart when in shop
  // or when cart is not empty and we are not on cart page
  const shopRoutes = ["/shop", "/shop/[slug]"]
  $: showCart =
    shopRoutes.includes($page.route?.id ?? "") ||
    ($cartCount > 0 && $page.route?.id !== "/cart")

  const toggleMenu = () => {
    menuActive.set(!$menuActive)
  }
</script>

<nav
  class="navigation"
  class:navigation--black={$menuActive}
  class:navigation--expanded={$menuActive}
>
  <div class="navigation__bar">
    <!-- LOGO -->
    <button class="navigation__logo" on:click={toggleMenu}>
      <Logo black={$menuActive} />
    </button>
    <!-- CART -->
    {#if showCart}
      <a href="/cart" class="navigation__cart">
        CART ({$cartCount})
      </a>
    {/if}
    <!-- TOGGLE -->
    <button class="navigation__toggle" on:click={toggleMenu}>
      {$menuActive ? "CLOSE" : "MENU"}
    </button>
  </div>

  <menu class="navigation__menu" role="presentation" on:click={toggleMenu}>
    {#if $menuActive}
      {#each menuItems as item}
        <menuitem class="navigation__menu-item">
          <a href={item.target} class="navigation__link">
            <div class="navigation__link--normal">
              {@html item.title}
            </div>
            <div class="navigation__link--hover">
              {@html item.title}
            </div>
          </a>
        </menuitem>
      {/each}

      <menuitem class="navigation__menu-item">
        <SearchBox />
      </menuitem>
    {/if}

    {#if !isEmpty(menuBanners)}
      <a
        href={menuBanners[0].link}
        target="_blank"
        class:hidden={searchActive}
        rel="noreferrer"
        class="banner"
      >
        {#if menuBanners[0].video && menuBanners[0].video.asset && menuBanners[0].video.asset._ref}
          <video
            playsinline
            src={"https://cdn.sanity.io/files/gj963qwj/production/" +
              menuBanners[0].video.asset._ref
                .replace("file-", "")
                .replace("-mp4", ".mp4")}
            autoplay
            muted
            loop
          />
        {/if}
        {#if menuBanners[0].image}
          <img
            alt="novembre.global"
            src={urlFor(menuBanners[0].image)
              .width(700)
              .quality(100)
              .auto("format")
              .url()}
          />
        {/if}
      </a>
    {/if}
  </menu>
</nav>

<style lang="scss">
  @import "../../styles/variables.scss";

  .navigation {
    $block: &;
    $height: 80px;

    position: fixed;
    top: 0;
    left: 0;
    user-select: none;

    font-family: $sans-stack;
    font-weight: 300;
    font-size: $large;

    mix-blend-mode: difference;

    width: 100vw;
    z-index: 1000;

    color: $white;

    &--black {
      color: $black;
    }

    button {
      background: transparent;
      border: 0;
      outline: 0;
      font-weight: normal !important;
    }

    &__bar {
      width: 100vw;
      height: $height;
      z-index: 100;
      opacity: 1;
      background: transparent;
      transition: background 0.4s $transition;
    }

    &__logo {
      position: absolute;
      top: 0;
      left: 0;
      height: 100px;
      margin-top: -2px;
      z-index: 10001;
      cursor: pointer;

      svg {
        height: 100px;

        @include screen-size("small") {
          height: unset;
        }
      }

      @include screen-size("small") {
        width: 100%;
      }
    }

    &__cart {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100px;
      margin-top: 4px;
      z-index: 10001;
      cursor: pointer;
      color: $white;
      font-family: $sans-stack;
      font-size: $large;
      font-weight: 300;

      svg {
        height: 100px;

        @include screen-size("small") {
          height: unset;
        }
      }

      @include screen-size("small") {
        width: 100%;
      }
    }

    &__toggle {
      float: right;
      font-size: $large;
      font-weight: 300;
      line-height: 80px;
      padding-right: $small-margin;
      cursor: pointer;
      position: relative;
      z-index: 10001;
      color: $white;
      font-family: $sans-stack;

      @include screen-size("small") {
        display: none;
      }
    }

    &__menu {
      position: fixed;
      display: block;
      margin: 0;
      opacity: 0;
      width: 100vw;
      height: auto;
      pointer-events: none;
      padding: 10px;
      padding-bottom: 20px;
      background: $white;
      top: 0;
      padding-top: $height;

      span {
        display: inline;
        position: relative;
        line-height: 1em;
        cursor: pointer;

        @include screen-size("small") {
          font-size: $mobile_large;
        }
      }
    }

    &__menu-item {
      display: block;
      height: 63px;

      @include screen-size("small") {
        height: 55px;
      }
    }

    &__link {
      position: relative;
      width: auto;
      line-height: 1em;
      height: 100%;
      display: inline-block;

      &--normal {
        font-size: $large;
        opacity: 1;
        font-weight: 300;

        @include screen-size("small") {
          font-size: 45px;
        }
      }

      &--hover {
        position: absolute;
        top: 6px;
        left: -2px;
        font-family: $serif-stack;
        font-size: $large + 10px;
        font-weight: 500;
        font-style: italic;
        opacity: 0;
        z-index: 1000;
        hyphens: none;

        @include screen-size("small") {
          font-size: 45px;
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
        .navigation__link--hover {
          opacity: 1;
        }

        .navigation__link--normal {
          opacity: 0;
        }
      }
    }

    &--expanded {
      mix-blend-mode: normal;

      #{$block}__logo {
        svg {
          fill: $white;
        }
      }

      #{$block}__menu {
        pointer-events: all;
        transition: opacity 0.3s $transition;
        opacity: 1;

        @include screen-size("small") {
          height: $full-height;
        }
      }

      #{$block}__toggle {
        color: $black;
      }
    }

    .bg-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: $height;
      background: $white;
      transition: opacity 0.3s $transition;
      display: none;
    }
  }

  .banner {
    position: absolute;
    right: 10px;
    top: $height;
    height: 300px;
    max-height: 90%;
    max-width: 50vw;
    opacity: 1;
    transition: opacity 0.25 ease-out;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }

    img {
      height: 100%;
      max-width: 100%;
    }

    @include screen-size("small") {
      display: none;
    }
  }
</style>
