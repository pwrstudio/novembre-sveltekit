<script lang="ts">
  import { onMount } from "svelte"
  import type { Article, Meta, Banner } from "$lib/types/sanity.types"
  import { isArray, isEmpty } from "lodash-es"
  import { ListingType, NavigationColor } from "$lib/enums"
  import { urlFor } from "$lib/modules/sanity"

  import Preview from "$lib/components/preview/Preview.svelte"
  import SplashText from "$lib/components/splashText/SplashText.svelte"
  import Ellipse from "$lib/components/ellipse/Ellipse.svelte"

  import {
    navigationColor,
    activeQuery,
    activeCategory,
  } from "$lib/modules/stores"

  export let listingType: ListingType
  export let posts: Article[]
  export let globalConfig: Meta
  export let feedBanners: Banner[] | undefined = undefined

  export let title = ""
  export let query = ""

  let sentinel = {}
  let postsContainerEl: HTMLDivElement
  let loadingCompleted = false

  // Switch active category
  $: if (
    [ListingType.Bureau, ListingType.BureauCategory].includes(listingType)
  ) {
    activeCategory.set("bureau")
  } else {
    activeCategory.set("magazine")
  }

  $: activeQuery.set(query)

  navigationColor.set(NavigationColor.White)

  // const observer = new IntersectionObserver(
  //   entries => {
  //     entries.forEach(entry => {
  //       if (entry.intersectionRatio > 0) {
  //         console.log("SENTINEL HIT")
  //         index += 1
  //         doLoad()
  //       }
  //     })
  //   },
  //   { threshold: 0.5 },
  // )

  // const repositionSentinel = () => {
  //   if (postsContainerEl && sentinel) {
  //     let fourthElementFromEnd = postsContainerEl.querySelector(
  //       ".preview:nth-last-child(4)",
  //     )
  //     if (fourthElementFromEnd)
  //       postsContainerEl.insertBefore(sentinel, fourthElementFromEnd)
  //   }
  // }

  onMount(async () => {
    window.scrollTo(0, 0)
  })
</script>

{#if isArray(posts)}
  <div class="listing" class:landing={title === "Landing"}>
    <div class="listing__posts" bind:this={postsContainerEl}>
      {#if query && posts.length === 0}
        <div class="no-results">No results for “{query}”</div>
      {/if}

      {#each posts as post, i}
        {#if i === 0 && (listingType === ListingType.Magazine || listingType === ListingType.Bureau || listingType === ListingType.Landing)}
          <SplashText {listingType} {globalConfig} />
        {/if}

        <Preview {post} isFirst={i === 0} />

        {#if feedBanners && !isEmpty(feedBanners) && feedBanners.find(b => b.positionInFeed == i)}
          <a
            href={feedBanners.find(b => b.positionInFeed == i).link}
            target="_blank"
            rel="noreferrer"
            class="feed-banner"
          >
            {#if feedBanners.find(b => b.positionInFeed == i)[0] && feedBanners.find(b => b.positionInFeed == i)[0].video && feedBanners.find(b => b.positionInFeed == i)[0].video.asset && feedBanners.find(b => b.positionInFeed == i)[0].video.asset._ref}
              <video
                playsinline
                src={"https://cdn.sanity.io/files/gj963qwj/production/" +
                  feedBanners
                    .find(b => b.positionInFeed == i)
                    .video.asset._ref.replace("file-", "")
                    .replace("-mp4", ".mp4")}
                autoplay
                muted
                loop
              />
            {/if}

            {#if feedBanners.find(b => b.positionInFeed == i).image}
              <img
                alt="novembre.global"
                src={urlFor(feedBanners.find(b => b.positionInFeed == i).image)
                  .width(1400)
                  .quality(100)
                  .auto("format")
                  .url()}
              />
            {/if}
          </a>
        {/if}
      {/each}
    </div>

    {#if !loadingCompleted}
      <div class="sentinel" bind:this={sentinel}>
        LOADING
        <Ellipse />
      </div>
    {/if}
  </div>
{/if}

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

  .query-bar {
    padding-left: $small-margin;
    position: relative;
    top: 2px;
  }

  .no-results {
    padding-left: $small-margin;
    font-size: $large;
    font-family: $sans-stack;
    color: black;
    background: #f6f6f6;
    height: 100vh;
    width: 100vw;
    padding-top: 200px;
    text-transform: uppercase;

    @include screen-size("small") {
      padding-top: 160px;
      font-size: $mobile_large;
    }
  }

  .feed-banner {
    display: block;
    width: 100vw;
    margin: 0;
    line-height: 0;

    img,
    video {
      width: 100%;
      height: auto;
    }
  }
</style>
