<template lang="pug">
  aside.mb-3
    slot(name="sidebar-top")
    Leaf(:word="word")
    .position-sticky.mb-3(style="top: 1rem")
      Github(:user="user")
      slot(name="sidebar-bottom")
</template>

<script>
import Leaf from './widgets/Leaf.vue'
import Github from './widgets/Github.vue'

export default {
  components: {
    Leaf,
    Github
  },
  computed: {
    word() {
      return this.$themeConfig.sidebar.leaf
    },
    user() {
      return this.$themeConfig.sidebar.github
    },
    tags() {
      return Object.keys(this.$tags._metaMap).map(key => ({
        text: key,
        link: this.$tags._metaMap[key].path
      }))
    }
  }
}
</script>
