<script lang="ts">
  import type { Article } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import ArticleComponent from "$lib/components/article/Article.svelte"
  import Footer from "$lib/components/footer/Footer.svelte"

  export let data: {
    post: Article
  }
  const { post } = data
</script>

<MetaData {post} />
<ArticleComponent {post} />
<Footer active />
