<script>
import { resolveTimelines } from '@theme/util'
import ArchiveGroup from '@theme/components/ArchiveGroup.vue'

export default {
  components: { ArchiveGroup },
  computed: {
    timelines() {
      return resolveTimelines(this.$tag.posts)
    }
  },
  render(h) {
    return h(
      'div',
      this.timelines.keys.map(key =>
        h('ArchiveGroup', {
          props: { filter: key, entities: this.timelines.entities[key] }
        })
      )
    )
  }
}
</script>
