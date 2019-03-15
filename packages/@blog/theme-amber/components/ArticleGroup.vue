<script>
import ArticleBox from './ArticleBox.vue'

export default {
  props: ['posts'],
  components: { ArticleBox },
  render(h) {
    return h('div', this.posts.map(post => h('ArticleBox', { props: { post } })))
  }
}
</script>
