<script lang="ts">
  import type { Taxonomy } from "$lib/types/sanity.types"
  import { sortBy } from "lodash-es"
  import { formatDate } from "$lib/modules/utils"

  export let taxonomy: Taxonomy | undefined
  export let isArticle = false
  export let white = false
  export let date: string | undefined
</script>

{#if taxonomy}
  <div class="taxonomy" class:white>
    {#if date}
      <span class="taxonomy__item date">
        {formatDate(date)}
      </span>
    {/if}

    {#if taxonomy.subCategory}
      <span class="taxonomy__item">
        <a href="/{taxonomy.category}/category/{taxonomy.subCategory}">
          {taxonomy.subCategory.replace("-", " ")}
        </a>
      </span>
    {/if}

    {#if isArticle}
      {#each sortBy(taxonomy.tags) as t}
        <span class="taxonomy__item">
          <a href="/taxonomy/{t}">{t}</a>
        </span>
      {/each}
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .taxonomy {
    font-family: $sans-stack;
    font-size: $small;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 1px;

    @include screen-size("small") {
      font-size: $mobile_small;
    }

    &__item {
      display: inline-block;
      text-decoration: none;
      margin-right: 10px;
      color: black;
      transition: border 0.3s $transition;
      border-bottom: 1px solid transparent;

      &:hover {
        border-bottom: 1px solid black;
      }

      &.date {
        font-style: normal;

        &:hover {
          cursor: auto;
          border-bottom: 1px solid transparent !important;
        }
      }

      @include screen-size("small") {
        margin-bottom: $small-margin;
        margin-right: 10px;
      }
    }

    &.white {
      .taxonomy__item {
        color: $white;

        &:hover {
          border-bottom: 1px solid $white;
        }
      }
    }
  }
</style>
