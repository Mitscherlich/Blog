<template lang="pug">
  article
    ArticleMeta(
      v-if="$page.title"
      :date="$page.frontmatter.date",
      :author="$page.frontmatter.author",
      :category="$page.frontmatter.category",
      :tags="$page.frontmatter.tags"
    ): template(v-slot:title): h2(v-html="$page.title")
    Content.my-4(:class="{ 'markdown-body': $page.title }")
    Comment(v-if="shouldShowComments", :title="$page.title")
</template>

<script>
import { renderMathInElement } from '@theme/util'
import ArticleMeta from './ArticleMeta.vue'
import Comment from './Comment.vue'

export default {
  components: {
    ArticleMeta,
    Comment
  },
  computed: {
    shouldShowComments() {
      return (
        this.$site.themeConfig.comment &&
        this.$site.themeConfig.comment.enable &&
        this.$page.frontmatter.comments !== false
      )
    }
  },
  mounted() {
    renderMathInElement(this.$el)
  },
  updated() {
    renderMathInElement(this.$el)
  }
}
</script>
