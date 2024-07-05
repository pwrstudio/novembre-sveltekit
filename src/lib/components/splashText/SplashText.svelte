<script lang="ts">
  import type { Meta } from "$lib/types/sanity.types"
  import { ListingType } from "$lib/enums"
  import { renderBlockText } from "$lib/modules/sanity"

  export let section = "landing"
  export let listingType: ListingType
  export let globalConfig: Meta

  let backgroundColor = ""
  let content = []

  switch (listingType) {
    case ListingType.Landing:
      backgroundColor = globalConfig?.feedColor?.hex ?? ""
      content = globalConfig?.feed?.content ?? []
      break
    case ListingType.Magazine:
      backgroundColor = globalConfig?.magazineColor?.hex ?? ""
      content = globalConfig?.magazine?.content ?? []
      break
    case ListingType.Bureau:
      backgroundColor = globalConfig?.bureauColor?.hex ?? ""
      content = globalConfig?.bureau?.content ?? []
      break
  }
</script>

<div class="splash-text {section}" style="background: {backgroundColor};">
  <div>
    {@html renderBlockText(content)}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .splash-text {
    opacity: 1;
    overflow: hidden;
    height: auto;
    width: 100vw;
    padding: $small-margin;
    padding-top: 180px;
    display: flex;
    align-items: flex-end;

    @include screen-size("small") {
      padding-top: 150px;
    }

    div {
      user-select: none;
      color: black;
      font-size: $intro;
      font-weight: 300;
      line-height: 1em;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      text-transform: uppercase;

      @include screen-size("small") {
        font-size: $mobile-intro;
      }
    }
  }

  .landing {
    padding-top: 100px;
  }
</style>
