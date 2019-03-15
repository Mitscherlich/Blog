<script>
export default {
  props: {
    word: {
      type: String,
      default: 'Hanc marginis exiguitas non caperet.'
    }
  },
  render(h) {
    if (this.$page.frontmatter.home) {
      return h('div', { class: 'card border-0 p-3 mb-3 bg-light' }, [
        h('h4', { class: 'font-italic' }, 'Leaf'),
        h('p', this.word)
      ])
    }
    return null
  }
}
</script>
