<!-- make vuepress hapllery :) -->
<script>
import Home from '@theme/components/Home.vue'
import Page from '@theme/components/Page.vue'

export default {
  components: { Home, Page },
  render(h) {
    if (this.$page.frontmatter.home) {
      return h('home')
    } else {
      return h('page')
    }
  }
}
</script>
