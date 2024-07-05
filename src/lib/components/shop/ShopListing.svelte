<script lang="ts">
  import type { Product } from "$lib/types/sanity.types"

  export let posts: Product[]
</script>

SHOP LISTING

{#each posts as post}
  {post.title}
{/each}
