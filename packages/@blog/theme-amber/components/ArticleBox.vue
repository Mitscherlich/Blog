<template lang="pug">
  .card.mb-4
    //- FIXME: resolve compute property not emit update issue
    ArticleMeta.card-header(
      :date="post.frontmatter.date",
      :author="post.frontmatter.author",
      :category="post.frontmatter.category",
      :tags="post.frontmatter.tags"
    ): template(v-slot:title): b-link.text-dark.h4(:to="post.path", v-html="post.title")
    article.card-body.markdown-body(v-html="post.excerpt")
    footer.card-footer: b-link.text-muted(:to="post.path") Read More
</template>

<script>
import { renderMathInElement } from '@theme/util'
import ArticleMeta from './ArticleMeta.vue'

export default {
  props: ['post'],
  components: { ArticleMeta },
  mounted() {
    renderMathInElement(this.$el)
  },
  updated() {
    renderMathInElement(this.$el)
  }
}
</script>
