<script lang="ts">
  import type { Article, Meta, Banner } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { isEmpty } from "lodash-es"
  import { ListingType } from "$lib/enums"
  import { BATCH_SIZE } from "$lib/constants"

  import Preview from "$lib/components/preview/Preview.svelte"
  import SplashText from "$lib/components/splashText/SplashText.svelte"
  import FeedBanner from "$lib/components/listing/FeedBanner.svelte"

  export let listingType: ListingType
  export let posts: Article[] = []
  export let text: string = ""
  export let globalConfig: Meta
  export let feedBanners: Banner[] | undefined = undefined

  let lazyPosts: Article[] = []
  let sentinel: HTMLDivElement
  let observer: IntersectionObserver
  let lazyLoadIndex = 1

  $: lazyPosts = posts.slice(0, lazyLoadIndex * BATCH_SIZE)
  $: allPostsLoaded = lazyPosts.length === posts.length

  onMount(() => {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            lazyLoadIndex++
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    )

    if (sentinel) {
      observer.observe(sentinel)
    }
  })
</script>

<div class="listing" class:landing={listingType === ListingType.Landing}>
  <div class="listing__posts">
    {#if text && posts.length === 0}
      <div class="no-results">No results for “{text}”</div>
    {/if}

    {#each lazyPosts as post, i (post._id)}
      {#if i === 0 && (listingType === ListingType.Magazine || listingType === ListingType.Bureau || listingType === ListingType.Landing)}
        <SplashText {listingType} {globalConfig} />
      {/if}

      <Preview {post} isFirst={i === 0} />

      {#if feedBanners && !isEmpty(feedBanners) && feedBanners.find(b => b.positionInFeed == i)}
        <FeedBanner banner={feedBanners.find(b => b.positionInFeed == i)} />
      {/if}
    {/each}
  </div>

  {#if !allPostsLoaded}
    <div class="sentinel" bind:this={sentinel} />
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .sentinel {
    width: 100%;
    height: 300px;
    text-align: center;
    line-height: 300px;
    font-size: $large;
    font-family: $sans-stack;
    display: block;
    background: $grey;
    color: $darkgrey;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  .listing {
    width: 100%;
    min-height: 80vh;
    overflow: hidden;
  }

  .landing {
    padding-top: 0;
  }

  .no-results {
    padding-left: $small-margin;
    font-size: $large;
    font-family: $sans-stack;
    color: $black;
    background: $grey;
    height: 100vh;
    width: 100vw;
    padding-top: 200px;
    text-transform: uppercase;

    @include screen-size("small") {
      padding-top: 160px;
      font-size: $mobile_large;
    }
  }
</style>
