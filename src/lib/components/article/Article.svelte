<script lang="ts">
  import type { Article } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { get, isEmpty } from "lodash-es"
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

{#if post?.banner && bannerActive}
  <a
    href={post.banner.link}
    in:fade
    target="_blank"
    rel="noreferrer"
    class="sidebar-banner"
  >
    <img
      alt="novembre.global"
      src={urlFor(post.banner.image)
        .width(500)
        .quality(100)
        .auto("format")
        .url()}
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
    {#each post.content ?? [] as c}
      {#if c._type == "block"}
        {@html renderBlockText(c)}
      {/if}
      {#if c._type == "singleImage"}
        <Image
          imageObject={c.image}
          linkUrl={c.linkUrl}
          inlineDisplay={c.noBottomMargin ? false : true}
          maxHeight={get(c, "maxHeight", false)}
          backgroundColor={get(c, "backgroundColor", false)}
          caption={get(c, "caption", false)}
          alignment={get(c, "alignment", "")}
          fullwidth={get(c, "fullwidth", "")}
        />
      {/if}
      {#if c._type == "imageGroup"}
        <ImageGroup
          slides={c.images}
          linkUrl={c.linkUrl}
          inlineDisplay={c.noBottomMargin ? false : true}
          maxHeight={get(c, "maxHeight", false)}
          backgroundColor={get(c, "backgroundColor", false)}
          alignment={get(c, "alignment", "")}
          verticalAlignment={get(c, "verticalAlignment", "")}
          fullwidth={get(c, "fullwidth", "")}
          caption={get(c, "caption", false)}
        />
      {/if}
      {#if c._type == "videoLoop"}
        <VideoLoop
          url={"https://cdn.sanity.io/files/gj963qwj/production/" +
            get(c, "video.asset._ref", "")
              .replace("file-", "")
              .replace("-mp4", ".mp4")}
          inlineDisplay={c.noBottomMargin ? false : true}
          posterImage={get(c, "preview.posterImage", "")}
          autoplay={get(c, "autoplay", false)}
          maxHeight={get(c, "maxHeight", false)}
          backgroundColor={get(c, "backgroundColor", false)}
          caption={get(c, "caption", false)}
          alignment={get(c, "alignment", "")}
          fullwidth={get(c, "fullwidth", "")}
        />
      {/if}
      {#if c._type == "video"}
        <VideoEmbed
          url={c.video}
          size={get(c, "size", false)}
          backgroundColor={get(c, "backgroundColor", false)}
          caption={get(c, "caption", false)}
        />
      {/if}
      {#if c._type == "slideshow"}
        <Slideshow autoplay={c.autoplay} slides={c.images} />
      {/if}
      {#if c._type == "audio"}
        <Audio
          url={"https://cdn.sanity.io/files/gj963qwj/production/" +
            get(c, "audio.asset._ref", "")
              .replace("file-", "")
              .replace("-mp3", ".mp3")
              .replace("-wav", ".wav")
              .replace("-ogg", ".ogg")
              .replace("-m4a", ".m4a")}
          title={get(c, "title", "")}
          link={get(c, "link", false)}
          posterImage={get(c, "image", false)}
          backgroundColor={get(c, "backgroundColor.hex", false)}
          autoplay={get(c, "autoplay", false)}
        />
      {/if}
      {#if c._type == "arbitraryEmbed"}
        <ArbitraryEmbed code={c.embedCode} />
      {/if}
    {/each}
  </div>

  <!-- RELATED -->
  {#if post.related && !isEmpty(post.related)}
    <div class="related-header">RELATED ARTICLES</div>
    <Slideshow slides={post.related} isRelated={true} />
  {:else}
    <div class="bottom-space" />
  {/if}
</article>

<style lang="scss">
  @import "../../styles/variables.scss";

  .article {
    background: $white;
    width: 100%;
    overflow: hidden;

    &.top-padded {
      padding-top: 100px;
    }

    &.bureau {
      background: $grey;
    }

    &__header {
      img,
      video {
        height: $full-height;
        width: 100%;
        object-fit: cover;
      }

      @include screen-size("small") {
        // height: 70vh;
      }
    }

    em {
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

  .bureau {
    font-family: $sans-stack;
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
