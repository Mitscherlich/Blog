<template lang="pug">
  b-carousel(v-else, controls, indicators, v-model="slide")
    CarouselItem(v-for="item in features", :key="item.key", :item="item")
</template>

<script>
import CarouselItem from './CarouselItem.vue'

export default {
  components: { CarouselItem },
  data() {
    return {
      slide: 0
    }
  },
  computed: {
    features() {
      return this.$posts.slice(0, 5)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@theme/styles/variables"
@import "~@theme/styles/util/mixins"

.carousel
  background #1d2124
  border-radius .25rem
  margin-bottom 1.25rem
</style>
