<template lang="pug">
  .mb-4
    ArticleGroup(:posts="currentPagination")
    BPagination(
      v-model="page",
      align="left",
      :total-rows="$posts.length",
      :per-page="$site.themeConfig.perPage"
    )
</template>

<script>
import { resolveCurrentPagination } from '@theme/util'
import ArticleGroup from './ArticleGroup.vue'

export default {
  components: { ArticleGroup },
  data() {
    return {
      page: 1
    }
  },
  computed: {
    currentPagination() {
      const pagination = resolveCurrentPagination(
        this.$posts,
        this.page - 1,
        this.$pagination._paginationPages
      )
      return pagination
    }
  }
}
</script>
