<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  export let banner
</script>

<a href={banner.link} target="_blank" rel="noreferrer" class="feed-banner">
  {#if banner[0] && banner[0].video && banner[0].video.asset && banner[0].video.asset._ref}
    <video
      playsinline
      src={"https://cdn.sanity.io/files/gj963qwj/production/" +
        banner.video.asset._ref.replace("file-", "").replace("-mp4", ".mp4")}
      autoplay
      muted
      loop
    />
  {/if}

  {#if banner?.image}
    <img
      alt="novembre.global"
      src={urlFor(banner?.image).width(1400).quality(100).auto("format").url()}
    />
  {/if}
</a>

<style lang="scss">
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
