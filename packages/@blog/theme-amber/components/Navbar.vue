<template lang="pug">
  .nav-scroller: nav.nav: NavbarItem(v-for="(item, i) in userNav", :key="`nav-${i}`", :item="item")
</template>

<script>
import NavbarItem from './NavbarItem.vue'

export default {
  components: { NavbarItem },
  computed: {
    userNav() {
      return this.$site.themeConfig.menu || []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@theme/styles/variables"

.nav-scroller
  position relative
  overflow-y hidden
  z-index 2
  height 2.75rem
  padding .25rem 0
  margin .5rem 0
  .nav
    display flex
    flex-wrap nowrap
    justify-content space-between
    padding-bottom 1rem
    margin-top -1px
    overflow-x auto
    text-align center
    white-space nowrap
    overflow -moz-scrollbars-none
    &::-webkit-scrollbar
      display none
</style>
