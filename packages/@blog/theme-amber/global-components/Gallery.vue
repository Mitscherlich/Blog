<script>
import GalleryItem from '@theme/components/GalleryItem.vue'

export default {
  props: ['arts'],
  components: { GalleryItem },
  render(h) {
    return h(
      'div',
      { class: 'card-columns' },
      this.arts.map(art =>
        h('gallery-item', {
          props: { item: art }
        })
      )
    )
  }
}
</script>
