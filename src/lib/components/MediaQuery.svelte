<script lang="ts">
  import { onMount } from "svelte"

  export let query: string

  let matches = false
  let mql: MediaQueryList | null = null

  const update = (e: MediaQueryList | MediaQueryListEvent) => {
    matches = e.matches
  }

  onMount(() => {
    mql = window.matchMedia(query)
    matches = mql.matches
    mql.addEventListener("change", update)
    return () => mql?.removeEventListener("change", update)
  })
</script>

<slot {matches} />
