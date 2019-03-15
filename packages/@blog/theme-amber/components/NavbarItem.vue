<template lang="pug">
  router-link.nav-item(:to="item.link") {{ item.text }}
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="stylus" scoped>
@import "~@theme/styles/variables"

.nav-item
  position relative
  text-decoration none
  cursor pointer
  color color-muted
  line-height 1
  padding .5rem 1.5rem
  &:before
    content ""
    position absolute
    top 0
    left 100%
    width 0
    height 100%
    border-bottom 2px solid color-muted
    transition .2s all ease-in-out
  &:hover::before
    width 100%
    left 0
  &:hover ~ &::before
    left 0
</style>
