<script lang="ts">
  export let code = ""
  export let isMap = false
</script>

<div class="embed" class:map={isMap}>
  <div class="inner">
    {@html code}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .embed {
    color: $white;
    margin-bottom: $large-vertical-margin;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: $small-vertical-margin;
    padding-top: $small-vertical-margin;

    width: 100vw;

    &.fullscreen {
      height: 100vh;
    }

    .inner {
      width: 720px;

      @include screen-size("small") {
        width: 480px;
      }

      iframe {
        width: 100%;
      }
    }

    &.map {
      pointer-events: none;
      cursor: default;

      .inner {
        width: unset;
        display: inline-block;
      }
    }
  }
</style>
