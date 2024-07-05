<script lang="ts">
  import { onMount, onDestroy } from "svelte"

  let text = ""
  let timer: number

  const NUMBER_OF_PERIODS = 5

  // *** ON MOUNT
  onMount(async () => {
    timer = setInterval(() => {
      text = text.length < NUMBER_OF_PERIODS ? text + "." : ""
    }, 500)
  })

  // *** ON DESTROY
  onDestroy(() => {
    clearInterval(timer)
  })
</script>

<span>{text}</span>
