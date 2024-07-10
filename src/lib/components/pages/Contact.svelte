<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { navigationColor, scrollListActive } from "$lib/modules/stores"
  import { renderBlockText } from "$lib/modules/sanity"
  import { get, has } from "lodash-es"
  import { NavigationColor } from "$lib/enums"

  import Image from "$lib/components/modules/Image.svelte"
  import ImageGroup from "$lib/components/modules/ImageGroup.svelte"
  import VideoEmbed from "$lib/components/modules/VideoEmbed.svelte"
  import ArbitraryEmbed from "$lib/components/modules/ArbitraryEmbed.svelte"
  import Slideshow from "$lib/components/modules/Slideshow.svelte"

  export let globalConfig: Meta

  navigationColor.set(NavigationColor.Black)
  scrollListActive.set(false)

  onMount(async () => {
    window.scrollTo(0, 0)
  })
</script>

<article class="contact">
  <div class="contact-section">
    {#if has(globalConfig, "contact.content") && Array.isArray(globalConfig.contact.content)}
      {#each globalConfig.contact.content as c}
        {#if c._type == "block"}
          {@html renderBlockText(c)}
        {/if}
        {#if c._type == "singleImage"}
          <Image
            imageObject={c.image}
            caption={get(c, "caption", false)}
            alignment={get(c, "alignment", "")}
            fullwidth={get(c, "fullwidth", "")}
          />
        {/if}
        {#if c._type == "imageGroup"}
          <ImageGroup slides={c.images} caption={get(c, "caption", false)} />
        {/if}
        {#if c._type == "video"}
          <VideoEmbed url={c.video} caption={get(c, "caption", false)} />
        {/if}
        {#if c._type == "slideshow"}
          <Slideshow slides={c.images} />
        {/if}
        {#if c._type == "arbitraryEmbed"}
          <ArbitraryEmbed code={c.arbitraryEmbed} />
        {/if}
      {/each}
    {/if}
  </div>

  <div class="contact-section">
    {#if has(globalConfig, "socialMedia.content") && Array.isArray(globalConfig.socialMedia.content)}
      {#each globalConfig.socialMedia.content as c}
        {#if c._type == "block"}
          {@html renderBlockText(c)}
        {/if}
        {#if c._type == "singleImage"}
          <Image
            imageObject={c.image}
            caption={get(c, "caption", false)}
            alignment={get(c, "alignment", "")}
            fullwidth={get(c, "fullwidth", "")}
          />
        {/if}
        {#if c._type == "imageGroup"}
          <ImageGroup slides={c.images} caption={get(c, "caption", false)} />
        {/if}
        {#if c._type == "video"}
          <VideoEmbed url={c.video} caption={get(c, "caption", false)} />
        {/if}
        {#if c._type == "slideshow"}
          <Slideshow slides={c.images} />
        {/if}
      {/each}
    {/if}
  </div>
</article>

<style lang="scss">
  @import "../../styles/variables.scss";

  .contact {
    padding-top: 100px;
    margin-bottom: $large-vertical-margin;
    font-family: $sans-stack;
    font-size: $large;
    text-transform: uppercase;
    line-height: 1em;
    overflow: hidden;
    background: #f6f6f6;
    padding-left: 0;
    padding-right: 0;

    @include screen-size("small") {
      font-size: $mobile-body;
      margin-bottom: $small-vertical-margin;
    }

    .contact-section {
      margin-bottom: 1em;
      padding: $small-margin;

      &.mail {
        background: #d9f52c;
        padding-bottom: 40px;
        margin-bottom: 0;
      }

      a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 3px solid transparent;

        @include screen-size("small") {
          border-bottom: 2px solid transparent;
        }

        transition: border 0.3s $transition;

        &:hover {
          border-bottom: 3px solid $black;
          @include screen-size("small") {
            border-bottom: 2px solid black;
          }
        }
      }
    }
  }
</style>
