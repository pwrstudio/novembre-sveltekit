<script lang="ts">
  import type { Article } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { isEmpty } from "$lib/modules/utils"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"

  import TaxList from "$lib/components/taxList/TaxList.svelte"
  import Preview from "$lib/components/preview/Preview.svelte"

  import Image from "$lib/components/modules/Image.svelte"
  import ImageGroup from "$lib/components/modules/ImageGroup.svelte"
  import VideoEmbed from "$lib/components/modules/VideoEmbed.svelte"
  import Audio from "$lib/components/modules/Audio.svelte"
  import ArbitraryEmbed from "$lib/components/modules/ArbitraryEmbed.svelte"
  import Slideshow from "$lib/components/modules/Slideshow.svelte"
  import VideoLoop from "$lib/components/modules/Video.svelte"

  export let post: Article

  let bannerActive = false

  onMount(async () => {
    window.scrollTo(0, 0)
    setTimeout(() => {
      bannerActive = true
    }, 3000)
  })
</script>

{#if (post as any)?.banner && bannerActive}
  {@const banner = (post as any).banner}
  <a
    href={banner.link}
    in:fade
    target="_blank"
    rel="noreferrer"
    class="sidebar-banner"
  >
    <img
      alt="novembre.global"
      src={urlFor(banner.image).width(500).quality(100).auto("format").url()}
    />
  </a>
{/if}

<article class="article">
  <!-- HEADER MEDIA -->
  <div class="article__header">
    <Preview {post} isHeader={true} />
  </div>

  <!-- DATE & TAGS -->
  <div class="article__tags">
    <TaxList
      taxonomy={post.taxonomy}
      white={false}
      isArticle={true}
      date={post.publicationDate}
    />
  </div>

  <!-- TITLE -->
  <h1 class="article__title">
    {@html post.title}
  </h1>

  <!-- AD TAG -->
  {#if post.adTag}
    {@html post.adTag}
  {/if}

  <!-- MAIN CONTENT -->
  <div class="content">
    {#each post.content ?? [] as item}
      {@const c = item as any}
      {#if c._type == "block"}
        {@html renderBlockText(c)}
      {/if}
      {#if c._type == "singleImage"}
        <Image
          imageObject={c.image}
          linkUrl={c.linkUrl ?? ""}
          inlineDisplay={c.noBottomMargin ? false : true}
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
          linkUrl={c.linkUrl ?? ""}
          inlineDisplay={c.noBottomMargin ? false : true}
          maxHeight={c.maxHeight ?? false}
          backgroundColor={c.backgroundColor}
          alignment={c.alignment ?? ""}
          verticalAlignment={c.verticalAlignment ?? ""}
          fullwidth={c.fullwidth ?? false}
          caption={c.caption ?? ""}
        />
      {/if}
      {#if c._type == "videoLoop"}
        <VideoLoop
          url={"https://cdn.sanity.io/files/gj963qwj/production/" +
            (c.video?.asset?._ref ?? "")
              .replace("file-", "")
              .replace("-mp4", ".mp4")}
          inlineDisplay={c.noBottomMargin ? false : true}
          posterImage={c.preview?.posterImage ?? {}}
          autoplay={c.autoplay ?? false}
          maxHeight={c.maxHeight ?? false}
          backgroundColor={c.backgroundColor}
          caption={c.caption ?? ""}
          alignment={c.alignment ?? ""}
          fullwidth={c.fullwidth ?? false}
        />
      {/if}
      {#if c._type == "video"}
        <VideoEmbed
          url={c.video}
          size={c.size ?? "medium"}
          backgroundColor={c.backgroundColor}
          caption={c.caption ?? ""}
        />
      {/if}
      {#if c._type == "slideshow"}
        <Slideshow autoplay={c.autoplay ?? false} slides={c.images ?? []} />
      {/if}
      {#if c._type == "audio"}
        <Audio
          url={"https://cdn.sanity.io/files/gj963qwj/production/" +
            (c.audio?.asset?._ref ?? "")
              .replace("file-", "")
              .replace("-mp3", ".mp3")
              .replace("-wav", ".wav")
              .replace("-ogg", ".ogg")
              .replace("-m4a", ".m4a")}
          title={c.title ?? ""}
          link={c.link ?? ""}
          posterImage={c.image ?? false}
          backgroundColor={c.backgroundColor}
          autoplay={c.autoplay ?? false}
        />
      {/if}
      {#if c._type == "arbitraryEmbed"}
        <ArbitraryEmbed code={c.embedCode ?? ""} />
      {/if}
    {/each}
  </div>

  <!-- RELATED -->
  {#if post.related && !isEmpty(post.related)}
    <div class="related-header">RELATED ARTICLES</div>
    <Slideshow slides={post.related} isRelated={true} />
  {:else}
    <div class="bottom-space"></div>
  {/if}
</article>

<style lang="scss">
  @import "../../styles/variables.scss";

  .article {
    background: $white;
    width: 100%;
    overflow: hidden;

    &__header {
      :global(img),
      :global(video) {
        height: $full-height;
        width: 100%;
        object-fit: cover;
      }
    }

    :global(em) {
      font-family: inherit;
      font-style: italic;
    }

    &__title {
      font-size: $xlarge;
      font-weight: 300;
      line-height: 1em;
      text-transform: uppercase;
      margin-bottom: $large-vertical-margin;
      margin-top: $small-vertical-margin;
      line-height: 0.9em;
      max-width: 90%;
      font-family: $sans-stack;
      margin-left: $small-margin;
      opacity: 1;

      @include screen-size("small") {
        font-size: $mobile_large;
        margin-bottom: $large-vertical-margin;
        max-width: 95%;
        hyphens: auto;
        -webkit-hyphens: auto;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      transition: opacity $transition;
    }

    &__tags {
      margin-left: $small-margin;
      margin-top: $small-margin;

      transition: opacity $transition;
    }
  }

  .related-header {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
    line-height: 0.9em;
    margin-bottom: $small-margin;
    margin-top: $small-vertical-margin;
    margin-left: $small-margin;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 1px solid $black;
    transition: border 0.3s $transition;

    &:hover {
      border-bottom: 1px solid transparent;
    }
  }

  .sidebar-banner {
    position: fixed;
    top: 20vh;
    right: 2 * $small-margin;
    width: 200px;
    z-index: 100;
    border-bottom: 0;

    img {
      width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }

    @include screen-size("small") {
      display: none;
    }
  }

  .bottom-space {
    height: $large-vertical-margin;
    width: 100%;
  }
</style>
