<template lang="pug">
  b-carousel-slide.cover
    .mask(slot="img"): img(v-if="shouldShowCover", :src="item.frontmatter.cover")
    router-link(:to="item.path"): h3.text-light {{ item.title }}
</template>

<script>
export default {
  props: ['item'],
  computed: {
    shouldShowCover() {
      return (
        this.item.frontmatter.cover &&
        (this.item.frontmatter.cover.startsWith('/') ||
          this.item.frontmatter.cover.startsWith('http'))
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.cover
  border-radius .25rem
  height 20rem
  a
    text-decoration none
  .mask
    background #1d2124
    box-shadow inset 0 0 5rem rgba(0, 0, 0, .5)
    transition all .5s
    opacity 0.4
    filter blur(3px)
    overflow hidden
    text-align center
    &:hover
      opacity 0.6
      filter blur(1px)
    img
        position relative
        top 50%
        left 50%
        min-width 100%
        min-height 100%
        transform translate(-50%, -50%)
</style>
