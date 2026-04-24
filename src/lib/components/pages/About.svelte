<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity"

  import Image from "$lib/components/modules/Image.svelte"
  import ImageGroup from "$lib/components/modules/ImageGroup.svelte"
  import VideoEmbed from "$lib/components/modules/VideoEmbed.svelte"
  import ArbitraryEmbed from "$lib/components/modules/ArbitraryEmbed.svelte"
  import Slideshow from "$lib/components/modules/Slideshow.svelte"

  export let globalConfig: Meta

  onMount(async () => {
    window.scrollTo(0, 0)
  })
</script>

<article class="about">
  <div class="about-text">
    {#each globalConfig.about?.content ?? [] as item}
      {@const c = item as any}
      {#if c._type == "block"}
        {@html renderBlockText(c)}
      {/if}
      {#if c._type == "singleImage"}
        <Image
          imageObject={c.image}
          inlineDisplay={true}
          maxHeight={c.maxHeight ?? false}
          backgroundColor={c.backgroundColor}
          caption={c.caption ?? ""}
          alignment={c.alignment ?? ""}
          fullwidth={c.fullwidth ?? false}
        />
      {/if}
      {#if c._type == "imageGroup"}
        <ImageGroup
          slides={c.images ?? []}
          inlineDisplay={true}
          maxHeight={c.maxHeight ?? false}
          backgroundColor={c.backgroundColor}
          alignment={c.alignment ?? ""}
          verticalAlignment={c.verticalAlignment ?? ""}
          fullwidth={c.fullwidth ?? false}
          caption={c.caption ?? ""}
        />
      {/if}
      {#if c._type == "video"}
        <VideoEmbed
          url={c.video}
          backgroundColor={c.backgroundColor}
          caption={c.caption ?? ""}
        />
      {/if}
      {#if c._type == "slideshow"}
        <Slideshow slides={c.images ?? []} />
      {/if}
      {#if c._type == "arbitraryEmbed"}
        <ArbitraryEmbed code={c.arbitraryEmbed ?? c.embedCode ?? ""} />
      {/if}
    {/each}
  </div>

  <div class="about-credits">
    <div class="about-credits-column">
      {@html renderBlockText(globalConfig.credits?.columnOne?.content)}
    </div>

    <div class="about-credits-column">
      {@html renderBlockText(globalConfig.credits?.columnTwo?.content)}
    </div>

    <div class="about-credits-column">
      {@html renderBlockText(globalConfig.credits?.columnThree?.content)}
    </div>
  </div>
</article>

<style lang="scss">
  @import "../../styles/variables.scss";

  .about {
    display: inline-block;
    background: $hotpink;
    width: 100vw;
    height: auto;
    line-height: 1em;
    padding-bottom: $large-vertical-margin;
  }

  .about-text {
    padding-top: 100px;
    height: auto;
    max-width: 95%;
    font-family: $sans-stack;
    line-height: 1em;
    font-size: $intro;
    text-transform: uppercase;

    @include screen-size("small") {
      font-size: $mobile_intro;
    }

    p {
      padding: $small-margin;
      margin-left: $small-margin;
    }
  }

  .about-credits {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: $small-vertical-margin;
    max-width: 95vw;
    padding-bottom: $large-vertical-margin;
    line-height: 1.2em;
    font-family: $sans-stack;

    .about-credits-column {
      width: 33.33%;
      float: left;

      @include screen-size("small") {
        width: 100%;
        float: unset;
      }
    }

    .about-credits-header {
      text-transform: uppercase;
    }

    .about-credits-item {
      margin-bottom: 2 * $small-vertical-margin;
      break-inside: avoid;
    }
  }
</style>
