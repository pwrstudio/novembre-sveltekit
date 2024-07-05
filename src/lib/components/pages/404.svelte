<script lang="ts">
  import { onMount } from "svelte"
  import Footer from "$lib/components/footer/Footer.svelte"

  onMount(async () => {
    window.scrollTo(0, 0)
  })
</script>

<svelte:head>
  <title>404 / NOVEMBRE</title>
</svelte:head>

<div class="placeholder">
  404
  <br />
  Page not found
</div>

<Footer active />

<style lang="scss">
  @import "../../styles/variables.scss";

  .placeholder {
    margin-top: 160px;
    font-size: $xlarge;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 0.9em;
    font-family: $sans-stack;
    margin-left: $small-margin;
    min-height: 80vh;

    @include screen-size("small") {
      font-size: $mobile_xlarge;
    }
  }
</style>
