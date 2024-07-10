<script lang="ts">
  import type { Article, Product, SatelliteSite } from "$lib/types/sanity.types"
  import { isArray, isEmpty, truncate } from "lodash-es"
  import { toPlainText, urlFor } from "$lib/modules/sanity"
  import { stripHtml } from "$lib/modules/utils"

  export let post: Article | Product | SatelliteSite | undefined = undefined

  const defaultDescription =
    "Novembre Global is a platform for expression, guiding individuals and professionals in search of inspiration, new styles and emergent cultural trends."

  const defaultImage = "https://novembre.global/images/logo.png"

  $: title =
    (post?.title ? stripHtml(post.title) + " / " : "") + "NOVEMBRE GLOBAL"

  $: description =
    post?.content && isArray(post.content) && !isEmpty(post.content)
      ? truncate(toPlainText(post.content), {
          length: 160,
          separator: /.? +/,
        })
      : defaultDescription

  $: image = post?.mainImage
    ? urlFor(post.mainImage).quality(80).height(1200).width(1200).url()
    : defaultImage
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
</svelte:head>
